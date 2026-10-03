/**
 * Contact form: posts to Formspree without leaving the page.
 * Translated status messages are read from data-success / data-error on the <form>
 * (set at build time); the send label is whatever the button says initially.
 */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('.contact-submit');
  const sendLabel = submitBtn.textContent;
  const messages = {
    success: form.dataset.success || 'Message sent! We\'ll get back to you soon.',
    error: form.dataset.error || 'Something went wrong. Please try again.',
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = '…';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      status.textContent = messages.success;
      status.classList.add('success');
    } catch {
      status.textContent = messages.error;
      status.classList.add('error');
    } finally {
      submitBtn.textContent = sendLabel;
      submitBtn.disabled = false;
    }
  });
}
