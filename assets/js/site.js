/* ============================================================
   Animaciones de entrada.
   El estado oculto lo pone el CSS bajo la clase .anim, que añade
   un script en el <head>. Así no hay parpadeo: si el navegador
   no ejecuta JS, nada se oculta nunca.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;

  // avisa al failsafe del <head> de que este archivo sí cargó
  window.__anim = true;

  var selector = [
    '.sect-head', '.tile', '.hist', '.sv',
    '.dark-card', '.form-card', '.tray-card', '.cta-in',
    '.split-txt', '.split-img',
    '.by', '.post-shot', '.post-txt'
  ].join(',');

  var items;
  try {
    items = Array.prototype.slice.call(document.querySelectorAll(selector));
  } catch (e) {
    root.classList.remove('anim');
    return;
  }

  // escalonado: cada hijo de una rejilla entra un poco después del anterior
  ['.tiles', '.hist-grid', '.otros-grid'].forEach(function (g) {
    Array.prototype.forEach.call(document.querySelectorAll(g), function (grid) {
      Array.prototype.forEach.call(grid.children, function (child, i) {
        child.style.setProperty('--d', i);
      });
    });
  });

  // sin IntersectionObserver, mostramos todo de una vez
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var revelados = 0;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revelados++;
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

  items.forEach(function (el) { io.observe(el); });

  // Red de seguridad: si pasados 3,5 s no se ha revelado nada estando la
  // página a la vista, el observador no está funcionando. Mostramos todo
  // antes que dejar la página en blanco.
  setTimeout(function () {
    if (revelados > 0 || document.visibilityState === 'hidden') return;
    items.forEach(function (el) { el.classList.add('is-in'); });
  }, 3500);
}());
