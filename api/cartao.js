// Pagamento com cartão de crédito (Mercado Pago, API de Orders).
//
// O site manda para cá o "token" do cartão (gerado pelos campos seguros do Mercado Pago,
// os números do cartão nunca passam por aqui), o presente escolhido e as parcelas.
// O valor é sempre o da lista de presentes (assets/js/dados.js), nunca o que vem do navegador,
// exceto no presente de valor livre.
//
// Variáveis de ambiente na Vercel (Settings > Environment Variables):
//   MP_ACCESS_TOKEN        Access Token de PRODUÇÃO (usado no domínio oficial)
//   MP_ACCESS_TOKEN_TESTE  Access Token de TESTE (usado nos endereços de prévia *.vercel.app)
//
// Pagamento aprovado no domínio oficial: o presente vai para a planilha com "Sim" em
// "Mostrar como presenteado", igual ao Pix. Pagamentos de teste não vão para a planilha.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const DOMINIO_OFICIAL = /(^|\.)deboraebenjamin\.com\.br$/i;
const VALOR_LIVRE_MIN = 1;
const VALOR_LIVRE_MAX = 20000;

// Lê a lista de presentes e a configuração do site (o mesmo arquivo que o navegador usa)
let cacheDados;
function dadosDoSite() {
  if (cacheDados) return cacheDados;
  const arquivo = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'assets', 'js', 'dados.js');
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(arquivo, 'utf8'), ctx);
  cacheDados = { SITE: ctx.window.SITE || {}, PRESENTES: ctx.window.PRESENTES || [] };
  return cacheDados;
}

const MENSAGENS = {
  bad_filled_card_data: 'Algum dado do cartão está incorreto. Confira o número, a validade e o código de segurança.',
  invalid_card_token: 'Não conseguimos validar o cartão. Confira os dados e tente de novo.',
  insufficient_amount: 'O cartão não tem limite suficiente. Tente outro cartão ou o Pix.',
  card_disabled: 'O cartão está bloqueado para compras on-line. Ligue para o banco ou use outro cartão.',
  required_call_for_authorize: 'O banco pediu para você autorizar este pagamento. Ligue para o banco e tente de novo.',
  rejected_by_issuer: 'O banco recusou o pagamento. Tente outro cartão ou o Pix.',
  cc_rejected_other_reason: 'O banco recusou o pagamento. Tente outro cartão ou o Pix.',
  high_risk: 'O pagamento foi recusado por segurança. Tente outro cartão ou o Pix.',
  max_attempts_exceeded: 'Muitas tentativas com este cartão. Tente outro cartão ou o Pix.',
  invalid_installments: 'Este número de parcelas não está disponível para o cartão. Escolha outra opção.',
  cc_rejected_duplicated_payment: 'Este pagamento parece repetido. Se você já pagou, não precisa pagar de novo.',
  duplicated_payment: 'Este pagamento parece repetido. Se você já pagou, não precisa pagar de novo.'
};
const MENSAGEM_PADRAO = 'O pagamento não foi aprovado. Confira os dados ou tente outro cartão. Você também pode usar o Pix.';

function texto(s, max) { return String(s == null ? '' : s).trim().slice(0, max); }
function so(s) { return String(s == null ? '' : s).replace(/\D/g, ''); }

