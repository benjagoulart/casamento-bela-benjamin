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
- `linkCartao`: cole o link de pagamento do presente (Mercado Pago, PagBank…) para aparecer a opção de cartão.

Se mudar o valor de um presente, é preciso gerar um novo QR Code e código Pix para ele.

## Rodar localmente

```bash
npx serve .
```

## Fotos dos presentes

As fotos não ficam no repositório: a cada deploy, `scripts/build.mjs` baixa os links de `scripts/imagens.json`, ajusta para 600×600 e publica em `dist/`. Para trocar uma foto, troque o link correspondente nesse arquivo. Se um link falhar, o card mostra o ícone da categoria.
