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
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.topnav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

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
