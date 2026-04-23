/* ===========================
   PrintSoftDriver - script.js
   =========================== */

/* ---- Sticky Header ---- */
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  var observer = new IntersectionObserver(function (entries) {
    header.classList.toggle('scrolled', !entries[0].isIntersecting);
  });
  observer.observe(sentinel);
})();

/* ---- Hamburger Menu ---- */
(function () {
  var btn = document.getElementById('hamburger-btn');
  var mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;
  btn.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
    btn.setAttribute('aria-expanded', mobileNav.classList.contains('open') ? 'true' : 'false');
  });
})();

/* ---- Active Nav Link ---- */
(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-links a, .mobile-nav a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var hrefFile = href.split('/').pop().split('#')[0] || 'index.html';
    if (hrefFile === path || (path === '' && hrefFile === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- Cookie Consent Banner ---- */
(function () {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (!localStorage.getItem('cookieConsent')) {
    banner.style.display = 'flex';
  }
})();

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  var banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  var banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

/* ---- FAQ Accordion ---- */
(function () {
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // Close all
      items.forEach(function (i) {
        i.classList.remove('open');
        var a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = '0';
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ---- Legal Tabs ---- */
(function () {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ---- Contact Form Validation ---- */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    var fields = [
      { id: 'field-name', errId: 'err-name', msg: 'Please enter your full name.' },
      { id: 'field-email', errId: 'err-email', msg: 'Please enter a valid email address.' },
      { id: 'field-subject', errId: 'err-subject', msg: 'Please select a subject.' },
      { id: 'field-message', errId: 'err-message', msg: 'Please enter your message.' }
    ];

    fields.forEach(function (f) {
      var input = document.getElementById(f.id);
      var err = document.getElementById(f.errId);
      if (!input || !err) return;
      var val = input.value.trim();
      var isEmpty = val === '' || val === 'default';
      var isEmailInvalid = f.id === 'field-email' && val !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

      if (isEmpty || isEmailInvalid) {
        err.classList.add('visible');
        valid = false;
      } else {
        err.classList.remove('visible');
      }
    });

    if (valid) {
      form.style.display = 'none';
      var msg = document.getElementById('success-msg');
      if (msg) msg.classList.add('visible');
    }
  });
})();


  /* ---- Scroll Reveal Animations ---- */
  (function () {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) { io.observe(el); });
  })();

  /* ---- Smooth Scroll for Anchor Links ---- */
  (function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var header = document.getElementById('site-header');
        var offset = header ? header.offsetHeight + 12 : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  })();
  