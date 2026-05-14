/* Shared header/footer injector for all pages */
(function () {
  const NAV = [
    { href: 'index.html',    jp: 'トップ',     en: 'Home',     key: 'home' },
    { href: 'services.html', jp: '事業紹介',   en: 'Services', key: 'services' },
    { href: 'company.html',  jp: '会社概要',   en: 'Company',  key: 'company' },
    { href: 'fleet.html',    jp: '保有船舶',   en: 'Fleet',    key: 'fleet' },
    { href: 'ships.html',    jp: '建造船一覧', en: 'Built',    key: 'ships' },
    { href: 'safety.html',   jp: '安全・品質', en: 'Safety',   key: 'safety' },
    { href: 'news.html',     jp: 'ニュース',   en: 'News',     key: 'news' },
    { href: 'recruit.html',  jp: '採用',       en: 'Careers',  key: 'recruit' }
  ];

  const DRAWER_NAV = [
    { href: 'index.html',    jp: 'トップ',         en: 'Home' },
    { href: 'services.html', jp: '事業紹介',       en: 'Services' },
    { href: 'company.html',  jp: '会社概要',       en: 'Company' },
    { href: 'message.html',  jp: '代表挨拶',       en: 'Message' },
    { href: 'history.html',  jp: '沿革',           en: 'History' },
    { href: 'fleet.html',    jp: '保有船舶',       en: 'Fleet' },
    { href: 'ships.html',    jp: '建造船一覧',     en: 'Built Ships' },
    { href: 'safety.html',   jp: '安全・品質',     en: 'Safety' },
    { href: 'recruit.html',  jp: '採用情報',       en: 'Careers' },
    { href: 'news.html',     jp: 'ニュース',       en: 'News' },
    { href: 'contact.html',  jp: 'お問い合わせ',   en: 'Contact' }
  ];

  const ARROW_SVG = '<svg class="arrow" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const MARK_SVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M2 16c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M4 12L12 4l8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4v8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';

  function buildHeader(active, transparent) {
    const navItems = NAV.map((n) => `
      <li><a href="${n.href}"${n.key === active ? ' class="is-active"' : ''}>
        <span class="jp">${n.jp}</span><span class="en-text">${n.en}</span>
      </a></li>`).join('');

    return `
<header class="site-header${transparent ? ' is-transparent' : ' is-light'}" data-screen-label="${active}">
  <div class="container">
    <a href="index.html" class="brand" aria-label="東宝海運株式会社">
      <span class="brand-mark" aria-hidden="true">${MARK_SVG}</span>
      <span class="brand-text">
        <span class="name-jp">東宝海運株式会社</span>
        <span class="name-en">TOHO KAIUN CO., LTD.</span>
      </span>
    </a>
    <nav class="nav" aria-label="Primary">
      <ul class="nav-list">${navItems}</ul>
    </nav>
    <div class="header-right">
      <div class="lang-toggle" role="group" aria-label="Language">
        <button type="button" data-lang="jp" class="is-active">JP</button>
        <button type="button" data-lang="en">EN</button>
      </div>
      <a href="contact.html" class="header-cta">
        <span class="jp">お問い合わせ</span><span class="en-text">Contact</span>
        ${ARROW_SVG}
      </a>
      <button class="menu-toggle" aria-label="Menu">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="drawer">
  <div class="drawer-head">
    <a href="index.html" class="brand">
      <span class="brand-mark">${MARK_SVG}</span>
      <span class="brand-text"><span class="name-jp" style="color:#fff">東宝海運</span><span class="name-en">TOHO KAIUN</span></span>
    </a>
    <button class="drawer-close" aria-label="Close">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
  <nav class="drawer-nav">
    ${DRAWER_NAV.map((n) => `<a href="${n.href}"><span class="jp">${n.jp}</span><span class="en-text">${n.en}</span></a>`).join('')}
  </nav>
</div>`;
  }

  function buildFooter() {
    return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="brand">
          <span class="brand-mark" aria-hidden="true">${MARK_SVG}</span>
          <span class="brand-text"><span class="name-jp">東宝海運株式会社</span><span class="name-en">TOHO KAIUN CO., LTD.</span></span>
        </a>
        <p class="address">
          〒737-0031<br/>
          広島県呉市上長迫町1番6号<br/>
          TEL 0823-00-0000
        </p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html#tug"><span class="jp">曳船・タグボート</span><span class="en-text">Tugboats</span></a></li>
          <li><a href="services.html#transport"><span class="jp">海上輸送</span><span class="en-text">Marine transport</span></a></li>
          <li><a href="fleet.html"><span class="jp">保有船舶</span><span class="en-text">Fleet</span></a></li>
          <li><a href="ships.html"><span class="jp">建造船一覧</span><span class="en-text">Built ships</span></a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="company.html"><span class="jp">会社概要</span><span class="en-text">Overview</span></a></li>
          <li><a href="message.html"><span class="jp">代表挨拶</span><span class="en-text">Message</span></a></li>
          <li><a href="history.html"><span class="jp">沿革</span><span class="en-text">History</span></a></li>
          <li><a href="safety.html"><span class="jp">安全・品質</span><span class="en-text">Safety</span></a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="contact.html"><span class="jp">お問い合わせ</span><span class="en-text">Contact</span></a></li>
          <li><a href="recruit.html"><span class="jp">採用情報</span><span class="en-text">Careers</span></a></li>
          <li><a href="news.html"><span class="jp">ニュース</span><span class="en-text">News</span></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 TOHO KAIUN CO., LTD. ALL RIGHTS RESERVED.</span>
      <span class="mono">DESIGNED FOR THE SETO INLAND SEA</span>
    </div>
  </div>
</footer>`;
  }

  // Inject before DOMContentLoaded so reveals & state init see the DOM
  function inject() {
    const headerSlot = document.querySelector('[data-partial="header"]');
    if (headerSlot) {
      const active = headerSlot.dataset.active || '';
      const transparent = headerSlot.dataset.transparent === 'true';
      headerSlot.outerHTML = buildHeader(active, transparent);
    }
    const footerSlot = document.querySelector('[data-partial="footer"]');
    if (footerSlot) {
      footerSlot.outerHTML = buildFooter();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
