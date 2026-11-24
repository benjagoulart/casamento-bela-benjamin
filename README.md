# Débora & Benjamin – site do casamento

Site estático (HTML, CSS e JavaScript puro), publicado na Vercel. Casamento em 27/03/2027, no Centro de Eventos Sonho Dourado.

## Páginas

| Endereço | Arquivo |
| --- | --- |
| `/` | `index.html` |
| `/historia` | `historia.html` |
| `/presenca` | `presenca.html` |
| `/presentes` | `presentes.html` |
| `/pagamento?p=<id>` | `pagamento.html` |
| `/dicas` | `dicas.html` |
| `/album` | `album.html` |

## O que editar no dia a dia

Tudo fica em `assets/js/dados.js`:

- `planilha`: endereço do app da planilha (Google Apps Script, termina em `/exec`). As confirmações de presença e os presentes vão direto para a planilha "Casamento Débora & Benjamin – Respostas do site" no Google Drive. Enquanto estiver vazio, os botões de envio ficam desativados. O código da planilha está em `scripts/planilha-apps-script.gs`.
- `CONVITES`: a lista de convites que aparece na busca da confirmação de presença.
- `PRESENTES`: a lista de presentes. Cada item tem nome, categoria, valor, foto, QR Code e o código Pix Copia e Cola.
- `mercadoPagoPublicKey` / `mercadoPagoPublicKeyTeste`: as Public Keys do Mercado Pago (produção e teste). A de produção vale em deboraebenjamin.com.br; a de teste, nos endereços de prévia (*.vercel.app), onde nada é cobrado de verdade.

## Cartão de crédito (Mercado Pago)

- O formulário usa os campos seguros do Mercado Pago: número, validade e código do cartão ficam em quadros do próprio Mercado Pago e nunca passam pelo site.
- A cobrança é feita pela função `api/cartao.js` (Vercel), com a API de Orders. O valor sempre vem da lista de presentes, nunca do navegador (menos no presente de valor livre).
- Os Access Tokens (secretos) ficam só na Vercel, em Settings > Environment Variables: `MP_ACCESS_TOKEN` (produção, ambiente Production) e `MP_ACCESS_TOKEN_TESTE` (teste, ambiente Preview).
- As parcelas e os juros vêm do Mercado Pago, conforme a conta: hoje, sem juros até 3x e com juros para o convidado de 4x a 12x. Para mudar: Mercado Pago > Taxas e parcelas > Checkout.
- Pagamento aprovado vai para a planilha (forma "Cartão de crédito (Nx)") com "Sim" em "Mostrar como presenteado". Se ficar em análise, entra como "Cartão de crédito (Nx) – em análise"; se depois for recusado, troque para "Não".

Se mudar o valor de um presente, é preciso gerar um novo QR Code e código Pix para ele.

## Rodar localmente

```bash
npx serve .
```

## Fotos dos presentes

A cada deploy, `scripts/build.mjs` prepara as fotos: corta as bordas vazias, centraliza o produto com a mesma margem em todas e salva em 600×600.

- Se existir uma foto em `fotos-presentes/<id>.jpg` (ou .png), ela é usada. É o jeito mais bonito: foto com fundo branco, só o produto.
- Senão, a foto é baixada do link em `scripts/imagens.json`.

Se a foto falhar, o card mostra o ícone da categoria.

No card aparecem `titulo` (nome curto do produto) e `detalhe` (marca, tamanho, peças). O `nome` completo vai para a página de pagamento e para a planilha.

## Presentes já dados

Quando o convidado envia nome e recado depois de pagar, o presente vai para a aba "Presentes" da planilha com o ID e "Sim" na coluna **Mostrar como presenteado**. O site lê essa lista e mostra o item com a etiqueta "Presenteado", sem o botão de presentear. Para devolver um item à lista (ex.: alguém enviou sem pagar), troque "Sim" por "Não" nessa coluna.
