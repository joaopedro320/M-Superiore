(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Links de WhatsApp (CTAs) */
  $$('[data-wa]').forEach(function (a) {
    a.href = qh4WaUrl(QH4.msgCTA);
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', function () {
      qh4Push('whatsapp_click', { wa_local: a.getAttribute('data-wa') });
    });
  });

  /* Header */
  var hdr = $('.hdr');
  function onScroll() {
    if (hdr) hdr.classList.toggle('sc', window.scrollY > 40);
    var y = window.scrollY;
    var img = $('.hero-art .a1 img');
    if (img && y < window.innerHeight * 1.2) img.style.transform = 'translateY(' + (-y * 0.06) + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        if (e.target.classList.contains('st')) {
          var row = e.target.parentNode;
          var all = $$('.st', row);
          row.style.setProperty('--p', Math.round(((all.indexOf(e.target) + 1) / all.length) * 100) + '%');
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }) : null;
  $$('.rv,.rv-img,.st').forEach(function (el, i) {
    if (io) io.observe(el); else el.classList.add('in');
  });

  $$('.hero-art .rv-img').forEach(function (el) { setTimeout(function () { el.classList.add('in'); }, 250); });

  /* Marquee: duplica o conteúdo para loop contínuo */
  var mq = $('.mq-t');
  if (mq) mq.innerHTML += mq.innerHTML;

  /* Rail de trabalhos: arrastar com mouse */
  var rail = $('.rail');
  if (rail) {
    var down = false, sx = 0, sl = 0, moved = 0;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('drag');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () { down = false; rail.classList.remove('drag'); });
    rail.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  /* Lightbox */
  var lb = $('.lb');
  if (lb) {
    var lbImg = $('img', lb);
    $$('.card').forEach(function (c) {
      c.addEventListener('click', function () {
        var im = $('img', c);
        lbImg.src = im.currentSrc || im.src;
        lbImg.alt = im.alt;
        lb.classList.add('on');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() { lb.classList.remove('on'); document.body.style.overflow = ''; }
    lb.addEventListener('click', closeLb);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* FAQ: um aberto por vez */
  $$('details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) $$('details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* Formulário */
  var form = $('#form-lead');
  if (form) {
    var btn = $('button[type=submit]', form);
    var started = false;
    var phone = $('#f-whats');

    function maskPhone() {
      var v = phone.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d*)/, '($1) $2');
      phone.value = v;
    }
    function validate() {
      btn.disabled = !form.checkValidity();
    }
    phone.addEventListener('input', maskPhone);
    form.addEventListener('input', function () {
      if (!started) { started = true; qh4Push('form_start'); }
      validate();
    });
    form.addEventListener('change', validate);
    validate();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) return;
      var d = {
        nome: $('#f-nome').value.trim(),
        whatsapp: phone.value.trim(),
        local: $('#f-local').value.trim(),
        projeto: $('#f-projeto').value,
        material: $('#f-material').value,
        mensagem: $('#f-msg').value.trim()
      };
      qh4Push('generate_lead', { projeto: d.projeto, material: d.material });
      btn.disabled = true;
      btn.firstChild.nodeValue = 'Enviando...';

      if (QH4.webhook) {
        var body = new URLSearchParams(d);
        body.append('lp', QH4.lp);
        body.append('origem', document.referrer || 'direto');
        body.append('url', location.href);
        fetch(QH4.webhook, { method: 'POST', mode: 'no-cors', body: body }).catch(function () {})
          .then(function () { location.href = 'obrigado.html'; });
      } else {
        var m = 'Olá! Vim pelo site da Marmoraria e gostaria de solicitar um orçamento.\n\n' +
          '*Nome:* ' + d.nome + '\n' +
          '*WhatsApp:* ' + d.whatsapp + '\n' +
          '*Bairro/Cidade:* ' + d.local + '\n' +
          '*Projeto:* ' + d.projeto + '\n' +
          '*Material:* ' + d.material +
          (d.mensagem ? '\n*Detalhes:* ' + d.mensagem : '');
        setTimeout(function () { location.href = qh4WaUrl(m); }, 250);
      }
    });
  }
})();
