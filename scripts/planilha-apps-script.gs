/**
 * Planilha do casamento – Débora & Benjamin
 * Recebe as respostas do site (confirmação de presença e presentes) e grava na planilha.
 *
 * Como instalar (uma vez só):
 * 1. Abra a planilha > Extensões > Apps Script.
 * 2. Apague o que estiver no editor, cole este arquivo inteiro e salve.
 * 3. Implantar > Nova implantação > tipo "App da Web".
 *    Executar como: Eu  ·  Quem pode acessar: Qualquer pessoa.
 * 4. Autorize com a sua conta Google e copie a URL do app da Web (termina em /exec).
 *
 * Se editar este código depois: Implantar > Gerenciar implantações > lápis > Versão: "Nova versão".
 */

const FUSO = 'America/Sao_Paulo';
const ABA_PRESENCA = 'Presença';
const ABA_PRESENTES = 'Presentes';

// Convites que já aparecem na aba Presença como "Aguardando".
// Um convite novo que responder pelo site entra no fim da lista automaticamente.
const CONVITES = [
  'Everson e Adriana', 'Odete Langbauer', 'Hanna Meister', 'Paulo e Larissa',
  'Rodrigo e Madalena', 'Pedro Goulart', 'Lindomar e Adelir', 'Robson Thomas e Família',
  'Max Roberto e Família', 'Saimon e Família', 'Sibeli e Família', 'Edília Meister',
  'Norvin e Enília', 'Marli da Silva', 'Niltamar Sazan', 'Miguel e Naura',
  'Gildete da Silva', 'Zilma Sazan', 'Amanda Netto', 'Moacir e Soraia',
  'Júlio e Família', 'Wellington e Yasmin', 'Claudiomar e Rosilene', 'Reverson e Família',
  'Maria e Lara', 'Roberto e Manuela', 'Lucas Zanatta', 'Letícia May',
  'Bruno Pavei', 'Pedro Semeniuk', 'Gabriel e Débora'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    garantirAbas_();
    if (d.tipo === 'presenca') return json_(salvarPresenca_(d));
    if (d.tipo === 'presente') return json_(salvarPresente_(d));
    return json_({ ok: false, erro: 'tipo inválido' });
  } catch (err) {
    return json_({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Abrir a URL /exec no navegador mostra se está funcionando.
function doGet() {
  garantirAbas_();
  return json_({ ok: true, mensagem: 'Planilha do casamento funcionando.' });
}

function salvarPresenca_(d) {
  const convite = limpa_(d.convite, 120);
  if (!convite) return { ok: false, erro: 'convite vazio' };
  const resposta = d.resposta === 'sim' ? 'Vai' : d.resposta === 'nao' ? 'Não vai' : '';
  if (!resposta) return { ok: false, erro: 'resposta inválida' };

  const aba = SpreadsheetApp.getActive().getSheetByName(ABA_PRESENCA);
  const agora = agora_();
  const nomes = aba.getRange(2, 1, Math.max(aba.getLastRow() - 1, 1), 1).getValues().map(r => r[0]);
  const i = nomes.indexOf(convite);
  if (i >= 0) {
    const linha = i + 2;
    const vezes = Number(aba.getRange(linha, 4).getValue()) || 0;
    aba.getRange(linha, 2, 1, 3).setValues([[resposta, agora, vezes + 1]]);
  } else {
    aba.appendRow([convite, resposta, agora, 1]);
  }
  return { ok: true };
}

function salvarPresente_(d) {
  const nome = limpa_(d.nome, 120);
  const presente = limpa_(d.presente, 200);
  if (!nome || !presente) return { ok: false, erro: 'dados incompletos' };
  const valor = Number(d.valor) || '';
  const forma = limpa_(d.forma, 30) || 'Pix';
  const recado = limpa_(d.recado, 1000);
  const aba = SpreadsheetApp.getActive().getSheetByName(ABA_PRESENTES);
  aba.appendRow([agora_(), nome, presente, valor, forma, recado]);
  aba.getRange(aba.getLastRow(), 4).setNumberFormat('R$ #,##0.00');
  return { ok: true };
}

function garantirAbas_() {
  const ss = SpreadsheetApp.getActive();
  let p = ss.getSheetByName(ABA_PRESENCA);
  if (!p) {
    p = ss.insertSheet(ABA_PRESENCA, 0);
    p.getRange(1, 1, 1, 4).setValues([['Convite', 'Resposta', 'Respondido em', 'Vezes que respondeu']]);
    p.getRange(2, 1, CONVITES.length, 4).setValues(CONVITES.map(c => [c, 'Aguardando', '', 0]));
    formatarCabecalho_(p, 4, [240, 120, 160, 150]);
  }
  let g = ss.getSheetByName(ABA_PRESENTES);
  if (!g) {
    g = ss.insertSheet(ABA_PRESENTES, 1);
    g.getRange(1, 1, 1, 6).setValues([['Data e hora', 'Nome de quem presenteou', 'Presente', 'Valor', 'Forma de pagamento', 'Recado']]);
    formatarCabecalho_(g, 6, [140, 220, 300, 110, 150, 360]);
  }
  // Remove a aba vazia padrão, se existir
  const padrao = ss.getSheetByName('Página1') || ss.getSheetByName('Sheet1');
  if (padrao && ss.getSheets().length > 2 && padrao.getLastRow() === 0) ss.deleteSheet(padrao);
}

function formatarCabecalho_(aba, cols, larguras) {
  aba.setFrozenRows(1);
  aba.getRange(1, 1, 1, cols).setFontWeight('bold').setBackground('#EFEADB').setFontColor('#382E22');
  larguras.forEach((w, i) => aba.setColumnWidth(i + 1, w));
}

function agora_() {
  return Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');
}

// Corta textos longos e impede que algo digitado vire fórmula na planilha
function limpa_(s, max) {
  s = String(s == null ? '' : s).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
