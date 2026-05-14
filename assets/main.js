/* ===========================================
   東宝海運 — Shared JS
   - Language toggle (JP/EN) persisted to localStorage
   - Scroll reveal via IntersectionObserver
   - Header scroll state
   - Mobile drawer
   - Parallax for elements with [data-parallax]
   =========================================== */

(function () {
  // ---------- Language ----------
  const STORAGE_KEY = 'tohokaiun.lang';
  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
  }
  function initLang() {
    let lang = 'jp';
    try { lang = localStorage.getItem(STORAGE_KEY) || 'jp'; } catch (e) {}
    setLang(lang);
    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });
  }

  // ---------- Header scroll state ----------
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const transparent = header.classList.contains('is-transparent');
    const update = () => {
      const scrolled = window.scrollY > 24;
      if (transparent) {
        header.classList.toggle('is-scrolled', scrolled);
        if (scrolled) header.classList.remove('is-transparent');
        else if (!header.classList.contains('is-light')) header.classList.add('is-transparent');
      } else {
        header.classList.toggle('is-scrolled', scrolled);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  // ---------- Drawer ----------
  function initDrawer() {
    const toggle = document.querySelector('.menu-toggle');
    const drawer = document.querySelector('.drawer');
    if (!toggle || !drawer) return;
    const closeBtn = drawer.querySelector('.drawer-close');
    const open = () => { drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
    const close = () => { drawer.classList.remove('is-open'); document.body.style.overflow = ''; };
    toggle.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  // ---------- Parallax ----------
  function initParallax() {
    const items = document.querySelectorAll('[data-parallax]');
    if (!items.length) return;
    const onScroll = () => {
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        el.style.transform = `translate3d(0, ${(-progress * 60 * speed).toFixed(2)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Counter (for stats) ----------
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const duration = parseInt(el.dataset.countDuration || '1400', 10);
        const decimals = parseInt(el.dataset.countDecimals || '0', 10);
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = target * eased;
          el.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toString();
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = decimals ? target.toFixed(decimals) : target.toString();
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initHeader();
    initReveal();
    initDrawer();
    initParallax();
    initCounters();
  });
})();
