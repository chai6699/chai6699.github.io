/* Edit the LINKS block: it is the only place links live.
   Any entry left empty hides its link, so nothing renders as a dead link. */
const LINKS = {
  linkedin:      'https://www.linkedin.com/in/chaithanya-virupaksha-6b1675295/',
  github:        'https://github.com/chai6699',

  diss_code:     'https://github.com/chai6699/federated-learning-packet-loss',
  proj1_code:    '',   // Bookstore platform repository
  proj1_writeup: '',   // Bookstore architecture write-up (repo README, PDF, blog post)
  sysdash_code:  'https://github.com/chai6699/sysdash',
  proj2_code:    '',   // AI bias audit repository
  proj3_report:  '',   // Tokeneer assessment (PDF in this folder is fine, e.g. 'tokeneer.pdf')

  pub1:          'https://egnitronscientificpress.com/index.php/IJDTSC/article/view/34',   // Digital twin paper
  pub2:          'https://ijircce.com/admin/main/storage/app/pdf/1XyNwt4eVbHe94UilAMMsQMiH82gUZjgXSN0gH4J.pdf'    // Smart irrigation paper
};

(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // links
  $$('[data-link]').forEach(function (el) {
    var u = LINKS[el.dataset.link];
    if (u) { el.href = u; el.target = '_blank'; el.rel = 'noopener'; } else el.hidden = true;
  });
  $$('[data-link-row]').forEach(function (el) {
    var u = LINKS[el.dataset.linkRow];
    if (u) { el.href = u; el.target = '_blank'; el.rel = 'noopener'; }
    else { el.removeAttribute('href'); el.style.cursor = 'default'; var g = $('.go', el); if (g) g.remove(); }
  });
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  // theme
  var tb = $('#themebtn'), root = document.documentElement;
  if (tb) tb.addEventListener('click', function () {
    var t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = t; try { localStorage.setItem('theme', t); } catch (e) {}
  });

  // clock (UK time)
  var ck = $('#clock');
  function tick() { try { ck.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }); } catch (e) {} }
  if (ck) { tick(); setInterval(tick, 20000); }

  // reveal + count-up
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      e.target.classList.add('in');
      $$('[data-count]', e.target).concat(e.target.matches('[data-count]') ? [e.target] : []).forEach(count);
    });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function count(el) {
    if (reduce || el.dataset.done) return; el.dataset.done = 1;
    var end = +el.dataset.count, suf = el.dataset.suffix || '', t0;
    (function step(t) { t0 = t0 || t; var p = Math.min((t - t0) / 1100, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); })(performance.now());
  }
  $$('.bento > *').forEach(function (t) { if (io && !reduce) io.observe(t); else t.classList.add('in'); });

  // rotating phrase
  var rot = $('#rot'), words = ['holds up in production', 'survives bad Wi-Fi', 'explains its own decisions', 'is tested before it ships', 'people enjoy using'];
  if (rot && !reduce) {
    var wi = 0, ci = words[0].length, del = true;
    setTimeout(function step() {
      ci += del ? -1 : 1; rot.textContent = words[wi].slice(0, ci);
      var w = del ? 28 : 55;
      if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; w = 250; }
      else if (!del && ci === words[wi].length) { del = true; w = 2200; }
      setTimeout(step, w);
    }, 2600);
  }

  // cursor glow + tile spotlight
  var glow = $('.glow');
  if (!reduce) {
    addEventListener('pointermove', function (e) {
      if (glow) { glow.style.setProperty('--gx', e.clientX + 'px'); glow.style.setProperty('--gy', e.clientY + 'px'); }
      var t = e.target.closest && e.target.closest('.tile');
      if (t) { var r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
    }, { passive: true });
  }

  // experience path
  var path = $('.path');
  if (path) {
    var items = $$('li', path);
    var upd = function () {
      var r = path.getBoundingClientRect(), mid = innerHeight * .65;
      path.style.setProperty('--prog', Math.max(0, Math.min(1, (mid - r.top) / r.height)) * 100 + '%');
      items.forEach(function (li) { if (li.getBoundingClientRect().top < mid) li.classList.add('on'); });
    };
    if (reduce) items.forEach(function (li) { li.classList.add('on'); }); else { addEventListener('scroll', upd, { passive: true }); upd(); }
  }

  // nav highlight
  var navs = $$('.top nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) navs.forEach(function (a) { a.classList.toggle('here', a.getAttribute('href') === '#' + e.target.id); }); }); }, { rootMargin: '-40% 0px -55% 0px' });
    navs.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  // terminal
  var out = $('#tout'), inp = $('#tin');
  if (!out || !inp) return;
  var C = {
    help: 'try: <b>about</b> <b>skills</b> <b>projects</b> <b>experience</b> <b>hire</b> <b>cv</b> <b>dance</b> <b>clear</b>',
    about: 'Software & ML engineer in Newcastle. 15 months shipping client ML, MSc Advanced CS, allergic to untested code.',
    skills: 'python  java  spring-boot  react  electron  sql  docker  kubernetes  azure  grafana  pytorch  git',
    projects: '1. federated-learning   8 bugs found, all published\n2. cloud-bookstore      k8s on azure\n3. ai-bias-audit        numbers, not opinions\n4. sysdash              secure electron monitor\n5. tokeneer-risk        NIST threat model',
    experience: '2024-25  ML Engineer @ Accurate Info Solution\n2023-24  Full-Stack Intern @ PACE Wisdom\n2022-23  ML Intern @ Accurate Info Solution',
    hire: 'Great choice. Opening your email app…',
    cv: 'Downloading CV…',
    dance: 'Bharatanatyam: 1 stage, 0 merge conflicts. 💃',
    sudo: 'Permission granted only after the interview. 😉',
    ls: 'about.txt  projects/  experience.log  cv.pdf  secrets.txt',
    'cat': 'Try: cat secrets.txt'
  };
  function esc(t) { return t.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  inp.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var v = inp.value.trim().toLowerCase(); inp.value = ''; if (!v) return;
    if (v === 'clear') { out.innerHTML = ''; return; }
    var k = v.split(' ')[0], res = C[k] || 'command not found: ' + esc(k) + ' (try <b>help</b>)';
    if (v === 'cat secrets.txt') res = 'I genuinely enjoy writing tests. Please don\'t tell anyone.';
    out.insertAdjacentHTML('beforeend', '<p><span class="cmd">$ ' + esc(v) + '</span></p><p>' + res + '</p>');
    out.scrollTop = out.scrollHeight;
    if (k === 'hire') setTimeout(function () { location.href = 'mailto:chaithanya6699@gmail.com?subject=Let%27s%20talk'; }, 600);
    if (k === 'cv') { var a = document.createElement('a'); a.href = 'Chaithanya_Virupaksha_CV.pdf'; a.download = ''; a.click(); }
  });
})();
