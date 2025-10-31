(function () {
    // Create modal HTML
    const modalHtml = `
  <div id="rsvp-modal" class="rsvp-modal" aria-hidden="true">
    <div class="rsvp-modal__backdrop"></div>
    <div class="rsvp-modal__panel">
      <button class="rsvp-modal__close" aria-label="Close">×</button>
      <h3 class="h-medium">Choose ticket type</h3>
      <p class="p-medium">Select how you'd like to attend .NET Overflow 2025.</p>
      <div class="rsvp-options">
        <label class="rsvp-option">
          <input type="radio" name="rsvp-type" value="offline" checked />
          <div>
            <div class="rsvp-option__title p-medium u--fw-med">Offline ticket — limited seats</div>
            <div class="rsvp-option__desc p-small opacity--50">In-person seat at Rungta College (limited availability)</div>
          </div>
        </label>
        <label class="rsvp-option">
          <input type="radio" name="rsvp-type" value="online" />
          <div>
            <div class="rsvp-option__title p-medium u--fw-med">Online — free attendee</div>
            <div class="rsvp-option__desc p-small opacity--50">Attend virtually; no seat limit</div>
          </div>
        </label>
      </div>
      <div class="rsvp-actions">
        <button class="button rsvp-confirm">Continue</button>
        <button class="button is--ghost rsvp-cancel">Cancel</button>
      </div>
    </div>
  </div>
  `;

    // Minimal styles scoped to modal so it matches existing look-and-feel
    const style = document.createElement('style');
    style.textContent = `
  .rsvp-modal{position:fixed;inset:0;display:none;z-index:10000;font-family:inherit}
  .rsvp-modal[data-open="true"]{display:block}
  .rsvp-modal__backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.55)}
  .rsvp-modal__panel{position:relative;max-width:520px;margin:30vh auto;background:var(--color--light,#ffffff);border-radius:14px;padding:24px;box-shadow:0 20px 60px rgba(10,10,10,0.35)}
  .rsvp-modal__close{position:absolute;right:12px;top:10px;background:none;border:0;font-size:28px;line-height:1;cursor:pointer}
  .rsvp-options{display:flex;flex-direction:column;gap:12px;margin-top:12px}
  .rsvp-option{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:10px;border:1px solid rgba(0,0,0,0.06);cursor:pointer}
  .rsvp-option input{margin-top:6px;margin-right:8px}
  .rsvp-option__title{margin-bottom:4px}
  .rsvp-actions{display:flex;gap:12px;justify-content:flex-end;margin-top:18px}
  .button.is--ghost{background:transparent;border:1px solid var(--color--gray-300,#ddd);color:inherit}
  `;

    // Append to body
    function ensureModal() {
        if (document.getElementById('rsvp-modal')) return;
        const div = document.createElement('div');
        div.innerHTML = modalHtml;
        document.body.appendChild(div.firstElementChild);
        document.head.appendChild(style);

        // wire events
        const modal = document.getElementById('rsvp-modal');
        const close = modal.querySelector('.rsvp-modal__close');
        const cancel = modal.querySelector('.rsvp-cancel');
        const confirm = modal.querySelector('.rsvp-confirm');

        function closeModal() {
            modal.removeAttribute('data-open');
            modal.setAttribute('aria-hidden', 'true');
        }
        function openModal() {
            modal.setAttribute('data-open', 'true');
            modal.setAttribute('aria-hidden', 'false');
            // focus trap: focus first input
            const first = modal.querySelector('input[name="rsvp-type"]');
            if (first) first.focus();
        }

        close.addEventListener('click', closeModal);
        cancel.addEventListener('click', closeModal);
        modal.querySelector('.rsvp-modal__backdrop').addEventListener('click', closeModal);

        confirm.addEventListener('click', function () {
            const val = modal.querySelector('input[name="rsvp-type"]:checked').value;
            // offline -> go to /register (server-side page) to proceed
            if (val === 'offline') {
                // Add a query param so register page can detect
                window.open('https://google.com', '_blank');
            } else {
                // online -> open the google form used in site in a new tab
                window.open('https://forms.gle/FjsztV9xhbEgDntR8', '_blank');
            }
        });

        // allow clicking option labels to select radio
        modal.querySelectorAll('.rsvp-option').forEach(function (label) {
            label.addEventListener('click', function (e) {
                const radio = this.querySelector('input[type=radio]');
                if (radio) radio.checked = true;
            });
        });

        // expose open function
        window.__rsvp_open = openModal;
    }

    // attach click handlers to register buttons
    function attachHandlers() {
        ensureModal();
        const selectorList = [
            'a.nav-cta', // top nav register
            'a.button.w-inline-block', // hero register (primary)
            'a.nav-link.cta', // mobile nav register link
            'a.nav-link.cta.w-inline-block',
            'a.nav-link.cta'
        ];
        const candidates = new Set();
        selectorList.forEach(s => document.querySelectorAll(s).forEach(n => candidates.add(n)));
        // also include any element with inner text "Register"
        document.querySelectorAll('*').forEach(el => {
            if (el.children.length === 0 && /register/i.test((el.textContent || '').trim())) {
                candidates.add(el.closest('a') || el);
            }
        });

        candidates.forEach(function (el) {
            try {
                el.addEventListener('click', function (e) {
                    // if it's an anchor with external href (forms.gle or /register) we want to intercept
                    // prevent default navigation and show modal
                    e.preventDefault();
                    if (!document.getElementById('rsvp-modal')) ensureModal();
                    window.__rsvp_open();
                });
            } catch (err) {/* ignore non-elements */ }
        });
    }

    // init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachHandlers);
    } else {
        attachHandlers();
    }

})();
