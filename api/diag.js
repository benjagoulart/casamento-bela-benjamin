// Temporário (só na prévia): consulta as parcelas no Mercado Pago com a chave pública de teste, para diagnóstico.
export default async function handler(req, res) {
  const pk = 'APP_USR-d932c283-19c2-49c4-ad6d-6761a3d06c5d';
  const out = {};
  for (const [k, u] of Object.entries({
    parcelas: `https://api.mercadopago.com/v1/payment_methods/installments?public_key=${pk}&locale=pt-BR&bin=50314332&amount=500.00&payment_type_id=credit_card`,
    parcelas_sem_tipo: `https://api.mercadopago.com/v1/payment_methods/installments?public_key=${pk}&locale=pt-BR&bin=50314332&amount=500.00`,
    metodos: `https://api.mercadopago.com/v1/payment_methods/search?public_key=${pk}&bins=50314332&marketplace=NONE&status=active`
  })) {
    try { const r = await fetch(u); out[k] = { status: r.status, body: (await r.text()).slice(0, 1500) }; } catch (e) { out[k] = String(e); }
  }
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(out);
}
