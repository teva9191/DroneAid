/**
 * Donation card: tier selection, the goal bar, and the hand-off to Buy Me a Coffee.
 * The translated button label is read from data-label on #donate-btn (set at build time).
 */
const DONATE_URL = 'https://buymeacoffee.com/droneaidwarsaw';
const GOAL_PCT = 32; // progress shown for "this month's build goal"

export function initDonate() {
  const donateBtn = document.getElementById('donate-btn');
  if (!donateBtn) return;

  const tiers = document.querySelectorAll('.tier');
  const label = (donateBtn.dataset.label || 'Donate').trim();

  const showAmount = (amount) => {
    donateBtn.textContent = amount > 0 ? `${label} ${amount} € →` : `${label} →`;
  };

  tiers.forEach((tier) => {
    tier.addEventListener('click', () => {
      tiers.forEach((t) => t.classList.remove('selected'));
      tier.classList.add('selected');
      showAmount(parseInt(tier.dataset.amount, 10) || 0);
    });
  });

  donateBtn.addEventListener('click', () => window.open(DONATE_URL, '_blank', 'noopener'));

  const selected = document.querySelector('.tier.selected');
  showAmount(selected ? parseInt(selected.dataset.amount, 10) || 0 : 0);

  initGoalBar();
}

/** Animates the goal bar from 0 to GOAL_PCT the first time it scrolls into view. */
function initGoalBar() {
  const live = document.getElementById('donate-live');
  const fill = document.getElementById('donate-fill');
  const pct = document.getElementById('donate-pct');
  if (!live) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      let p = 0;
      const timer = setInterval(() => {
        p = Math.min(p + 1, GOAL_PCT);
        if (fill) fill.style.width = `${p}%`;
        if (pct) pct.textContent = `${p}%`;
        if (p >= GOAL_PCT) clearInterval(timer);
      }, 18);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  observer.observe(live);
}