async function registrarNaPlanilha(SITE, dados) {
  if (!SITE.planilha) return false;
  try {
    const r = await fetch(SITE.planilha, { method: 'POST', body: JSON.stringify(dados), redirect: 'follow', signal: AbortSignal.timeout(15000) });
    const j = await r.json().catch(() => null);
    return !!(j && j.ok);
  } catch (e) {
    console.error('planilha:', e.message);
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ status: 'erro', mensagem: 'Método não permitido.' }); }

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(':')[0];
  const oficial = DOMINIO_OFICIAL.test(host);
  const accessToken = oficial ? process.env.MP_ACCESS_TOKEN : process.env.MP_ACCESS_TOKEN_TESTE;
  if (!accessToken) {
    return res.status(503).json({ status: 'erro', mensagem: 'O pagamento com cartão está indisponível no momento. Use o Pix ou tente mais tarde.' });
  }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
  if (!b || typeof b !== 'object') return res.status(400).json({ status: 'erro', mensagem: 'Pedido inválido.' });

  const { SITE, PRESENTES } = dadosDoSite();
  const id = texto(b.id, 120);
  let presente, valor;
  if (id === 'valor-livre') {
    valor = Math.round(Number(b.valor) * 100) / 100;
    if (!(valor >= VALOR_LIVRE_MIN && valor <= VALOR_LIVRE_MAX)) return res.status(400).json({ status: 'erro', mensagem: 'Valor inválido.' });
    presente = { id, nome: 'Presente com valor livre' };
  } else {
    presente = PRESENTES.find((p) => p.id === id);
    if (!presente) return res.status(400).json({ status: 'erro', mensagem: 'Presente não encontrado.' });
    valor = Number(presente.valor);
  }

  const token = texto(b.token, 200);
  const metodo = texto(b.metodo, 40).toLowerCase();
  const parcelas = Math.trunc(Number(b.parcelas));
  const email = texto(b.email, 200);
  const cpf = so(b.cpf);
  const titular = texto(b.titular, 120);
  const quem = texto(b.nome, 120);
  const recado = texto(b.recado, 1000);
  if (!token || !/^[a-z_]+$/.test(metodo) || !(parcelas >= 1 && parcelas <= 12) || !/^\S+@\S+\.\S+$/.test(email) || cpf.length !== 11 || quem.length < 2) {
    return res.status(400).json({ status: 'erro', mensagem: 'Confira os dados do formulário.' });
  }

  const nomes = titular.split(/\s+/).filter(Boolean);
  const total = valor.toFixed(2);
  const pedido = {
    type: 'online',
    processing_mode: 'automatic',
    total_amount: total,
    external_reference: (presente.id + '-' + Date.now()).slice(0, 64),
    payer: {
      email,
      first_name: nomes[0] || undefined,
      last_name: nomes.slice(1).join(' ') || undefined,
      identification: { type: 'CPF', number: cpf }
    },
    transactions: {
      payments: [{
        amount: total,
        payment_method: { id: metodo, type: 'credit_card', token, installments: parcelas }
      }]
    }
  };

  let resposta, corpo;
  try {
    resposta = await fetch('https://api.mercadopago.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'X-Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify(pedido),
      signal: AbortSignal.timeout(30000)
    });
    corpo = await resposta.json().catch(() => ({}));
  } catch (e) {
    console.error('mercado pago (rede):', e.message);
    return res.status(502).json({ status: 'erro', mensagem: 'Não conseguimos falar com o Mercado Pago. Nenhuma cobrança foi feita. Tente de novo em instantes.' });
  }

  // Em caso de recusa, a API responde 402 e a order pode vir em "data"
  const order = (corpo && corpo.transactions) ? corpo : (corpo && corpo.data && corpo.data.transactions ? corpo.data : corpo || {});
  const pagamento = (order.transactions && order.transactions.payments && order.transactions.payments[0]) || {};
  const status = order.status || '';
  const detalhe = pagamento.status_detail || order.status_detail ||
    (corpo && corpo.errors && corpo.errors[0] && (corpo.errors[0].details && corpo.errors[0].details[0] || corpo.errors[0].code)) || '';
  console.log('order', order.id || '-', resposta.status, status, detalhe, oficial ? 'producao' : 'teste');

  let resultado;
  if (status === 'processed' && (detalhe === 'accredited' || pagamento.status === 'processed')) resultado = 'aprovado';
  else if (status === 'processing' || status === 'action_required' || pagamento.status === 'processing') resultado = 'em_analise';
  else resultado = 'recusado';

  if (resultado === 'recusado') {
    const conhecido = Object.keys(MENSAGENS).find((k) => String(detalhe).indexOf(k) >= 0);
    return res.status(200).json({ status: 'recusado', mensagem: conhecido ? MENSAGENS[conhecido] : MENSAGEM_PADRAO });
  }

  // Aprovado (ou em análise): registra na planilha para o presente aparecer como "Presenteado"
  let registrado = false;
  if (oficial) {
    const forma = 'Cartão de crédito (' + parcelas + 'x)' + (resultado === 'em_analise' ? ' – em análise' : '');
    registrado = await registrarNaPlanilha(SITE, { tipo: 'presente', id: presente.id, nome: quem, presente: presente.nome, valor, forma, recado });
  }
  return res.status(200).json({ status: resultado, registrado, teste: !oficial });
}
