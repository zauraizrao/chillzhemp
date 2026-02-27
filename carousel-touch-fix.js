/* =====================================================
   CAROUSEL TOUCH FIX — carousel-touch-fix.js
   Add this script at the bottom of your <body> tag:
   <script src="carousel-touch-fix.js"></script>
   ===================================================== */

(function () {
  // All carousel selectors
  const CAROUSEL_SELECTORS = [
    '.grid--bestsellers',
    '.grid--new',
    '.grid--featured',
    '.showcase__grid',
    '.promo__imgRow',
  ];

  function initCarousel(el) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let direction = null; // 'horizontal' | 'vertical' | null

    el.addEventListener('touchstart', function (e) {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isDragging = true;
      direction = null;
    }, { passive: true });

    el.addEventListener('touchmove', function (e) {
      if (!isDragging) return;

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);

      // Determine direction only once (first significant movement)
      if (!direction && (deltaX > 5 || deltaY > 5)) {
        direction = deltaX > deltaY ? 'horizontal' : 'vertical';
      }

      if (direction === 'horizontal') {
        // Horizontal swipe → scroll carousel, block page scroll
        e.stopPropagation();
        // Do NOT call e.preventDefault() here — let the carousel scroll naturally
      }
      // Vertical → do nothing, let the event bubble to page naturally
    }, { passive: true });

    el.addEventListener('touchend', function () {
      isDragging = false;
      direction = null;
    }, { passive: true });
  }

  function attachAll() {
    CAROUSEL_SELECTORS.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        // Avoid double-attaching
        if (el.dataset.touchFixed) return;
        el.dataset.touchFixed = '1';
        initCarousel(el);
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachAll);
  } else {
    attachAll();
  }
})();