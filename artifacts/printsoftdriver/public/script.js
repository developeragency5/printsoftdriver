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
    var elements = document.querySelectorAll('.reveal, .reveal-stagger');
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
  
/* ============================================================
   ROUND 3 — premium interactivity
   ============================================================ */

/* ---- Reading progress bar ---- */
(function () {
  var bar = document.getElementById('read-progress');
  if (!bar) return;
  var ticking = false;
  function update() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ---- Back-to-top ---- */
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ---- Hero rotating word ---- */
(function () {
  var el = document.querySelector('.hero-rotator');
  if (!el) return;
  var words = (el.getAttribute('data-words') || '').split('|').filter(Boolean);
  if (words.length < 2) return;
  var i = 0;
  function tick() {
    el.innerHTML = '<span class="hero-rotator-word">' + words[i] + '</span>';
    i = (i + 1) % words.length;
  }
  tick();
  setInterval(tick, 2400);
})();

/* ---- Hero parallax (mouse + tilt floating cards) ---- */
(function () {
  var hero = document.querySelector('.hero-pro');
  if (!hero) return;
  var floats = hero.querySelectorAll('.hero-float');
  var orbs = hero.querySelectorAll('.hero-pro-orb');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    floats.forEach(function (f, idx) {
      var depth = (idx % 2 === 0) ? 18 : 12;
      f.style.transform = 'translate(' + (x * depth) + 'px,' + (y * depth) + 'px)';
    });
    orbs.forEach(function (o, idx) {
      var d = (idx === 0) ? 24 : -18;
      o.style.transform = 'translate(' + (x * d) + 'px,' + (y * d) + 'px)';
    });
  });
  hero.addEventListener('mouseleave', function () {
    floats.forEach(function (f) { f.style.transform = ''; });
    orbs.forEach(function (o) { o.style.transform = ''; });
  });
})();

/* ---- Tab switcher (What is a driver) ---- */
(function () {
  var groups = document.querySelectorAll('.tab-switcher');
  groups.forEach(function (group) {
    var btns = group.querySelectorAll('.tab-switcher-btn');
    var panels = group.querySelectorAll('.tab-switcher-panel');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = btn.getAttribute('data-tab');
        btns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        panels.forEach(function (p) { p.classList.toggle('active', p.id === t); });
      });
    });
  });
})();

/* ---- Driver tiles expand ---- */
(function () {
  var tiles = document.querySelectorAll('.driver-tile');
  tiles.forEach(function (tile) {
    if (tile.tagName === 'A') return;
    var toggle = tile.querySelector('.driver-tile-toggle');
    if (!toggle) return;
    function flip() {
      var open = tile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var label = toggle.querySelector('.driver-tile-toggle-label');
      if (label) label.textContent = open ? 'Show less' : 'Read more';
    }
    toggle.addEventListener('click', function (e) { e.stopPropagation(); flip(); });
    tile.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      flip();
    });
  });
})();

/* ---- Animated counters ---- */
(function () {
  var els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;
  function animate(el) {
    var target = parseFloat(el.getAttribute('data-counter'));
    var dur = 1400;
    var start = performance.now();
    function step(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = target * eased;
      el.textContent = (target % 1 === 0) ? Math.round(val).toLocaleString() : val.toFixed(1);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  els.forEach(function (el) { io.observe(el); });
})();

/* ---- Quick-Nav (TOC) — auto-build, scroll-spy ---- */
(function () {
  var nav = document.getElementById('quick-nav');
  if (!nav) return;
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id], body > section[id]'))
    .filter(function (s) { return s.hasAttribute('data-toc'); });
  if (sections.length < 3) { nav.style.display = 'none'; return; }
  sections.forEach(function (s) {
    var dot = document.createElement('button');
    dot.className = 'quick-nav-dot';
    dot.setAttribute('data-label', s.getAttribute('data-toc'));
    dot.setAttribute('aria-label', 'Jump to ' + s.getAttribute('data-toc'));
    dot.addEventListener('click', function () {
      var header = document.getElementById('site-header');
      var offset = header ? header.offsetHeight + 12 : 0;
      var top = s.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
    nav.appendChild(dot);
  });
  var dots = nav.querySelectorAll('.quick-nav-dot');
  function showWhen() { nav.classList.toggle('visible', window.scrollY > 700); }
  showWhen();
  window.addEventListener('scroll', showWhen, { passive: true });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = sections.indexOf(entry.target);
          dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
})();

/* ---------- Auto-inject Back Button on inner pages ---------- */
(function backButtonInit() {
  var path = (window.location.pathname || '').toLowerCase();
  var file = path.split('/').pop() || '';
  // Skip home page
  if (file === '' || file === 'index.html') return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-btn';
  btn.setAttribute('aria-label', 'Go back to previous page');
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
    '<path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg><span>Back</span>';

  btn.addEventListener('click', function () {
    if (window.history.length > 1 && document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });

  function mount() {
    if (document.querySelector('.back-btn')) return;
    document.body.appendChild(btn);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

/* ---------- Visual gallery lightbox (homepage 10-panel) ---------- */
(function visualLightboxInit() {
  var cards = document.querySelectorAll('.visual-card');
  if (!cards.length) return;

  var box = document.createElement('div');
  box.className = 'visual-lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Enlarged infographic panel');
  box.innerHTML =
    '<button type="button" class="visual-lightbox-close" aria-label="Close">×</button>' +
    '<img alt="">';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var closeBtn = box.querySelector('.visual-lightbox-close');

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { img.src = ''; }, 280);
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var src = card.querySelector('img').getAttribute('src');
      var alt = card.querySelector('img').getAttribute('alt');
      open(src, alt);
    });
  });
  closeBtn.addEventListener('click', close);
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.classList.contains('open')) close();
  });
})();
