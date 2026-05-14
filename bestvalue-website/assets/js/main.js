/* Best Value — Auto Body Supply
 * Light front-end JS for the static site.
 * - Mobile drawer toggle
 * - Cart/qty badge stub
 * - Vehicle-finder client-side validation stub
 */

(function () {
  'use strict';

  // ---------- Mobile drawer ----------
  const drawer = document.getElementById('drawer');
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // ---------- Header search submit (stub) ----------
  const search = document.querySelector('.megasearch');
  if (search) {
    search.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('q')?.value?.trim() || '';
      const y = document.getElementById('year')?.value || '';
      const mk = document.getElementById('make')?.value || '';
      const md = document.getElementById('model')?.value || '';
      // In a real app you'd push a URL like /search?q=…&year=…&make=…&model=…
      // For the static design, we just log.
      console.log('[BV search]', { q, year: y, make: mk, model: md });
      // Visual feedback:
      const btn = search.querySelector('.megasearch__go');
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Searching…';
      setTimeout(() => { btn.innerHTML = original; }, 1400);
    });
  }

  // ---------- "Call to order" cards have <a href="tel:…"> CTAs — no JS needed ----------

  // ---------- Favorite toggle ----------
  document.querySelectorAll('.card__fav').forEach((b) => {
    b.addEventListener('click', () => {
      b.classList.toggle('is-on');
      b.style.color = b.classList.contains('is-on') ? 'var(--bv-red)' : '';
      b.style.background = b.classList.contains('is-on') ? 'rgba(237,28,36,.10)' : '';
    });
  });

})();
