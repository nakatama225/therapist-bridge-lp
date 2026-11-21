(() => {
  'use strict';
  const dialog = document.getElementById('consult-dialog');
  const form = document.getElementById('consult-form');
  const fields = document.getElementById('form-fields');
  const confirmation = document.getElementById('form-confirm');
  const mobileCta = document.querySelector('.mobile-cta');
  let opener = null;
  document.querySelectorAll('[data-consult]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      dialog.showModal();
      document.body.classList.add('form-open');
      mobileCta?.classList.add('is-hidden');
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('form-open');
    mobileCta?.classList.toggle('is-hidden', window.scrollY < 400);
    opener?.focus({preventScroll: true});
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    ['name', 'email', 'qualification', 'message'].forEach(key => {
      document.querySelector(`[data-confirm="${key}"]`).textContent = String(data.get(key) || '未記入');
    });
    fields.hidden = true;
    confirmation.hidden = false;
    dialog.scrollTop = 0;
    document.getElementById('confirm-title').focus({preventScroll: true});
  });
  document.getElementById('form-edit').addEventListener('click', () => {
    fields.hidden = false;
    confirmation.hidden = true;
    dialog.scrollTop = 0;
    document.getElementById('consult-name').focus({preventScroll: true});
  });
  if (mobileCta) {
    const updateCta = () => mobileCta.classList.toggle('is-hidden', window.scrollY < 400 || dialog.open);
    window.addEventListener('scroll', updateCta, {passive: true});
    updateCta();
  }
})();
