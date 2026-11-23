(function () {
  var SITE = window.SITE || {};
  var PRESENTES = window.PRESENTES || [];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function reais(v) { return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  // Envia os dados para a planilha (Google Apps Script). text/plain evita a checagem extra de CORS.
  function enviarPlanilha(dados) {
    return fetch(SITE.planilha, { method: 'POST', body: JSON.stringify(dados) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.erro) || 'falha'); return j; });
  }

  // Presentes já dados: a planilha devolve a lista (ids e, para registros antigos, nomes).
  // Quem acabou de presentear neste aparelho já vê a etiqueta na hora, sem esperar a planilha.
  var CHAVE_LOCAL = 'presenteados-local';
  function presenteadosLocal() { try { return JSON.parse(sessionStorage.getItem(CHAVE_LOCAL) || '[]'); } catch (e) { return []; } }
  function marcarLocal(id) { try { var l = presenteadosLocal(); if (l.indexOf(id) < 0) l.push(id); sessionStorage.setItem(CHAVE_LOCAL, JSON.stringify(l)); } catch (e) {} }
  function buscarPresenteados() {
    var local = presenteadosLocal();
    if (!SITE.planilha) return Promise.resolve(local);
    return fetch(SITE.planilha + '?acao=presenteados', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var ids = (j && j.ids) || [], nomes = (j && j.nomes) || [];
        PRESENTES.forEach(function (p) { if (nomes.indexOf(p.nome) >= 0) ids.push(p.id); });
        return ids.concat(local);
      })
      .catch(function () { return local; });
  }

  var ICONES = {
    'Cozinha': '<path d="M4 11h16v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/><path d="M1.5 11.5H4M20 11.5h2.5"/><path d="M8 8.5c0-1.4 1.8-2.5 4-2.5s4 1.1 4 2.5"/><path d="M12 4v2"/>',
    'Mesa posta': '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="3.5"/><path d="M3 4v6M4.5 4v6M3 10c0 1 .7 1.5 1.5 1.5V20M21 4c-1.5 0-2.5 2-2.5 5s1 3 2.5 3v8"/>',
    'Bar & drinks': '<path d="M5 3h5v4a2.5 2.5 0 0 1-5 0z"/><path d="M7.5 9.5V18M5.5 20h4"/><path d="M14 3h5v4a2.5 2.5 0 0 1-5 0z"/><path d="M16.5 9.5V18M14.5 20h4"/>',
    'Decoração': '<path d="M9 3h6"/><path d="M10 3v3.5C7.5 8 6 10.5 6 13.5a6 6 0 0 0 12 0c0-3-1.5-5.5-4-7V3"/><path d="M7 14h10"/>',
    'Casa': '<path d="M3 11l9-7 9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
    'Cama & Banho': '<path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 15h18"/><path d="M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10"/>',
    'Lua de mel': '<path d="M21 4L3 11l6.5 2.5L12 20z"/><path d="M9.5 13.5L21 4"/>',
    'Valor livre': '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'
  };
  function imagem(p, tamanho) {
    if (p.imagem) return '<img src="' + p.imagem + '" alt="' + esc(p.nome) + '" loading="lazy" data-cat="' + esc(p.categoria) + '" data-t="' + tamanho + '">';
    return '<svg aria-hidden="true" width="' + tamanho + '" height="' + tamanho + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">' + (ICONES[p.categoria] || ICONES['Casa']) + '</svg>';
  }

  // Se a foto de um presente não carregar, mostra o ícone da categoria
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img.tagName !== 'IMG' || !img.hasAttribute('data-cat')) return;
    img.outerHTML = imagem({ categoria: img.getAttribute('data-cat') }, img.getAttribute('data-t') || 46);
  }, true);

  // Menu (celular)
  var menuBtn = $('.menu-btn');
  var nav = $('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  // Copiar texto
  function copiar(texto, botao) {
    var original = botao.textContent;
    function ok() { botao.textContent = 'Copiado!'; setTimeout(function () { botao.textContent = original; }, 2200); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var t = document.createElement('textarea'); t.value = texto; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) {} document.body.removeChild(t);
    }
  }
  $all('[data-copiar]').forEach(function (b) {
    b.addEventListener('click', function () {
      var alvo = document.getElementById(b.getAttribute('data-copiar'));
      if (alvo) copiar(alvo.textContent.trim(), b);
    });
  });

  // Dados do site em elementos
  $all('[data-chave-pix]').forEach(function (el) { el.textContent = SITE.chavePix; });

  // Contagem regressiva
  var contador = $('[data-contador]');
  if (contador) {
    var alvo = new Date('2027-03-27T15:30:00-03:00').getTime();
    var campos = { d: $('[data-d]'), h: $('[data-h]'), m: $('[data-m]'), s: $('[data-s]') };
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var t = Math.max(0, Math.floor((alvo - Date.now()) / 1000));
      var d = Math.floor(t / 86400); t -= d * 86400;
      var h = Math.floor(t / 3600); t -= h * 3600;
      var m = Math.floor(t / 60); var s = t - m * 60;
      campos.d.textContent = d; campos.h.textContent = pad(h); campos.m.textContent = pad(m); campos.s.textContent = pad(s);
    };
    tick(); setInterval(tick, 1000);
  }

  // Lista de presentes
  var grade = $('[data-presentes]');
  if (grade) {
    var filtroAtual = 'Todos';
    var dados = presenteadosLocal();
    var desenhar = function () {
      var lista = PRESENTES.filter(function (p) { return filtroAtual === 'Todos' || p.categoria === filtroAtual; });
      // Os já presenteados vão para o fim, na mesma ordem de preço
      var livres = lista.filter(function (p) { return dados.indexOf(p.id) < 0; });
      var dadosLista = lista.filter(function (p) { return dados.indexOf(p.id) >= 0; });
      grade.innerHTML = livres.concat(dadosLista).map(function (p) {
        var foi = dados.indexOf(p.id) >= 0;
        return '<article class="card presente' + (foi ? ' presenteado' : '') + '">' +
          '<div class="presente-img">' + imagem(p, 46) +
            (foi ? '<span class="etiqueta-presenteado"><svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Presenteado</span>' : '') +
          '</div>' +
          '<div class="presente-info">' +
            '<h2>' + esc(p.titulo || p.nome) + '</h2>' +
            (p.detalhe ? '<span class="presente-detalhe">' + esc(p.detalhe) + '</span>' : '') +
          '</div>' +
          '<span class="preco">' + reais(p.valor) + '</span>' +
          (foi
            ? '<span class="btn btn--presenteado" aria-disabled="true">Já presenteado</span>'
            : '<a class="btn" href="/pagamento?p=' + encodeURIComponent(p.id) + '">Presentear</a>') +
          '</article>';
      }).join('');
    };
    buscarPresenteados().then(function (ids) { dados = ids; desenhar(); });
    $all('.filtro').forEach(function (b) {
      b.addEventListener('click', function () {
        filtroAtual = b.getAttribute('data-filtro');
        $all('.filtro').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        desenhar();
      });
    });
    desenhar();
  }

  // Pagamento (estilo checkout: escolhe a forma, continua, paga)
  var pag = $('[data-pagamento]');
  if (pag) {
    var id = new URLSearchParams(location.search).get('p');
    var livre = id === 'valor-livre';
    var p = livre
      ? { id: id, nome: 'Presente com valor livre', categoria: 'Valor livre', valor: '', pix: '', qr: '', linkCartao: '' }
      : PRESENTES.filter(function (x) { return x.id === id; })[0];
    if (!p) { location.replace('/presentes'); return; }
    document.title = p.nome + ' – Presentear Débora e Benjamin';
    $('[data-p-img]').innerHTML = imagem(p, 34);
    $('[data-p-nome]').textContent = p.nome;

    // Cartão: ativo quando a chave pública do Mercado Pago estiver em dados.js.
    // Nos endereços de prévia (*.vercel.app) a tela aparece mesmo sem a chave, só para ver o visual.
    var previa = /\.vercel\.app$/.test(location.hostname) || location.hostname === 'localhost';
    var cartaoAtivo = !!SITE.mercadoPagoPublicKey;
    var mostraCartao = cartaoAtivo || previa;
    // Sem a chave do Mercado Pago (site oficial): o cartão aparece, mas como "em breve", sem poder escolher
    if (!mostraCartao) {
      var oc = $('[data-opcao-cartao]');
      if (oc) {
        oc.classList.add('opcao--breve');
        oc.setAttribute('aria-disabled', 'true');
        $('input', oc).disabled = true;
        $('small', oc).textContent = 'Disponível em breve';
        $('.opcao-marca', oc).outerHTML = '<span class="selo-breve">Em breve</span>';
      }
    }
    if (!cartaoAtivo) {
      var aviso = document.createElement('p');
      aviso.className = 'aviso-previa';
      aviso.textContent = 'Prévia: o cartão ainda não está ligado ao Mercado Pago. Pode testar com números inventados, nada é enviado.';
      $('[data-form-cartao]').insertBefore(aviso, $('[data-form-cartao]').firstChild);
    }

    var valorTexto = function () { return p.valor ? reais(p.valor) : 'Você escolhe o valor'; };
    var atualizarValores = function () {
      $all('[data-p-valor]').forEach(function (el) { el.textContent = valorTexto(); });
      montarParcelas();
    };

    // Etapas
    var etapas = $all('[data-etapa]');
    var boxConta = $('[data-presente-box]');
    var boxObrigado = $('[data-obrigado]');
    var irPara = function (nome) {
      etapas.forEach(function (el) { el.hidden = el.getAttribute('data-etapa') !== nome; });
      boxConta.hidden = nome !== 'pix';
      var checkout = $('.checkout');
      if (nome !== 'escolha') checkout.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    var formaEscolhida = function () { var r = $('input[name="forma"]:checked'); return r ? r.value : 'pix'; };
    var avisoValor = function () {
      if (livre && !(p.valor > 0)) { var c = $('#valor-livre'); c.focus(); c.closest('.campo-valor').classList.add('erro'); return true; }
      return false;
    };
    $('[data-continuar]').addEventListener('click', function () {
      if (avisoValor()) return;
      irPara(formaEscolhida());
    });
    $all('[data-trocar]').forEach(function (b) { b.addEventListener('click', function () { irPara('escolha'); }); });

    // Se alguém já deu este presente, avisa e esconde o pagamento
    var jaDado = function () {
      var aviso = document.createElement('div');
      aviso.className = 'card ja-presenteado';
      aviso.innerHTML = '<span class="script">Este já foi!</span>' +
        '<p>Alguém já nos deu este presente. Que tal escolher outro item da lista?</p>' +
        '<a class="btn" href="/presentes">Ver a lista de presentes</a>';
      var grid = $('.pag-grid');
      grid.parentNode.insertBefore(aviso, grid);
      grid.hidden = true;
    };
    var recemDado = false;
    if (!livre) buscarPresenteados().then(function (ids) { if (ids.indexOf(p.id) >= 0 && !recemDado) jaDado(); });

    // Pix
    var qr = $('[data-p-qr]');
    var qrImagem = function (texto) {
      var q = qrcode(0, 'M'); q.addData(texto); q.make();
      var n = q.getModuleCount(), m = 4, t = 8, c = document.createElement('canvas');
      c.width = c.height = (n + m * 2) * t;
      var g = c.getContext('2d'); g.fillStyle = '#FFFDF1'; g.fillRect(0, 0, c.width, c.height); g.fillStyle = '#483F29';
      for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect((k + m) * t, (r + m) * t, t, t);
      return c.toDataURL('image/png');
    };
    if (livre) {
      var atualizarPix = function () {
        var v = parseFloat(($('#valor-livre').value || '').replace(/\./g, '').replace(',', '.'));
        v = v > 0 ? Math.round(v * 100) / 100 : '';
        p.valor = v;
        if (v) $('#valor-livre').closest('.campo-valor').classList.remove('erro');
        var codigo = gerarPix(SITE.chavePix.replace(/\D/g, ''), SITE.titularPix, SITE.cidadePix, v);
        $('#codigo-pix').textContent = codigo;
        qr.src = qrImagem(codigo);
        atualizarValores();
      };
      $('[data-valor-livre]').hidden = false;
      var tempo; $('#valor-livre').addEventListener('input', function () { clearTimeout(tempo); tempo = setTimeout(atualizarPix, 250); });
      atualizarPix();
    } else {
      $('#codigo-pix').textContent = p.pix;
      qr.src = p.qr;
    }
    qr.alt = 'QR Code Pix – ' + p.nome;
    $('[data-titular]').textContent = 'Chave CPF ' + SITE.chavePix + ' · ' + SITE.titularPix;
    var btnPix = $('[data-copiar-pix]'), copiado = $('[data-copiado-aviso]');
    if (btnPix) btnPix.addEventListener('click', function () { if (copiado) copiado.hidden = false; });

    var obrigado = function (quem, ehPrevia) {
      recemDado = true;
      if (!livre && !ehPrevia) marcarLocal(p.id);
      etapas.forEach(function (el) { el.hidden = true; });
      boxConta.hidden = true;
      var vl = $('[data-valor-livre]'); if (vl) vl.hidden = true;
      $('[data-presente-obrigado-texto]').textContent = 'Obrigado, ' + quem.split(' ')[0] + '! Recebemos o seu presente com muito carinho.';
      $('[data-obrigado-previa]').hidden = !ehPrevia;
      boxObrigado.hidden = false;
      boxObrigado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // Pix: "Conta pra gente" (vai para a planilha)
    var fp = $('[data-form-presente]');
    var avisoP = $('[data-presente-aviso]');
    var botaoP = $('[data-botao-presente]');
    if (!SITE.planilha) { botaoP.disabled = true; avisoP.textContent = 'A confirmação de presentes abre em breve.'; }
    fp.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!SITE.planilha) return;
      var quem = fp.quem.value.trim();
      if (quem.length < 2) { avisoP.textContent = 'Escreva seu nome para sabermos quem nos presenteou.'; fp.quem.focus(); return; }
      botaoP.disabled = true; var original = botaoP.textContent; botaoP.textContent = 'Enviando...'; avisoP.textContent = '';
      enviarPlanilha({ tipo: 'presente', id: p.id, nome: quem, presente: p.nome, valor: p.valor, forma: 'Pix', recado: fp.recado.value.trim() })
        .then(function () { obrigado(quem, false); })
        .catch(function () {
          botaoP.disabled = false; botaoP.textContent = original;
          avisoP.textContent = 'Não conseguimos registrar agora. Verifique sua internet e tente de novo.';
        });
    });

    // Cartão de crédito
    var selParcelas = $('[data-parcelas]');
    function montarParcelas() {
      if (!selParcelas) return;
      var v = Number(p.valor) || 0, atual = selParcelas.value || '1', html = '';
      var max = v ? Math.max(1, Math.min(12, Math.floor(v / 10))) : 1; // parcela mínima de R$ 10
      for (var n = 1; n <= max; n++) {
        html += '<option value="' + n + '">' + n + 'x de ' + (v ? reais(Math.round(v / n * 100) / 100) : 'R$ 0,00') + (n === 1 ? ' (à vista)' : '') + '</option>';
      }
      selParcelas.innerHTML = html;
      if (Number(atual) <= max) selParcelas.value = atual;
    }
    var soNumeros = function (s) { return String(s).replace(/\D/g, ''); };
    var mascara = function (el, fn) { el.addEventListener('input', function () { el.value = fn(el.value); }); };
    var numero = $('#cc-numero'), validade = $('#cc-validade'), cvv = $('#cc-cvv'), cpf = $('#cc-cpf');
    var bandeira = function (n) {
      if (/^4/.test(n)) return 'Visa';
      if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
      if (/^3[47]/.test(n)) return 'Amex';
      if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(n)) return 'Elo';
      if (/^(606282|3841)/.test(n)) return 'Hipercard';
      return '';
    };
    mascara(numero, function (v) { v = soNumeros(v).slice(0, 19); return v.replace(/(\d{4})(?=\d)/g, '$1 '); });
    numero.addEventListener('input', function () { $('[data-bandeira]').textContent = bandeira(soNumeros(numero.value)); });
    mascara(validade, function (v) { v = soNumeros(v).slice(0, 4); return v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; });
    mascara(cvv, function (v) { return soNumeros(v).slice(0, 4); });
    mascara(cpf, function (v) {
      v = soNumeros(v).slice(0, 11);
      return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
    });
    var ccNome = $('#cc-nome'), ccQuem = $('#cc-quem'), quemMexido = false;
    ccQuem.addEventListener('input', function () { quemMexido = true; });
    ccNome.addEventListener('input', function () {
      if (!quemMexido) ccQuem.value = ccNome.value.toLowerCase().replace(/(^|\s)\S/g, function (l) { return l.toUpperCase(); });
    });

    var fc = $('[data-form-cartao]');
    var avisoC = $('[data-cartao-aviso]');
    fc.addEventListener('submit', function (e) {
      e.preventDefault();
      var faltando = [];
      $all('.campo-caixa.erro', fc).forEach(function (c) { c.classList.remove('erro'); });
      var checa = function (el, ok) { if (!ok) { el.closest('.campo-caixa').classList.add('erro'); faltando.push(el); } };
      checa(numero, soNumeros(numero.value).length >= 13);
      checa(ccNome, ccNome.value.trim().length >= 3);
      checa(validade, /^(0[1-9]|1[0-2])\/\d\d$/.test(validade.value));
      checa(cvv, soNumeros(cvv.value).length >= 3);
      checa(cpf, soNumeros(cpf.value).length === 11);
      checa($('#cc-email'), /^\S+@\S+\.\S+$/.test($('#cc-email').value));
      checa(ccQuem, ccQuem.value.trim().length >= 2);
      if (faltando.length) { avisoC.textContent = 'Confira os campos destacados.'; faltando[0].focus(); return; }
      if (livre && !(p.valor > 0)) { avisoValor(); return; }
      avisoC.textContent = '';
      var botao = $('[data-botao-pagar]');
      botao.disabled = true; botao.classList.add('carregando');
      if (!cartaoAtivo) {
        // Prévia: simula a aprovação para mostrar a tela final
        setTimeout(function () { obrigado(ccQuem.value.trim(), true); }, 1200);
        return;
      }
      // Aqui entra o envio ao Mercado Pago (Secure Fields + função na Vercel) quando a conta estiver pronta.
    });

    atualizarValores();
  }

  // Álbum: pastas e foto ampliada
  var pastas = $all('[data-pasta]');
  if (pastas.length) {
    var mostrarPasta = function () {
      var nome = (location.hash || '#nossa-historia').slice(1);
      if (!$('[data-conteudo="' + nome + '"]')) nome = 'nossa-historia';
      pastas.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('data-pasta') === nome ? 'true' : 'false'); });
      $all('[data-conteudo]').forEach(function (c) { c.hidden = c.getAttribute('data-conteudo') !== nome; });
    };
    pastas.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        history.replaceState(null, '', a.getAttribute('href'));
        mostrarPasta();
      });
    });
    window.addEventListener('hashchange', mostrarPasta);
    mostrarPasta();

    // Mural em fileiras justificadas: cada foto/vídeo mantém a proporção original,
    // cada fileira ocupa a largura toda e o conjunto fecha um retângulo (reto em cima e embaixo)
    var mural = $('.mural');
    if (mural) {
      var pecas = $all('.foto', mural);
      var prop = pecas.map(function (el) { var m = $('img, video', el); return (+m.getAttribute('width') || 1) / (+m.getAttribute('height') || 1); });
      var larguraAnterior = 0;
      var montar = function () {
        var W = mural.clientWidth; if (!W || W === larguraAnterior) return; larguraAnterior = W;
        var celular = W < 600, gap = celular ? 8 : 14, alvo = celular ? 210 : 320, maxPorFileira = celular ? 3 : 5;
        var n = pecas.length, custo = [0], corte = [0];
        // escolhe onde quebrar as fileiras para que todas fiquem perto da altura-alvo
        for (var i = 1; i <= n; i++) {
          custo[i] = Infinity;
          for (var j = Math.max(0, i - maxPorFileira); j < i; j++) {
            var soma = 0; for (var k = j; k < i; k++) soma += prop[k];
            var h = (W - gap * (i - j - 1)) / soma;
            var menor = Infinity; for (var k3 = j; k3 < i; k3++) menor = Math.min(menor, prop[k3] * h);
            var c = custo[j] + Math.pow(h / alvo - 1, 2) * 100 + (i - j === 1 ? 1.5 : 0) + (celular && menor < W * 0.27 ? 40 : 0);
            if (c < custo[i]) { custo[i] = c; corte[i] = j; }
          }
        }
        var fileiras = []; for (var f = n; f > 0; f = corte[f]) fileiras.unshift([corte[f], f]);
        mural.innerHTML = '';
        fileiras.forEach(function (r) {
          var linha = document.createElement('div'); linha.className = 'mural-fileira'; linha.style.gap = gap + 'px';
          var soma = 0; for (var k = r[0]; k < r[1]; k++) soma += prop[k];
          var h = (W - gap * (r[1] - r[0] - 1)) / soma;
          for (var k2 = r[0]; k2 < r[1]; k2++) {
            var el = pecas[k2];
            el.style.width = (prop[k2] * h) + 'px'; el.style.height = h + 'px';
            linha.appendChild(el);
          }
          mural.appendChild(linha);
        });
        mural.style.rowGap = gap + 'px';
        mural.classList.add('mural--justificado');
      };
      montar();
      var tMural; window.addEventListener('resize', function () { clearTimeout(tMural); tMural = setTimeout(montar, 120); });
    }

    // Fotos "live": a foto fica por baixo e o vídeo aparece por cima quando começa a rodar.
    // Se o celular não deixar tocar (ex.: economia de bateria), a foto continua aparecendo.
    var vivos = $all('.live-video');
    var tocar = function (v) {
      v.muted = true; v.defaultMuted = true; v.playsInline = true;
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    };
    vivos.forEach(function (v) {
      v.addEventListener('playing', function () { v.parentNode.classList.add('tocando'); });
      tocar(v);
    });
    if (vivos.length && 'IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (itens) {
        itens.forEach(function (it) { if (it.isIntersecting) tocar(it.target); else it.target.pause(); });
      }, { threshold: 0.2 });
      vivos.forEach(function (v) { obs.observe(v); });
    }
    // primeiro toque na página: tenta de novo (destrava vídeos no iPhone)
    var destravar = function () {
      vivos.forEach(function (v) { if (v.paused) tocar(v); });
      document.removeEventListener('touchstart', destravar); document.removeEventListener('click', destravar);
    };
    document.addEventListener('touchstart', destravar, { passive: true });
    document.addEventListener('click', destravar);

    var lb = $('[data-lightbox]'), lbImg = $('[data-lb-img]'), lbVid = $('[data-lb-video]'), lbCont = $('[data-lb-contador]');
    var fotos = $all('[data-foto]'), atual = 0;
    var abrir = function (i) {
      atual = (i + fotos.length) % fotos.length;
      var f = fotos[atual], video = f.getAttribute('data-video');
      if (video) {
        lbImg.hidden = true; lbImg.src = '';
        var pi = $('.live-poster', f);
        lbVid.hidden = false; lbVid.muted = true; lbVid.playsInline = true;
        lbVid.width = pi.getAttribute('width'); lbVid.height = pi.getAttribute('height');
        lbVid.style.aspectRatio = pi.getAttribute('width') + ' / ' + pi.getAttribute('height');
        lbVid.poster = pi.src; lbVid.src = video; lbVid.load();
        lbVid.setAttribute('aria-label', pi.alt);
        lb.hidden = false;
        var pv = lbVid.play(); if (pv && pv.catch) pv.catch(function () {});
      } else {
        lbVid.pause(); lbVid.hidden = true; lbVid.removeAttribute('src');
        lbImg.hidden = false; lbImg.src = f.getAttribute('data-grande'); lbImg.alt = $('img', f).alt;
      }
      lbCont.textContent = (atual + 1) + ' / ' + fotos.length;
      lb.hidden = false; document.body.style.overflow = 'hidden';
    };
    var fechar = function () { lb.hidden = true; lbImg.src = ''; lbVid.pause(); lbVid.removeAttribute('src'); document.body.style.overflow = ''; fotos[atual].focus(); };
    fotos.forEach(function (f, i) {
      f.addEventListener('click', function () { abrir(i); });
      f.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(i); } });
    });
    $('[data-lb-fechar]').addEventListener('click', fechar);
    lbVid.addEventListener('click', function () { if (lbVid.paused) { var p = lbVid.play(); if (p && p.catch) p.catch(function () {}); } });
    $('[data-lb-ant]').addEventListener('click', function () { abrir(atual - 1); });
    $('[data-lb-prox]').addEventListener('click', function () { abrir(atual + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) fechar(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowLeft') abrir(atual - 1);
      if (e.key === 'ArrowRight') abrir(atual + 1);
    });
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) abrir(atual + (dx < 0 ? 1 : -1));
    });
  }

  // Confirmação de presença (vai para a planilha)
  var form = $('[data-form-presenca]');
  if (form) {
    var aviso = $('[data-form-aviso]');
    var avisoPadrao = aviso.textContent;
    var CONVITES = window.CONVITES || [];
    var campo = form.nome;
    var lista = $('#sugestoes');
    var escolhido = '';
    var ativo = -1;
    var semAcento = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); };

    // Mostra só os convites que combinam com o que foi digitado (a partir de 2 letras, no máximo 4)
    var buscar = function () {
      var t = semAcento(campo.value).replace(/\s+/g, ' ');
      if (t.length < 2) return [];
      return CONVITES.filter(function (c) { return semAcento(c).indexOf(t) !== -1; }).slice(0, 4);
    };
    var fechar = function () { lista.hidden = true; lista.innerHTML = ''; ativo = -1; campo.setAttribute('aria-expanded', 'false'); };
    var marcarAtivo = function () {
      $all('li', lista).forEach(function (li, i) { li.setAttribute('aria-selected', i === ativo ? 'true' : 'false'); });
    };
    var escolher = function (nome) {
      escolhido = nome; campo.value = nome; fechar();
      aviso.textContent = avisoPadrao;
    };
    var mostrar = function () {
      var achados = buscar();
      ativo = -1;
      if (!achados.length) {
        if (semAcento(campo.value).length >= 2) {
          lista.innerHTML = '<li class="sugestao-vazia" aria-disabled="true">Não encontramos esse nome na lista. Tente só o primeiro nome.</li>';
          lista.hidden = false; campo.setAttribute('aria-expanded', 'true');
        } else { fechar(); }
        return;
      }
      lista.innerHTML = achados.map(function (c, i) {
        return '<li role="option" id="sug-' + i + '" data-nome="' + esc(c) + '" aria-selected="false">' + esc(c) + '</li>';
      }).join('');
      lista.hidden = false; campo.setAttribute('aria-expanded', 'true');
    };

    campo.addEventListener('input', function () { escolhido = ''; mostrar(); });
    campo.addEventListener('focus', function () { if (!escolhido) mostrar(); });
    campo.addEventListener('keydown', function (e) {
      var itens = $all('li[data-nome]', lista);
      if (lista.hidden || !itens.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); ativo = (ativo + 1) % itens.length; marcarAtivo(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); ativo = (ativo - 1 + itens.length) % itens.length; marcarAtivo(); }
      else if (e.key === 'Enter') { e.preventDefault(); escolher(itens[ativo >= 0 ? ativo : 0].getAttribute('data-nome')); }
      else if (e.key === 'Escape') { fechar(); }
    });
    // mousedown para escolher antes do campo perder o foco
    lista.addEventListener('mousedown', function (e) {
      var li = e.target.closest('li[data-nome]');
      if (!li) return;
      e.preventDefault();
      escolher(li.getAttribute('data-nome'));
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.busca-nome')) fechar(); });

    // Sem o endereço da planilha: dá para preencher, mas o envio fica desativado
    var botao = $('button[type="submit"]', form);
    if (!SITE.planilha) {
      botao.disabled = true;
      aviso.textContent = avisoPadrao = 'As confirmações abrem em breve.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!SITE.planilha) return;
      var resp = form.querySelector('input[name="resposta"]:checked');
      if (!escolhido) { aviso.textContent = 'Digite seu nome e escolha o seu convite na lista.'; campo.focus(); mostrar(); return; }
      if (!resp) { aviso.textContent = 'Escolha uma das opções.'; return; }
      botao.disabled = true; botao.textContent = 'Enviando...'; aviso.textContent = '';
      enviarPlanilha({ tipo: 'presenca', convite: escolhido, resposta: resp.value })
        .then(function () {
          var vai = resp.value === 'sim';
          $('.obrigado .muted').textContent = vai
            ? 'Recebemos sua confirmação! Que tal dar uma olhada na nossa lista de presentes?'
            : 'Que pena! Recebemos sua resposta. Se quiser, você ainda pode nos presentear pela lista.';
          form.hidden = true;
          $('.obrigado').style.display = 'flex';
        })
        .catch(function () {
          botao.disabled = false; botao.textContent = 'Enviar resposta';
          aviso.textContent = 'Não conseguimos enviar agora. Verifique sua internet e tente de novo.';
        });
    });
  }
})();
