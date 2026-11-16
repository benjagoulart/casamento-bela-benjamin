(function () {
  var SITE = window.SITE || {};
  var PRESENTES = window.PRESENTES || [];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function reais(v) { return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function whatsLink(texto) { return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(texto); }

  var ICONES = {
    'Cozinha': '<path d="M4 11h16v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/><path d="M1.5 11.5H4M20 11.5h2.5"/><path d="M8 8.5c0-1.4 1.8-2.5 4-2.5s4 1.1 4 2.5"/><path d="M12 4v2"/>',
    'Mesa & Bar': '<path d="M5 3h5v4a2.5 2.5 0 0 1-5 0z"/><path d="M7.5 9.5V18M5.5 20h4"/><path d="M14 3h5v4a2.5 2.5 0 0 1-5 0z"/><path d="M16.5 9.5V18M14.5 20h4"/>',
    'Casa': '<path d="M9 3h6"/><path d="M10 3v3.5C7.5 8 6 10.5 6 13.5a6 6 0 0 0 12 0c0-3-1.5-5.5-4-7V3"/><path d="M7 14h10"/>',
    'Cama & Banho': '<path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 15h18"/><path d="M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10"/>',
    'Lua de mel': '<path d="M21 4L3 11l6.5 2.5L12 20z"/><path d="M9.5 13.5L21 4"/>'
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
  $all('[data-camicado]').forEach(function (el) { el.href = SITE.listaCamicado; });
  $all('[data-so-whatsapp]').forEach(function (el) { if (!SITE.whatsapp) el.hidden = true; });

  // Contagem regressiva
  var contador = $('[data-contador]');
  if (contador) {
    var alvo = new Date('2027-03-27T16:00:00-03:00').getTime();
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
    var desenhar = function () {
      var lista = PRESENTES.filter(function (p) { return filtroAtual === 'Todos' || p.categoria === filtroAtual; });
      grade.innerHTML = lista.map(function (p) {
        return '<article class="card presente">' +
          '<div class="presente-img">' + imagem(p, 46) + '</div>' +
          '<h2>' + esc(p.nome) + '</h2>' +
          '<span class="preco">' + reais(p.valor) + '</span>' +
          '<a class="btn" href="/pagamento?p=' + encodeURIComponent(p.id) + '">Presentear</a>' +
          '</article>';
      }).join('');
    };
    $all('.filtro').forEach(function (b) {
      b.addEventListener('click', function () {
        filtroAtual = b.getAttribute('data-filtro');
        $all('.filtro').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        desenhar();
      });
    });
    desenhar();
  }

  // Pagamento
  var pag = $('[data-pagamento]');
  if (pag) {
    var id = new URLSearchParams(location.search).get('p');
    var p = PRESENTES.filter(function (x) { return x.id === id; })[0];
    if (!p) { location.replace('/presentes'); return; }
    document.title = p.nome + ' – Presentear Débora e Benjamin';
    $('[data-p-img]').innerHTML = imagem(p, 34);
    $('[data-p-nome]').textContent = p.nome;
    $all('[data-p-valor]').forEach(function (el) { el.textContent = reais(p.valor); });
    $('#codigo-pix').textContent = p.pix;
    var qr = $('[data-p-qr]'); qr.src = p.qr; qr.alt = 'QR Code Pix – ' + p.nome;
    $('[data-titular]').textContent = 'Chave CPF ' + SITE.chavePix + ' · ' + SITE.titularPix;
    var cartao = $('[data-metodo="cartao"]');
    var abas = $('.abas');
    if (p.linkCartao) {
      $('[data-link-cartao]').href = p.linkCartao;
      $all('.aba').forEach(function (aba) {
        aba.addEventListener('click', function () {
          var m = aba.getAttribute('data-aba');
          $all('.aba').forEach(function (x) { x.setAttribute('aria-selected', x === aba ? 'true' : 'false'); });
          $all('[data-metodo]').forEach(function (el) { el.hidden = el.getAttribute('data-metodo') !== m; });
        });
      });
    } else {
      abas.hidden = true;
      cartao.hidden = true;
      cartao.classList.add('sem-link');
    }
    var w = $('[data-whats-presente]');
    if (w) w.href = whatsLink('Oi, Débora e Benjamin! Acabei de dar o presente "' + p.nome + '" pela lista do site. Com carinho, ');
  }

  // Confirmação de presença (via WhatsApp)
  var form = $('[data-form-presenca]');
  if (form) {
    var aviso = $('[data-form-aviso]');
    if (!SITE.whatsapp) {
      $all('input, button', form).forEach(function (el) { el.disabled = true; });
      aviso.textContent = 'As confirmações abrem em breve.';
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var resp = form.querySelector('input[name="resposta"]:checked');
      if (!nome || !resp) { aviso.textContent = 'Preencha seu nome e escolha uma opção.'; return; }
      var texto = resp.value === 'sim'
        ? 'Oi, Débora e Benjamin! Aqui é ' + nome + '. Confirmo minha presença no casamento de vocês em 27/03/2027!'
        : 'Oi, Débora e Benjamin! Aqui é ' + nome + '. Infelizmente não poderei ir ao casamento, mas desejo tudo de mais lindo para vocês!';
      window.open(whatsLink(texto), '_blank');
      form.hidden = true;
      $('.obrigado').style.display = 'flex';
    });
  }
})();
