/* Carrusel de artículos del blog (index.html y blog.html).
   Sin JS no hay controles y las diapositivas se ven apiladas. */
(function () {
  var c = document.querySelector('.carousel');
  if (!c) return;
  var slides = Array.prototype.slice.call(c.querySelectorAll('.slide'));
  var bar = c.querySelector('.carousel-bar');
  var n = slides.length, cur = 0;
  if (n < 2 || !bar) return;

  var cuenta = c.querySelector('.car-i');
  c.classList.add('is-ready');
  bar.hidden = false;                       // sin JS no hay controles: no servirían

  function pinta() {
    slides.forEach(function (el, k) {
      var d = (k - cur + n) % n;            // distancia cíclica: 0 activa, 1 siguiente, el resto anteriores
      el.classList.toggle('is-active', d === 0);
      el.classList.toggle('is-after', d === 1);
      el.classList.toggle('is-before', d > 1);
      el.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      if (d === 0) el.removeAttribute('inert'); else el.setAttribute('inert', '');
    });
    cuenta.textContent = cur + 1;
    c.style.setProperty('--i', cur);
  }
  function ir(delta) { cur = (cur + delta + n) % n; pinta(); }

  Array.prototype.forEach.call(c.querySelectorAll('.car-btn'), function (b) {
    b.addEventListener('click', function () { ir(parseInt(b.getAttribute('data-dir'), 10)); });
  });
  c.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { ir(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { ir(-1); e.preventDefault(); }
  });

  // deslizar con el dedo; sólo si el gesto es claramente horizontal
  var x0 = null, y0 = null;
  c.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  c.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(dx < 0 ? 1 : -1);
  }, { passive: true });

  pinta();
}());
