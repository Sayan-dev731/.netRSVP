(function () {
    'use strict';

    // Ensure modal is created once
    function ensureHandbookModal() {
        if (document.getElementById('handbook-modal')) return;

        const modalHTML = `
      <div id="handbook-modal" class="handbook-modal" data-open="false" aria-hidden="true" role="dialog" aria-labelledby="handbook-title">
        <div class="handbook-modal__backdrop"></div>
        <div class="handbook-modal__panel">
          <button class="handbook-modal__close" aria-label="Close handbook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="handbook-modal__content">
            <div class="handbook-modal__header">
              <h2 id="handbook-title" class="handbook-modal__title">
                .NET Overflow 2025<br/>
                <span class="handbook-modal__subtitle">Participant Handbook</span>
              </h2>
              <div class="handbook-modal__date">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                December 2, 2025 | Rungta College of Engineering
              </div>
            </div>

            <div class="handbook-modal__body">
              <div class="handbook-section">
                <h3 class="handbook-section__title">Welcome to .NET Overflow 2025!</h3>
                <p class="handbook-section__text">
                  Join us for an immersive one-day .NET conference featuring cutting-edge sessions on .NET 10, AI integration, cloud-native solutions, and more. Choose your preferred mode of attendance:
                </p>
              </div>

              <div class="handbook-registration">
                <div class="handbook-card handbook-card--offline">
                  <div class="handbook-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div class="handbook-card__content">
                    <h4 class="handbook-card__title">Offline Attendance</h4>
                    <p class="handbook-card__description">
                      Join us in-person at Rungta College campus. Network with speakers, participate in hands-on workshops, and enjoy refreshments.
                    </p>
                    <div class="handbook-card__badge">Limited Seats Available</div>
                  </div>
                  <a href="https://www.eventbrite.com/e/net-overflow25-offline-tickets-1968807995714?aff=oddtdtcreator" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="handbook-card__button">
                    <span>Register for Offline</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>

                <div class="handbook-card handbook-card--online">
                  <div class="handbook-card__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="4"></circle>
                      <line x1="21.17" y1="8" x2="12" y2="8"></line>
                      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                    </svg>
                  </div>
                  <div class="handbook-card__content">
                    <h4 class="handbook-card__title">Online Attendance</h4>
                    <p class="handbook-card__description">
                      Attend virtually via Microsoft Teams. Watch live sessions, interact with speakers through Q&A, and access recordings later.
                    </p>
                    <div class="handbook-card__badge handbook-card__badge--free">Free Access</div>
                  </div>
                  <a href="https://events.teams.microsoft.com/event/9d288ee7-6cdb-458d-9e87-c3d8d723ae76@84c31ca0-ac3b-4eae-ad11-519d80233e6f?wt.mc_id=studentamb_297961" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="handbook-card__button">
                    <span>Register for Online</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              <div class="handbook-section">
                <h3 class="handbook-section__title">Event Highlights</h3>
                <ul class="handbook-list">
                  <li class="handbook-list__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Keynotes from industry experts and Microsoft MVPs</span>
                  </li>
                  <li class="handbook-list__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Hands-on workshops and coding labs</span>
                  </li>
                  <li class="handbook-list__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Track prizes and special awards</span>
                  </li>
                  <li class="handbook-list__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Networking opportunities with fellow developers</span>
                  </li>
                  <li class="handbook-list__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Certificates and exclusive Microsoft swag</span>
                  </li>
                </ul>
              </div>

              <div class="handbook-section">
                <h3 class="handbook-section__title">Need Help?</h3>
                <p class="handbook-section__text">
                  Join our Discord community or contact us at 
                  <a href="mailto:Sayan.Karmakar@studentambassadors.com" class="handbook-link">Sayan.Karmakar@studentambassadors.com</a> for any questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        const styleHTML = `
      <style>
        .handbook-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          display: none;
        }

        .handbook-modal[data-open="true"] {
          display: block;
        }

        .handbook-modal__backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.4s cubic-bezier(0.15, 0.5, 0.05, 1);
        }

        .handbook-modal__panel {
          position: relative;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          margin: 5vh auto;
          background: var(--color--light, #F2EEE4);
          border: 2px solid #000;
          border-radius: 8px;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: slideUp 0.525s cubic-bezier(0.15, 0.5, 0.05, 1);
          display: flex;
          flex-direction: column;
        }

        .handbook-modal__close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          background: #000;
          border: 2px solid #000;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.15, 0.5, 0.05, 1);
          z-index: 10;
        }

        .handbook-modal__close:hover {
          transform: rotate(90deg);
          background: var(--color--blue-900, #5C4ADE);
        }

        .handbook-modal__content {
          overflow-y: auto;
          padding: 3rem 2rem 2rem;
          scrollbar-width: thin;
          scrollbar-color: #5C4ADE #F2EEE4;
        }

        .handbook-modal__content::-webkit-scrollbar {
          width: 8px;
        }

        .handbook-modal__content::-webkit-scrollbar-track {
          background: #F2EEE4;
        }

        .handbook-modal__content::-webkit-scrollbar-thumb {
          background: #5C4ADE;
          border-radius: 4px;
        }

        .handbook-modal__header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #000;
        }

        .handbook-modal__title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 1rem;
          color: #000;
        }

        .handbook-modal__subtitle {
          color: var(--color--blue-900, #5C4ADE);
          display: block;
          margin-top: 0.5rem;
        }

        .handbook-modal__date {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          color: #666;
          margin-top: 1rem;
        }

        .handbook-modal__body {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .handbook-section__title {
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-weight: 600;
          margin: 0 0 1rem;
          color: #000;
        }

        .handbook-section__text {
          font-size: 1rem;
          line-height: 1.6;
          color: #333;
          margin: 0;
        }

        .handbook-registration {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .handbook-card {
          background: #fff;
          border: 2px solid #000;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.35s cubic-bezier(0.15, 0.5, 0.05, 1);
          position: relative;
          overflow: hidden;
        }

        .handbook-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(92, 74, 222, 0.1), rgba(255, 111, 180, 0.1));
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.15, 0.5, 0.05, 1);
          pointer-events: none;
        }

        .handbook-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .handbook-card:hover::before {
          opacity: 1;
        }

        .handbook-card__icon {
          width: 3rem;
          height: 3rem;
          background: var(--color--blue-900, #5C4ADE);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .handbook-card--online .handbook-card__icon {
          background: var(--color--green-200, #55DB9C);
        }

        .handbook-card__content {
          flex: 1;
        }

        .handbook-card__title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          color: #000;
        }

        .handbook-card__description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #666;
          margin: 0 0 1rem;
        }

        .handbook-card__badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #FF6FB4;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .handbook-card__badge--free {
          background: var(--color--green-200, #55DB9C);
          color: #000;
        }

        .handbook-card__button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: #000;
          color: #fff;
          border: 2px solid #000;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.15, 0.5, 0.05, 1);
          margin-top: auto;
        }

        .handbook-card__button:hover {
          background: var(--color--blue-900, #5C4ADE);
          border-color: var(--color--blue-900, #5C4ADE);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(92, 74, 222, 0.3);
        }

        .handbook-card__button svg {
          transition: transform 0.3s cubic-bezier(0.15, 0.5, 0.05, 1);
        }

        .handbook-card__button:hover svg {
          transform: translateX(4px);
        }

        .handbook-list {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .handbook-list__item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 1rem;
          line-height: 1.6;
          color: #333;
        }

        .handbook-list__item svg {
          flex-shrink: 0;
          margin-top: 0.15rem;
          stroke: var(--color--green-200, #55DB9C);
          stroke-width: 3;
        }

        .handbook-link {
          color: var(--color--blue-900, #5C4ADE);
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .handbook-link:hover {
          color: #FF6FB4;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet */
        @media screen and (max-width: 991px) {
          .handbook-modal__panel {
            width: 95%;
            max-height: 92vh;
            margin: 4vh auto;
          }

          .handbook-modal__content {
            padding: 2.5rem 1.5rem 1.5rem;
          }

          .handbook-modal__close {
            top: 1rem;
            right: 1rem;
          }

          .handbook-registration {
            gap: 1rem;
          }
        }

        /* Mobile */
        @media screen and (max-width: 767px) {
          .handbook-modal__panel {
            width: 100%;
            max-height: 100vh;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }

          .handbook-modal__content {
            padding: 2rem 1.25rem 1.25rem;
          }

          .handbook-modal__header {
            padding-bottom: 1.5rem;
          }

          .handbook-modal__date {
            font-size: 0.875rem;
            flex-wrap: wrap;
          }

          .handbook-registration {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .handbook-card {
            padding: 1.25rem;
          }

          .handbook-section__title {
            font-size: 1.25rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .handbook-modal__backdrop,
          .handbook-modal__panel,
          .handbook-modal__close,
          .handbook-card,
          .handbook-card__button {
            animation: none;
            transition: none;
          }
        }
      </style>
    `;

        document.body.insertAdjacentHTML('beforeend', styleHTML + modalHTML);

        const modal = document.getElementById('handbook-modal');
        const backdrop = modal.querySelector('.handbook-modal__backdrop');
        const closeBtn = modal.querySelector('.handbook-modal__close');

        function closeModal() {
            modal.setAttribute('data-open', 'false');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function openModal() {
            modal.setAttribute('data-open', 'true');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.getAttribute('data-open') === 'true') {
                closeModal();
            }
        });

        // Expose open function
        window.openHandbookModal = openModal;
    }

    // Wire up handbook buttons
    function attachHandbookHandlers() {
        const handbookButtons = document.querySelectorAll('[data-handbook-trigger]');

        handbookButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                ensureHandbookModal();
                window.openHandbookModal();
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            ensureHandbookModal();
            attachHandbookHandlers();
        });
    } else {
        ensureHandbookModal();
        attachHandbookHandlers();
    }
})();
