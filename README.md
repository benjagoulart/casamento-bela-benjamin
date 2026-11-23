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
- `mercadoPagoPublicKey`: a Public Key do Mercado Pago. Com ela preenchida, a opção "Cartão de crédito" aparece no site oficial. Nos endereços de prévia (*.vercel.app) a tela do cartão aparece sempre, em modo de teste.

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
