/* =====================================================
   CAROUSEL TOUCH FIX — carousel-touch-fix.js
   Add ONCE before closing </body>:
   <script src="carousel-touch-fix.js"></script>
   ===================================================== */

(function () {
  var SELECTORS = [
    '.grid--bestsellers',
    '.grid--new',
    '.grid--featured',
    '.showcase__grid',
    '.promo__imgRow',
  ];

  function init(el) {
    var startX, startY, locked;

    el.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      locked = null;
    }, { passive: true });

    el.addEventListener('touchmove', function (e) {
      if (!e.touches.length) return;
      var t  = e.touches[0];
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;

      if (!locked) {
        if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
        locked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
      }

      if (locked === 'h') {
        // Horizontal swipe: block page scroll, let carousel scroll natively
        e.preventDefault();
        startX = t.clientX;
        startY = t.clientY;
      }
      // Vertical swipe: don't touch the event — page scrolls naturally
    }, { passive: false });

    el.addEventListener('touchend', function () {
      locked = null;
    }, { passive: true });
  }

  function attach() {
    SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.dataset.tf) return;
        el.dataset.tf = '1';
        init(el);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();