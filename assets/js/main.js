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
    var livre = id === 'valor-livre';
    var p = livre
      ? { id: id, nome: 'Presente com valor livre', categoria: 'Valor livre', valor: '', pix: '', qr: '', linkCartao: '' }
      : PRESENTES.filter(function (x) { return x.id === id; })[0];
    if (!p) { location.replace('/presentes'); return; }
    document.title = p.nome + ' – Presentear Débora e Benjamin';
    $('[data-p-img]').innerHTML = imagem(p, 34);
    $('[data-p-nome]').textContent = p.nome;
    $all('[data-p-valor]').forEach(function (el) { el.textContent = livre ? 'Você escolhe o valor' : reais(p.valor); });
    var qr = $('[data-p-qr]');
    if (livre) {
      // Valor livre: gera o Pix (copia e cola + QR Code) com o valor digitado
      var qrImagem = function (texto) {
        var q = qrcode(0, 'M'); q.addData(texto); q.make();
        var n = q.getModuleCount(), m = 4, t = 8, c = document.createElement('canvas');
        c.width = c.height = (n + m * 2) * t;
        var g = c.getContext('2d'); g.fillStyle = '#FFFDF1'; g.fillRect(0, 0, c.width, c.height); g.fillStyle = '#483F29';
        for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect((k + m) * t, (r + m) * t, t, t);
        return c.toDataURL('image/png');
      };
      var atualizarPix = function () {
        var v = parseFloat(($('#valor-livre').value || '').replace(/\./g, '').replace(',', '.'));
        v = v > 0 ? Math.round(v * 100) / 100 : '';
        p.valor = v;
        var codigo = gerarPix(SITE.chavePix.replace(/\D/g, ''), SITE.titularPix, SITE.cidadePix, v);
        $('#codigo-pix').textContent = codigo;
        qr.src = qrImagem(codigo);
        $all('[data-p-valor]').forEach(function (el) { el.textContent = v ? reais(v) : 'Você escolhe o valor'; });
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

    // Celular: botão fixo que leva ao "Conta pra gente" e some quando o formulário aparece na tela
    var conta = $('#conta-pra-gente'), irConta = $('[data-ir-conta]');
    var celular = function () { return window.matchMedia('(max-width: 899px)').matches; };
    var irParaConta = function () { conta.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (conta && irConta) {
      irConta.addEventListener('click', function (e) { e.preventDefault(); irParaConta(); });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (itens) {
          irConta.classList.toggle('visivel', !itens[0].isIntersecting);
        }, { rootMargin: '0px 0px -35% 0px' }).observe(conta);
      } else { irConta.classList.add('visivel'); }
    }
    // Depois de copiar o Pix: avisa e, no celular, desce até o passo 2
    var btnPix = $('[data-copiar-pix]'), copiado = $('[data-copiado-aviso]');
    if (btnPix) {
      btnPix.addEventListener('click', function () {
        if (copiado) copiado.hidden = false;
        if (conta && celular()) setTimeout(irParaConta, 900);
      });
    }

    // QR Code: no celular fica escondido até a pessoa pedir
    var qrBox = $('[data-pix-qr]'), qrBtn = $('[data-qr-toggle]');
    if (qrBox && qrBtn) {
      qrBtn.addEventListener('click', function () {
        var aberto = qrBox.classList.toggle('aberto');
        qrBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        qrBtn.textContent = aberto ? 'Esconder QR Code' : 'Prefere o QR Code? Mostrar';
      });
    }

    // Confirmação do presente (vai para a planilha)
    var fp = $('[data-form-presente]');
    if (fp) {
      var avisoP = $('[data-presente-aviso]');
      var botaoP = $('[data-botao-presente]');
      var forma = function () {
        var aba = $('.aba[aria-selected="true"]');
        return aba && aba.getAttribute('data-aba') === 'cartao' && p.linkCartao ? 'Cartão' : 'Pix';
      };
      var textoBotao = function () { botaoP.textContent = forma() === 'Cartão' ? 'Já paguei no cartão' : 'Já fiz o Pix'; };
      $all('.aba').forEach(function (a) { a.addEventListener('click', textoBotao); });
      if (!SITE.planilha) { botaoP.disabled = true; avisoP.textContent = 'A confirmação de presentes abre em breve.'; }
      fp.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!SITE.planilha) return;
        var quem = fp.quem.value.trim();
        if (quem.length < 2) { avisoP.textContent = 'Escreva seu nome para sabermos quem nos presenteou.'; fp.quem.focus(); return; }
        botaoP.disabled = true; var original = botaoP.textContent; botaoP.textContent = 'Enviando...'; avisoP.textContent = '';
        enviarPlanilha({ tipo: 'presente', nome: quem, presente: p.nome, valor: p.valor, forma: forma(), recado: fp.recado.value.trim() })
          .then(function () {
            fp.hidden = true;
            $('[data-presente-obrigado-texto]').textContent = 'Obrigado, ' + quem.split(' ')[0] + '! Recebemos o seu presente com muito carinho.';
            $('[data-presente-obrigado]').hidden = false;
            var ir = $('[data-ir-conta]'); if (ir) ir.remove();
          })
          .catch(function () {
            botaoP.disabled = false; botaoP.textContent = original;
            avisoP.textContent = 'Não conseguimos registrar agora. Verifique sua internet e tente de novo.';
          });
      });
    }
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

    // Mural equilibrado: distribui fotos e vídeos nas colunas, sempre na coluna mais curta,
    // seguindo a ordem do álbum (assim os vídeos ficam espalhados de cima a baixo)
    var mural = $('.mural');
    if (mural) {
      var itensMural = $all('.foto', mural), colunasAtuais = 0;
      itensMural.forEach(function (el, i) { el.setAttribute('data-ordem', i); });
      var proporcao = function (el) { var m = $('img, video', el); return (+m.getAttribute('height') || 1) / (+m.getAttribute('width') || 1); };
      var montar = function () {
        var n = window.innerWidth >= 900 ? 3 : 2;
        if (n === colunasAtuais) return;
        colunasAtuais = n;
        var cols = [], alturas = [];
        for (var c = 0; c < n; c++) { var d = document.createElement('div'); d.className = 'mural-col'; cols.push(d); alturas.push(0); }
        var ultimaColVideo = -1;
        itensMural.forEach(function (el) {
          var i = alturas.indexOf(Math.min.apply(null, alturas));
          if (el.classList.contains('foto--live')) {
            // vídeo: coluna mais curta, mas nunca a mesma do vídeo anterior
            var melhor = -1;
            alturas.forEach(function (h, c) { if (c !== ultimaColVideo && (melhor < 0 || h < alturas[melhor])) melhor = c; });
            i = melhor; ultimaColVideo = i;
          }
          cols[i].appendChild(el); alturas[i] += proporcao(el) + 0.06;
        });
        mural.innerHTML = ''; cols.forEach(function (d) { mural.appendChild(d); });
        mural.classList.add('mural--js');
      };
      montar();
      var tMural; window.addEventListener('resize', function () { clearTimeout(tMural); tMural = setTimeout(montar, 150); });
    }

    // Fotos "live": o vídeo roda sozinho quando aparece na tela e para quando sai
    var vivos = $all('.foto--live video');
    var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (vivos.length && !parado && 'IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (itens) {
        itens.forEach(function (it) {
          var v = it.target;
          if (it.isIntersecting) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else v.pause();
        });
      }, { threshold: 0.35 });
      vivos.forEach(function (v) { obs.observe(v); });
    }

    var lb = $('[data-lightbox]'), lbImg = $('[data-lb-img]'), lbVid = $('[data-lb-video]'), lbCont = $('[data-lb-contador]');
    var fotos = $all('[data-foto]').sort(function (a, b) { return (+a.getAttribute('data-ordem') || 0) - (+b.getAttribute('data-ordem') || 0); }), atual = 0;
    var abrir = function (i) {
      atual = (i + fotos.length) % fotos.length;
      var f = fotos[atual], video = f.getAttribute('data-video');
      if (video) {
        lbImg.hidden = true; lbImg.src = '';
        lbVid.hidden = false; lbVid.src = video; lbVid.poster = $('video', f).poster;
        lbVid.setAttribute('aria-label', $('video', f).getAttribute('aria-label'));
        var pv = lbVid.play(); if (pv && pv.catch) pv.catch(function () {});
      } else {
        lbVid.pause(); lbVid.hidden = true; lbVid.removeAttribute('src');
        lbImg.hidden = false; lbImg.src = f.getAttribute('data-grande'); lbImg.alt = $('img', f).alt;
      }
      lbCont.textContent = (atual + 1) + ' / ' + fotos.length;
      lb.hidden = false; document.body.style.overflow = 'hidden';
    };
    var fechar = function () { lb.hidden = true; lbImg.src = ''; lbVid.pause(); lbVid.removeAttribute('src'); document.body.style.overflow = ''; fotos[atual].focus(); };
    fotos.forEach(function (f, i) { f.addEventListener('click', function () { abrir(i); }); });
    $('[data-lb-fechar]').addEventListener('click', fechar);
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
