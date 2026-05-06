// Voltix Electrical Services — site JS

(function () {
  // Initialize Lucide icons (loaded via CDN)
  if (window.lucide) lucide.createIcons();

  // Mobile nav sheet
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navSheet = document.querySelector('[data-nav-sheet]');
  if (navToggle && navSheet) {
    navToggle.addEventListener('click', () => {
      navSheet.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', navSheet.classList.contains('open') ? 'x' : 'menu');
        lucide.createIcons();
      }
    });
    navSheet.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navSheet.classList.remove('open'));
    });
  }

  // Lead form (no backend; show success state)
  document.querySelectorAll('.lead-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const target = form.querySelector('[data-form-success]');
      const fields = form.querySelector('[data-form-fields]');
      if (target && fields) {
        fields.style.display = 'none';
        target.style.display = 'block';
      }
    });
  });

  // Before/after slider (drag to reveal)
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    if (!after || !handle) return;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = `${pct}%`;
    };

    let dragging = false;
    const start = e => {
      dragging = true;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(x);
    };
    const move = e => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(x);
    };
    const end = () => { dragging = false; };

    slider.addEventListener('mousedown', start);
    slider.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    slider.addEventListener('touchstart', start, { passive: true });
    slider.addEventListener('touchmove', move, { passive: true });
    slider.addEventListener('touchend', end);
  });

  // Gallery filter (if present)
  const filterButtons = document.querySelectorAll('[data-gallery-filter]');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-gallery-filter');
        filterButtons.forEach(b => {
          b.classList.toggle('bg-brand-yellow', b === btn);
          b.classList.toggle('text-brand-navy', b === btn);
          b.classList.toggle('bg-white', b !== btn);
          b.classList.toggle('text-gray-700', b !== btn);
        });
        document.querySelectorAll('[data-gallery-item]').forEach(item => {
          const cat = item.getAttribute('data-gallery-item');
          item.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
        });
      });
    });
  }

  // Reviews filter (if present)
  const reviewFilters = document.querySelectorAll('[data-review-filter]');
  if (reviewFilters.length) {
    reviewFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-review-filter');
        reviewFilters.forEach(b => {
          b.classList.toggle('bg-brand-yellow', b === btn);
          b.classList.toggle('text-brand-navy', b === btn);
          b.classList.toggle('bg-white', b !== btn);
          b.classList.toggle('text-gray-700', b !== btn);
        });
        document.querySelectorAll('[data-review-item]').forEach(item => {
          const cat = item.getAttribute('data-review-item');
          item.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
        });
      });
    });
  }
})();
