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

- `whatsapp`: número com DDI e DDD, só números (ex.: `5548999999999`). Enquanto estiver vazio, o formulário de confirmação fica desativado e o botão "Avisar no WhatsApp" fica escondido.
- `PRESENTES`: a lista de presentes. Cada item tem nome, categoria, valor, foto, QR Code e o código Pix Copia e Cola.
- `linkCartao`: cole o link de pagamento do presente (Mercado Pago, PagBank…) para aparecer a opção de cartão.

Se mudar o valor de um presente, é preciso gerar um novo QR Code e código Pix para ele.

## Rodar localmente

```bash
npx serve .
```
