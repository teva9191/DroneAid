/**
 * Purely visual behaviour on the landing page. Nothing here touches data or the network.
 */
export function initAnimations() {
  initCardGlow();
  initScrollReveal();
  initCounters();
  initSmoothScroll();
  initActiveNavLink();
}

/** Radial highlight that follows the cursor over component cards; CSS reads --mx / --my. */
function initCardGlow() {
  document.querySelectorAll('.part-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    });
  });
}

/** Adds .visible to .reveal elements the first time they scroll into view. */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/** Counts [data-counter] elements from 0 up to data-target when they scroll into view. */
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const step = target / 55;
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 18);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-counter]').forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      const target = href.length > 1 && document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/** Highlights the nav link of the section currently in view. */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    navLinks.forEach((a) => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : 'var(--muted)';
    });
  }, { passive: true });
}
