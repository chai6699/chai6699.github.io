// theme: apply saved choice early
(function(){ try { var t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {} })();
/* ============================================================
   EDIT THIS BLOCK — it is the only place links live.
   Paste your real URLs between the quotes.
   Any entry you leave empty simply disappears from the page,
   so nothing ever renders as a dead link.
   ============================================================ */

const LINKS = {
  linkedin:      'https://www.linkedin.com/in/chaithanya-virupaksha-6b1675295/',
  github:        'https://github.com/chai6699',

  diss_code:     'https://github.com/chai6699/federated-learning-packet-loss',
  proj1_code:    '',   // Bookstore platform repository
  proj1_writeup: '',   // Bookstore architecture write-up (repo README, PDF, blog post)
  proj2_code:    '',   // AI bias audit repository
  proj3_report:  '',   // Tokeneer assessment (PDF in this folder is fine, e.g. 'tokeneer.pdf')

  pub1:          'https://egnitronscientificpress.com/index.php/IJDTSC/article/view/34',   // Digital twin paper
  pub2:          'https://ijircce.com/admin/main/storage/app/pdf/1XyNwt4eVbHe94UilAMMsQMiH82gUZjgXSN0gH4J.pdf'    // Smart irrigation paper
};

/* ============================================================
   Nothing below needs editing.
   ============================================================ */

(function () {
  'use strict';

  // Wire up every [data-link] element; hide the ones with no URL yet.
  document.querySelectorAll('[data-link]').forEach(function (el) {
    var url = LINKS[el.dataset.link];
    if (url) {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.hidden = true;
    }
  });

  // Hide a project's link row entirely if every link in it is hidden.
  document.querySelectorAll('.links').forEach(function (row) {
    var live = row.querySelectorAll('a:not([hidden])').length;
    if (!live) row.hidden = true;
  });

  // Current year in the footer.
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mark the nav item for the section currently in view.
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.dock a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  // Scroll reveal.
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { rv.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Solid top bar once scrolled past the hero top.
  var bar = document.querySelector('.topbar');
  var onScroll = function () { if (bar) bar.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Typing effect for the role line.
  var typed = document.getElementById('typed');
  var roles = ['Software Engineer', 'Full-Stack Developer', 'ML Engineer', 'Cloud & DevOps'];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typed && !reduce) {
    var ri = 0, ci = roles[0].length, del = true;
    setTimeout(function tick() {
      var word = roles[ri];
      ci += del ? -1 : 1;
      typed.textContent = word.slice(0, ci);
      var wait = del ? 45 : 85;
      if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 300; }
      else if (!del && ci === roles[ri].length) { del = true; wait = 2200; }
      setTimeout(tick, wait);
    }, 2400);
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('here', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();

// Project/paper rows: link if a URL is set, otherwise show as plain rows.
(function () {
  document.querySelectorAll('[data-link-row]').forEach(function (row) {
    var url = LINKS[row.dataset.linkRow];
    if (url) {
      row.href = url; row.target = '_blank'; row.rel = 'noopener';
    } else {
      row.removeAttribute('href');
      var go = row.querySelector('.go'); if (go) go.remove();
    }
  });

  // Contact form opens the visitor's email app.
  var form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var subject = 'Role: ' + f.role.value + ' (from ' + f.name.value + ')';
    var body = f.message.value + '\n\n' + f.name.value + '\n' + f.email.value;
    location.href = 'mailto:chaithanya6699@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();

// ── lively additions ──
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // rotating phrase
  var rot = document.getElementById('rot');
  var words = ['holds up in production', 'survives bad Wi-Fi', 'explains its own decisions', 'is tested before it ships', 'people actually enjoy using'];
  if (rot && !reduce) {
    var wi = 0, ci = words[0].length, del = true;
    setTimeout(function tick() {
      ci += del ? -1 : 1; rot.textContent = words[wi].slice(0, ci);
      var wait = del ? 28 : 55;
      if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; wait = 250; }
      else if (!del && ci === words[wi].length) { del = true; wait = 2200; }
      setTimeout(tick, wait);
    }, 2400);
  }
  // count-up stats
  var nums = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var el = e.target, end = +el.dataset.count, pre = el.dataset.prefix || '', t0 = null;
        (function step(t) { t0 = t0 || t; var p = Math.min((t - t0) / 1100, 1);
          el.textContent = pre + Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(performance.now());
      });
    }, { threshold: .6 });
    nums.forEach(function (n) { n.textContent = (n.dataset.prefix || '') + '0'; io.observe(n); });
  }
  // tile tilt + spotlight
  document.querySelectorAll('.tile').forEach(function (t) {
    var s = document.createElement('i'); s.className = 'spot'; t.appendChild(s);
    if (reduce) return;
    t.addEventListener('mousemove', function (e) {
      var r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      t.style.setProperty('--mx', x * 100 + '%'); t.style.setProperty('--my', y * 100 + '%');
      t.style.transform = 'perspective(700px) rotateX(' + ((.5 - y) * 8) + 'deg) rotateY(' + ((x - .5) * 8) + 'deg)';
    });
    t.addEventListener('mouseleave', function () { t.style.transform = ''; });
  });
  // mini terminal
  var out = document.getElementById('tout'), inp = document.getElementById('tin');
  if (!out || !inp) return;
  var C = {
    help: 'Commands: <b>about</b>, <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>hire</b>, <b>cv</b>, <b>dance</b>, <b>clear</b>',
    about: 'Software & ML engineer in Newcastle. 15 months shipping client ML, MSc Advanced CS, allergic to untested code.',
    skills: 'java  python  sql  c++  spring-boot  react  docker  kubernetes  azure  pytorch  linux  git',
    projects: '1. federated-learning   (8 bugs found, all published)\n2. cloud-bookstore      (k8s on azure)\n3. ai-bias-audit        (numbers, not opinions)\n4. tokeneer-risk        (NIST threat model)',
    experience: '2024-25  ML Engineer @ Accurate Info Solution\n2023-24  Full-Stack Intern @ PACE Wisdom\n2022-23  ML Intern @ Accurate Info Solution',
    hire: 'Great choice. Opening your email app…',
    cv: 'Downloading CV…',
    dance: 'Bharatanatyam: 1 stage, 0 merge conflicts. 💃',
    sudo: 'Nice try. Permission granted only after the interview. 😉'
  };
  function print(cmd, res) { out.insertAdjacentHTML('beforeend', '<p><span class="cmd">$ ' + cmd.replace(/</g,'&lt;') + '</span></p><p>' + res + '</p>'); out.scrollTop = out.scrollHeight; }
  inp.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var v = inp.value.trim().toLowerCase(); inp.value = ''; if (!v) return;
    if (v === 'clear') { out.innerHTML = ''; return; }
    var k = v.split(' ')[0];
    print(v, C[k] || 'command not found: ' + k.replace(/</g,'&lt;') + ' (try <b>help</b>)');
    if (k === 'hire') setTimeout(function () { location.href = 'mailto:chaithanya6699@gmail.com?subject=Let%27s%20talk'; }, 600);
    if (k === 'cv') { var a = document.createElement('a'); a.href = 'Chaithanya_Virupaksha_CV.pdf'; a.download = ''; a.click(); }
  });
})();

// ── round 2 ──
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themebtn');
  if (btn) btn.addEventListener('click', function () {
    var t = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = t; try { localStorage.setItem('theme', t); } catch (e) {}
  });
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glow = document.querySelector('.glow');
  if (glow && !reduce) window.addEventListener('pointermove', function (e) {
    glow.style.setProperty('--gx', e.clientX + 'px'); glow.style.setProperty('--gy', e.clientY + 'px');
  }, { passive: true });
  var path = document.querySelector('.path');
  if (path) {
    var items = path.querySelectorAll('li');
    var upd = function () {
      var r = path.getBoundingClientRect(), mid = innerHeight * 0.6;
      var p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      path.style.setProperty('--prog', (p * 100) + '%');
      items.forEach(function (li) { if (li.getBoundingClientRect().top < mid) li.classList.add('on'); });
    };
    if (reduce) items.forEach(function (li) { li.classList.add('on'); });
    else { addEventListener('scroll', upd, { passive: true }); upd(); }
  }
})();
