// Lista de presentes. Para mudar um presente, edite aqui.
// Se mudar o valor de um presente, o QR Code e o código Pix precisam ser gerados de novo.
window.SITE = {
  // Endereço do app da planilha (Google Apps Script, termina em /exec). Recebe as confirmações e os presentes.
  // Vazio = os formulários aparecem, mas o envio fica desativado.
  planilha: 'https://script.google.com/macros/s/AKfycbxButBG56eqOpb3eKN08Z_dN1e6Shecpn9MrSeti0QPU8piZM32IZg51ZblK7MuEhoE/exec',
  chavePix: '093.370.259-06',
  titularPix: 'Débora Meister Pereira',
  cidadePix: 'Criciúma',
  // Cartão de crédito (Mercado Pago): cole aqui a Public Key (começa com APP_USR-).
  // Vazio = a opção de cartão não aparece no site oficial (só na prévia).
  mercadoPagoPublicKey: '',
  // Versão das fotos dos presentes: troque o número sempre que mudar alguma foto
  versaoFotos: '20261123'
};

// Lista de convites (confirmação de presença). O convidado digita o nome e escolhe o convite dele.
// Para incluir ou tirar alguém, edite aqui, um convite por linha, do jeito que está na tag do convite.
window.CONVITES = [
  'Everson e Adriana',
  'Odete Langbauer',
  'Hanna Meister',
  'Paulo e Larissa',
  'Rodrigo e Madalena',
  'Pedro Goulart',
  'Lindomar e Adelir',
  'Robson Thomas e Família',
  'Max Roberto e Família',
  'Saimon e Família',
  'Sibeli e Família',
  'Edília Meister',
  'Norvin e Enília',
  'Marli da Silva',
  'Niltamar Sazan',
  'Miguel e Naura',
  'Gildete da Silva',
  'Zilma Sazan',
  'Amanda Netto',
  'Moacir e Soraia',
  'Júlio e Família',
  'Wellington e Yasmin',
  'Claudiomar e Rosilene',
  'Reverson e Família',
  'Maria e Lara',
  'Roberto e Manuela',
  'Lucas Zanatta',
  'Letícia May',
  'Bruno Pavei',
  'Pedro Semeniuk',
  'Gabriel e Débora'
];
window.PRESENTES = [
  {
    "id": "09-jogo-de-facas-6-pecas-tramontina-plenus",
    "nome": "Jogo de facas Tramontina Plenus (6 peças)",
    "titulo": "Jogo de facas",
    "detalhe": "Tramontina Plenus · 6 peças",
    "categoria": "Cozinha",
    "valor": 150.0,
    "imagem": "/assets/img/presentes/09-jogo-de-facas-6-pecas-tramontina-plenus.jpg",
    "qr": "/assets/pix/09-jogo-de-facas-6-pecas-tramontina-plenus.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406150.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304D480"
  },
  {
    "id": "10-jogo-de-utensilios-tramontina-softta-em-silicone-6-pecas",
    "nome": "Utensílios de silicone Tramontina Softta (6 peças)",
    "titulo": "Utensílios de silicone",
    "detalhe": "Tramontina Softta · 6 peças",
    "categoria": "Cozinha",
    "valor": 150.0,
    "imagem": "/assets/img/presentes/10-jogo-de-utensilios-tramontina-softta-em-silicone-6-pecas.jpg",
    "qr": "/assets/pix/10-jogo-de-utensilios-tramontina-softta-em-silicone-6-pecas.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406150.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304D480"
  },
  {
    "id": "23-tigela-misturadora-de-cozinha-empilhavel-zara-home",
    "nome": "Tigelas empilháveis Zara Home",
    "titulo": "Tigelas empilháveis",
    "detalhe": "Zara Home",
    "categoria": "Cozinha",
    "valor": 159.9,
    "imagem": "/assets/img/presentes/23-tigela-misturadora-de-cozinha-empilhavel-zara-home.jpg",
    "qr": "/assets/pix/23-tigela-misturadora-de-cozinha-empilhavel-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406159.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304ECEE"
  },
  {
    "id": "03-grill-philco-2-em-1-chapa-com-abertura-180",
    "nome": "Grill Philco 2 em 1 com abertura 180°",
    "titulo": "Grill 2 em 1",
    "detalhe": "Philco · abertura 180°",
    "categoria": "Cozinha",
    "valor": 169.9,
    "imagem": "/assets/img/presentes/03-grill-philco-2-em-1-chapa-com-abertura-180.jpg",
    "qr": "/assets/pix/03-grill-philco-2-em-1-chapa-com-abertura-180.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406169.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63049E39"
  },
  {
    "id": "07-kit-para-queijos-com-5-pecas-madeira",
    "nome": "Kit para queijos em madeira (5 peças)",
    "titulo": "Kit para queijos",
    "detalhe": "Madeira · 5 peças",
    "categoria": "Mesa posta",
    "valor": 180.0,
    "imagem": "/assets/img/presentes/07-kit-para-queijos-com-5-pecas-madeira.jpg",
    "qr": "/assets/pix/07-kit-para-queijos-com-5-pecas-madeira.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406180.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304D1AF"
  },
  {
    "id": "08-jogo-de-tacas-de-vinho-6-pecas-bohemia-xtra-sommelier",
    "nome": "Taças de vinho Bohemia Sommelier (6 peças)",
    "titulo": "Taças de vinho",
    "detalhe": "Bohemia Sommelier · 6 peças",
    "categoria": "Bar & drinks",
    "valor": 180.0,
    "imagem": "/assets/img/presentes/08-jogo-de-tacas-de-vinho-6-pecas-bohemia-xtra-sommelier.jpg",
    "qr": "/assets/pix/08-jogo-de-tacas-de-vinho-6-pecas-bohemia-xtra-sommelier.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406180.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304D1AF"
  },
  {
    "id": "06-vonder-caixa-para-ferramentas",
    "nome": "Caixa de ferramentas Vonder",
    "titulo": "Caixa de ferramentas",
    "detalhe": "Vonder",
    "categoria": "Casa",
    "valor": 185.0,
    "imagem": "/assets/img/presentes/06-vonder-caixa-para-ferramentas.jpg",
    "qr": "/assets/pix/06-vonder-caixa-para-ferramentas.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406185.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63048DA3"
  },
  {
    "id": "13-escorredor-de-louca-tramontina",
    "nome": "Escorredor de louça Tramontina",
    "titulo": "Escorredor de louça",
    "detalhe": "Tramontina",
    "categoria": "Cozinha",
    "valor": 190.0,
    "imagem": "/assets/img/presentes/13-escorredor-de-louca-tramontina.jpg",
    "qr": "/assets/pix/13-escorredor-de-louca-tramontina.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406190.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63040FFD"
  },
  {
    "id": "16-conjunto-de-porta-copos-de-gres-com-frutas-zara-home",
    "nome": "Porta-copos de grês com frutas Zara Home",
    "titulo": "Porta-copos de frutas",
    "detalhe": "Zara Home · grês",
    "categoria": "Bar & drinks",
    "valor": 199.9,
    "imagem": "/assets/img/presentes/16-conjunto-de-porta-copos-de-gres-com-frutas-zara-home.jpg",
    "qr": "/assets/pix/16-conjunto-de-porta-copos-de-gres-com-frutas-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406199.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63043793"
  },
  {
    "id": "11-balanca-digital-de-cozinha-black-decker",
    "nome": "Balança digital de cozinha Black+Decker",
    "titulo": "Balança de cozinha",
    "detalhe": "Black+Decker · digital",
    "categoria": "Cozinha",
    "valor": 200.0,
    "imagem": "/assets/img/presentes/11-balanca-digital-de-cozinha-black-decker.jpg",
    "qr": "/assets/pix/11-balanca-digital-de-cozinha-black-decker.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406200.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304CA2C"
  },
  {
    "id": "04-ferro-de-passar-a-vapor-philco-320ml",
    "nome": "Ferro de passar a vapor Philco",
    "titulo": "Ferro de passar a vapor",
    "detalhe": "Philco",
    "categoria": "Casa",
    "valor": 209.99,
    "imagem": "/assets/img/presentes/04-ferro-de-passar-a-vapor-philco-320ml.jpg",
    "qr": "/assets/pix/04-ferro-de-passar-a-vapor-philco-320ml.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406209.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304C3D0"
  },
  {
    "id": "05-pipoqueira-tramontina-paris",
    "nome": "Pipoqueira Tramontina Paris",
    "titulo": "Pipoqueira",
    "detalhe": "Tramontina Paris",
    "categoria": "Cozinha",
    "valor": 209.99,
    "imagem": "/assets/img/presentes/05-pipoqueira-tramontina-paris.jpg",
    "qr": "/assets/pix/05-pipoqueira-tramontina-paris.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406209.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304C3D0"
  },
  {
    "id": "12-box-mesa-posta-4-lugares-sao-joao-mocca-copa-cia",
    "nome": "Box mesa posta para 4 pessoas Copa&Cia",
    "titulo": "Mesa posta",
    "detalhe": "Copa&Cia · 4 lugares",
    "categoria": "Mesa posta",
    "valor": 215.0,
    "imagem": "/assets/img/presentes/12-box-mesa-posta-4-lugares-sao-joao-mocca-copa-cia.jpg",
    "qr": "/assets/pix/12-box-mesa-posta-4-lugares-sao-joao-mocca-copa-cia.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406215.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63044872"
  },
  {
    "id": "15-vaso-decorativo-de-ceramica-creme-zara-home",
    "nome": "Vaso de cerâmica creme Zara Home",
    "titulo": "Vaso de cerâmica",
    "detalhe": "Zara Home · creme",
    "categoria": "Decoração",
    "valor": 269.9,
    "imagem": "/assets/img/presentes/15-vaso-decorativo-de-ceramica-creme-zara-home.jpg",
    "qr": "/assets/pix/15-vaso-decorativo-de-ceramica-creme-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406269.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***630417EC"
  },
  {
    "id": "14-relogio-calendario-flip-alarme-zara-home",
    "nome": "Relógio calendário flip Zara Home",
    "titulo": "Relógio calendário",
    "detalhe": "Zara Home · flip com alarme",
    "categoria": "Decoração",
    "valor": 289.9,
    "imagem": "/assets/img/presentes/14-relogio-calendario-flip-alarme-zara-home.jpg",
    "qr": "/assets/pix/14-relogio-calendario-flip-alarme-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406289.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63046014"
  },
  {
    "id": "01-chaleira-eletrica-arno-soleil",
    "nome": "Chaleira elétrica Arno Soleil",
    "titulo": "Chaleira elétrica",
    "detalhe": "Arno Soleil",
    "categoria": "Cozinha",
    "valor": 289.99,
    "imagem": "/assets/img/presentes/01-chaleira-eletrica-arno-soleil.jpg",
    "qr": "/assets/pix/01-chaleira-eletrica-arno-soleil.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406289.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63045186"
  },
  {
    "id": "02-cafeteira-eletrica-arno-soleil",
    "nome": "Cafeteira elétrica Arno Soleil",
    "titulo": "Cafeteira elétrica",
    "detalhe": "Arno Soleil",
    "categoria": "Cozinha",
    "valor": 289.99,
    "imagem": "/assets/img/presentes/02-cafeteira-eletrica-arno-soleil.jpg",
    "qr": "/assets/pix/02-cafeteira-eletrica-arno-soleil.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406289.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63045186"
  },
  {
    "id": "18-purificador-de-agua-natural-consul",
    "nome": "Purificador de água Consul",
    "titulo": "Purificador de água",
    "detalhe": "Consul",
    "categoria": "Cozinha",
    "valor": 300.0,
    "imagem": "/assets/img/presentes/18-purificador-de-agua-natural-consul.jpg",
    "qr": "/assets/pix/18-purificador-de-agua-natural-consul.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406300.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304B29F"
  },
  {
    "id": "28-philips-walita-fritadeira-airfryer",
    "nome": "Air fryer Philips Walita",
    "titulo": "Air fryer",
    "detalhe": "Philips Walita",
    "categoria": "Cozinha",
    "valor": 359.99,
    "imagem": "/assets/img/presentes/28-philips-walita-fritadeira-airfryer.jpg",
    "qr": "/assets/pix/28-philips-walita-fritadeira-airfryer.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406359.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63042C1A"
  },
  {
    "id": "29-midea-panela-de-pressao-eletrica-6l",
    "nome": "Panela de pressão elétrica Midea 6 L",
    "titulo": "Panela de pressão elétrica",
    "detalhe": "Midea · 6 L",
    "categoria": "Cozinha",
    "valor": 369.99,
    "imagem": "/assets/img/presentes/29-midea-panela-de-pressao-eletrica-6l.jpg",
    "qr": "/assets/pix/29-midea-panela-de-pressao-eletrica-6l.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406369.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63045ECD"
  },
  {
    "id": "19-abajur-de-mesa-sem-fios-de-vidro-zara-home",
    "nome": "Abajur de vidro sem fio Zara Home",
    "titulo": "Abajur de vidro",
    "detalhe": "Zara Home · sem fio",
    "categoria": "Decoração",
    "valor": 379.9,
    "imagem": "/assets/img/presentes/19-abajur-de-mesa-sem-fios-de-vidro-zara-home.jpg",
    "qr": "/assets/pix/19-abajur-de-mesa-sem-fios-de-vidro-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406379.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304B10D"
  },
  {
    "id": "20-bandeja-alta-de-ceramica-craquelada-zara-home",
    "nome": "Bandeja alta de cerâmica craquelada Zara Home",
    "titulo": "Bandeja de cerâmica",
    "detalhe": "Zara Home · craquelada",
    "categoria": "Mesa posta",
    "valor": 379.9,
    "imagem": "/assets/img/presentes/20-bandeja-alta-de-ceramica-craquelada-zara-home.jpg",
    "qr": "/assets/pix/20-bandeja-alta-de-ceramica-craquelada-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406379.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304B10D"
  },
  {
    "id": "21-bandeja-dobravel-com-alcas-zara-home",
    "nome": "Bandeja dobrável com alças Zara Home",
    "titulo": "Bandeja dobrável",
    "detalhe": "Zara Home · com alças",
    "categoria": "Decoração",
    "valor": 379.9,
    "imagem": "/assets/img/presentes/21-bandeja-dobravel-com-alcas-zara-home.jpg",
    "qr": "/assets/pix/21-bandeja-dobravel-com-alcas-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406379.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304B10D"
  },
  {
    "id": "25-luminaria-arandela-de-parede-de-vidro-zara-home",
    "nome": "Arandela de vidro Zara Home",
    "titulo": "Arandela de vidro",
    "detalhe": "Zara Home",
    "categoria": "Decoração",
    "valor": 379.9,
    "imagem": "/assets/img/presentes/25-luminaria-arandela-de-parede-de-vidro-zara-home.jpg",
    "qr": "/assets/pix/25-luminaria-arandela-de-parede-de-vidro-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406379.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304B10D"
  },
  {
    "id": "26-multiprocessador-arno-multichef",
    "nome": "Multiprocessador Arno Multichef",
    "titulo": "Multiprocessador",
    "detalhe": "Arno Multichef",
    "categoria": "Cozinha",
    "valor": 419.99,
    "imagem": "/assets/img/presentes/26-multiprocessador-arno-multichef.jpg",
    "qr": "/assets/pix/26-multiprocessador-arno-multichef.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406419.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63041E09"
  },
  {
    "id": "22-prato-para-bolo-de-madeira-zara-home",
    "nome": "Prato para bolo de madeira Zara Home",
    "titulo": "Prato para bolo",
    "detalhe": "Zara Home · madeira e vidro",
    "categoria": "Mesa posta",
    "valor": 429.9,
    "imagem": "/assets/img/presentes/22-prato-para-bolo-de-madeira-zara-home.jpg",
    "qr": "/assets/pix/22-prato-para-bolo-de-madeira-zara-home.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406429.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63045D4C"
  },
  {
    "id": "24-travessa-para-ir-ao-forno-de-borossilicato-e-madeira-zara-ho",
    "nome": "Travessa de borossilicato e madeira Zara Home",
    "titulo": "Travessas para forno",
    "detalhe": "Zara Home · vidro e madeira",
    "categoria": "Cozinha",
    "valor": 469.9,
    "imagem": "/assets/img/presentes/24-travessa-para-ir-ao-forno-de-borossilicato-e-madeira-zara-ho.jpg",
    "qr": "/assets/pix/24-travessa-para-ir-ao-forno-de-borossilicato-e-madeira-zara-ho.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406469.905802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63041467"
  },
  {
    "id": "27-aspirador-electrolux-cyclone-power-3-em-1",
    "nome": "Aspirador Electrolux Cyclone Power 3 em 1",
    "titulo": "Aspirador vertical",
    "detalhe": "Electrolux · 3 em 1",
    "categoria": "Casa",
    "valor": 499.99,
    "imagem": "/assets/img/presentes/27-aspirador-electrolux-cyclone-power-3-em-1.jpg",
    "qr": "/assets/pix/27-aspirador-electrolux-cyclone-power-3-em-1.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406499.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63048C5F"
  },
  {
    "id": "17-batedeira-arno-planetaria",
    "nome": "Batedeira planetária Arno",
    "titulo": "Batedeira planetária",
    "detalhe": "Arno",
    "categoria": "Cozinha",
    "valor": 500.0,
    "imagem": "/assets/img/presentes/17-batedeira-arno-planetaria.jpg",
    "qr": "/assets/pix/17-batedeira-arno-planetaria.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406500.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304B114"
  },
  {
    "id": "33-jogo-de-banho-trussardi-imperiale-oliva",
    "nome": "Jogo de banho Trussardi Imperiale oliva (5 peças)",
    "titulo": "Jogo de banho oliva",
    "detalhe": "Trussardi Imperiale · 5 peças",
    "categoria": "Cama & Banho",
    "valor": 539.91,
    "imagem": "/assets/img/presentes/33-jogo-de-banho-trussardi-imperiale-oliva.jpg",
    "qr": "/assets/pix/33-jogo-de-banho-trussardi-imperiale-oliva.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406539.915802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***630440E2"
  },
  {
    "id": "34-jogo-de-banho-trussardi-imperiale-branco",
    "nome": "Jogo de banho Trussardi Imperiale branco (5 peças)",
    "titulo": "Jogo de banho branco",
    "detalhe": "Trussardi Imperiale · 5 peças",
    "categoria": "Cama & Banho",
    "valor": 539.91,
    "imagem": "/assets/img/presentes/34-jogo-de-banho-trussardi-imperiale-branco.jpg",
    "qr": "/assets/pix/34-jogo-de-banho-trussardi-imperiale-branco.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406539.915802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***630440E2"
  },
  {
    "id": "37-tramontina-jogo-de-panelas-de-aco-inox-7-pecas",
    "nome": "Jogo de panelas Tramontina inox (7 peças)",
    "titulo": "Jogo de panelas inox",
    "detalhe": "Tramontina · 7 peças",
    "categoria": "Cozinha",
    "valor": 569.99,
    "imagem": "/assets/img/presentes/37-tramontina-jogo-de-panelas-de-aco-inox-7-pecas.jpg",
    "qr": "/assets/pix/37-tramontina-jogo-de-panelas-de-aco-inox-7-pecas.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406569.995802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63045D46"
  },
  {
    "id": "32-micro-ondas-brastemp-32-litros",
    "nome": "Micro-ondas Brastemp 32 L",
    "titulo": "Micro-ondas",
    "detalhe": "Brastemp · 32 L",
    "categoria": "Cozinha",
    "valor": 677.7,
    "imagem": "/assets/img/presentes/32-micro-ondas-brastemp-32-litros.jpg",
    "qr": "/assets/pix/32-micro-ondas-brastemp-32-litros.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406677.705802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304E4F8"
  },
  {
    "id": "35-jogo-de-cama-queen-trussardi-percal-300-fios-piera-marrom",
    "nome": "Jogo de cama queen Trussardi Piera marrom",
    "titulo": "Jogo de cama marrom",
    "detalhe": "Trussardi Piera · queen",
    "categoria": "Cama & Banho",
    "valor": 815.94,
    "imagem": "/assets/img/presentes/35-jogo-de-cama-queen-trussardi-percal-300-fios-piera-marrom.jpg",
    "qr": "/assets/pix/35-jogo-de-cama-queen-trussardi-percal-300-fios-piera-marrom.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406815.945802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***630435E3"
  },
  {
    "id": "36-jogo-de-cama-queen-trussardi-300-fios-percal-100-algodao-ari",
    "nome": "Jogo de cama queen Trussardi Ariani branco e legno",
    "titulo": "Jogo de cama branco",
    "detalhe": "Trussardi Ariani · queen",
    "categoria": "Cama & Banho",
    "valor": 959.94,
    "imagem": "/assets/img/presentes/36-jogo-de-cama-queen-trussardi-300-fios-percal-100-algodao-ari.jpg",
    "qr": "/assets/pix/36-jogo-de-cama-queen-trussardi-300-fios-percal-100-algodao-ari.png",
    "pix": "00020126330014br.gov.bcb.pix0111093370259065204000053039865406959.945802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***6304D46B"
  },
  {
    "id": "30-toca-disco-vinil-audio-technica-automatico",
    "nome": "Toca-discos Audio-Technica",
    "titulo": "Toca-discos",
    "detalhe": "Audio-Technica",
    "categoria": "Decoração",
    "valor": 1599.0,
    "imagem": "/assets/img/presentes/30-toca-disco-vinil-audio-technica-automatico.jpg",
    "qr": "/assets/pix/30-toca-disco-vinil-audio-technica-automatico.png",
    "pix": "00020126330014br.gov.bcb.pix01110933702590652040000530398654071599.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63048373"
  },
  {
    "id": "31-maquina-de-lavar-11kg-branca-slim-midea",
    "nome": "Máquina de lavar Midea 11 kg",
    "titulo": "Máquina de lavar",
    "detalhe": "Midea · 11 kg",
    "categoria": "Casa",
    "valor": 2300.0,
    "imagem": "/assets/img/presentes/31-maquina-de-lavar-11kg-branca-slim-midea.jpg",
    "qr": "/assets/pix/31-maquina-de-lavar-11kg-branca-slim-midea.png",
    "pix": "00020126330014br.gov.bcb.pix01110933702590652040000530398654072300.005802BR5922DEBORA MEISTER PEREIRA6008CRICIUMA62070503***63049541"
  }
];
