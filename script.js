(function () {
  'use strict';

  /* ---- Gallery data: add a new work by adding an object here ---- */
  var works = [
    {
      title: 'Reproduction a still life with apricots, cherries, a wild strawberry, red currants, shells and insects',
      medium: 'Oil on canvas',
      desc: 'ภาพจำลองงานจิตรกรรมนิ่ง (Still Life) ศึกษาแสง เงา และพื้นผิวของผลไม้และวัตถุต่าง ๆ ด้วยสีน้ำมัน',
      img: 'images/work-1.jpg', fallback: 'images/work-1.svg'
    },
    {
      title: 'Budanism of Chiang mai',
      medium: 'Oil on canvas',
      desc: 'ภาพที่ได้แรงบันดาลใจจากพุทธศิลป์และสถาปัตยกรรมของเชียงใหม่ ถ่ายทอดด้วยสีน้ำมัน',
      img: 'images/work-2.jpg', fallback: 'images/work-2.svg'
    }
  ];

  var wrap = document.getElementById('works');
  works.forEach(function (w) {
    var a = document.createElement('article');
    a.className = 'work';
    var f = document.createElement('figure');
    var im = new Image();
    im.alt = w.title;
    im.loading = 'lazy';
    im.onerror = function () { im.onerror = null; im.src = w.fallback; };
    im.src = w.img;
    f.appendChild(im);
    var t = document.createElement('div');
    t.innerHTML = '<h3></h3><p class="medium"></p><p class="desc"></p>';
    t.querySelector('h3').textContent = w.title;
    t.querySelector('.medium').textContent = w.medium;
    t.querySelector('.desc').textContent = w.desc;
    a.appendChild(f); a.appendChild(t);
    wrap.appendChild(a);
  });

  /* ---- Page switching ---- */
  var pages = ['home', 'about', 'gallery'];
  var titles = { home: 'Portfolio — Personal Artworks', about: 'About — Portfolio', gallery: 'Gallery — Portfolio' };
  var body = document.body;
  var burger = document.querySelector('.burger');

  function current() {
    var id = location.hash.slice(1);
    return pages.indexOf(id) < 0 ? 'home' : id;
  }
  function show() {
    var id = current();
    body.dataset.page = id;
    document.title = titles[id];
    document.querySelectorAll('.slide').forEach(function (s) {
      var on = s.dataset.slide === id;
      s.classList.toggle('on', on);
      if (on) { s.scrollTop = 0; } 
      s.toggleAttribute('inert', !on);
    });
    document.querySelectorAll('[data-link]').forEach(function (a) {
      var on = a.dataset.link === id;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    setMenu(false);
  }
  function go(i) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    location.hash = pages[i];
  }
  window.addEventListener('hashchange', show);

  /* Prevent the browser from scrolling to the section id on hash change */
  document.querySelectorAll('.slide').forEach(function (s) { s.removeAttribute('id'); });
  show();

  /* ---- Mobile menu ---- */
  function setMenu(o) {
    body.classList.toggle('menu-open', o);
    burger.setAttribute('aria-expanded', o);
  }
  burger.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
    if (e.target.matches('input,textarea')) return;
    var i = pages.indexOf(current());
    if (e.key === 'ArrowRight' || e.key === 'PageDown') go(i + 1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(i - 1);
  });

  /* ---- Swipe left/right to change page (touch) ---- */
  var sx = null, sy = null;
  document.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) go(pages.indexOf(current()) + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
