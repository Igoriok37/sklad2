// ── SCROLL TO ──
function scrollToEl(sel) { document.querySelector(sel).scrollIntoView({ behavior: 'smooth' }); }

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  const shadow = window.scrollY > 50 ? '0 4px 32px rgba(0,0,0,0.5)' : '';
  const nav = document.querySelector('.header-nav-shad');
  if (nav) nav.style.boxShadow = shadow;
  const subNav = document.querySelector('.subnav-shad');
  if (subNav) subNav.style.boxShadow = shadow;
}, { passive: true });

// ── SCROLL RESTORATION ──
// Отключаем автоматическое восстановление скролла браузером — иначе nav дёргается
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ── PAGE TRANSITIONS ──
(function () {
  function getContent() { return document.getElementById('page-content'); }

  // При обычной загрузке — #page-content плавно появляется
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const c = getContent();
        if (c) c.classList.add('page-visible');
      });
    });
  });

  // При восстановлении из кэша браузера (кнопки назад/вперёд) — тоже показываем контент
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      const c = getContent();
      if (c) c.classList.add('page-visible');
    }
  });

  // Перехват ссылок — #page-content гаснет, затем переход
  function doNavigate(url) {
    const c = getContent();
    if (c) c.classList.remove('page-visible');
    setTimeout(() => { window.location.href = url; }, 450);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || link.target === '_blank') return;
    if (href.startsWith('http') || href.startsWith('//')) return;
    e.preventDefault();
    doNavigate(href);
  });

  window._navigateTo = doNavigate;
})();

// Функция для кнопок с onclick
function navigateTo(url) { window._navigateTo(url); }
