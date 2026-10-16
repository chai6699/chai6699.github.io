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
