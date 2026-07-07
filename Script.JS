// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ ANIMATED COUNTERS ============
const stats = document.querySelectorAll('.stat__value');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statObserver.observe(stat));

// ============ CONTACT FORM (DEMO — NO BACKEND) ============
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();

  if (!form.checkValidity()) {
    status.textContent = 'Mohon lengkapi semua kolom dengan benar.';
    return;
  }

  status.textContent = `Terima kasih, ${name}. Pesan Anda tercatat (demo — belum terhubung ke server).`;
  form.reset();
});

// ============ BACK TO TOP ============
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});