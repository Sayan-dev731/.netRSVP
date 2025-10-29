// Configuration - directly accessible
const eventConfig = {
    onlineFormUrl: 'https://forms.office.com/r/YourOnlineFormId',
    offlineFormUrl: 'https://forms.office.com/r/YourOfflineFormId',
    eventName: '.NET Overflow\'25',
    eventDate: 'November 11-13, 2025'
};

// Select ticket type and show Microsoft Form
function selectTicket(ticketType) {
    const ticketSelection = document.querySelector('.ticket-selection');
    const formsContainer = document.getElementById('formsContainer');

    console.log('Selecting ticket type:', ticketType);

    // Hide ticket selection and show form
    ticketSelection.style.display = 'none';
    formsContainer.style.display = 'block';

    // Smooth scroll to form
    setTimeout(() => {
        formsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Track selection for analytics
    try {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ticket_selected', {
                'ticket_type': ticketType,
                'event_name': eventConfig.eventName
            });
        }
    } catch (error) {
        console.log('Analytics not available');
    }
}

// Go back to ticket selection
function goBack() {
    const ticketSelection = document.querySelector('.ticket-selection');
    const formsContainer = document.getElementById('formsContainer');

    formsContainer.style.display = 'none';
    ticketSelection.style.display = 'block';

    // Smooth scroll to top
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

// Add hover effects to ticket cards
function initializeTicketCards() {
    const ticketCards = document.querySelectorAll('.ticket-card');

    ticketCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Handle form submission confirmation
function handleFormSubmission() {
    // Listen for messages from the embedded form
    window.addEventListener('message', function (event) {
        // Check if the message is from Microsoft Forms
        if (event.origin === 'https://forms.office.com' || event.origin === 'https://forms.microsoft.com') {
            if (event.data && event.data.type === 'FormSubmissionCompleted') {
                // Show success message
                showSuccessMessage();
            }
        }
    });
}

// Show success message after form submission
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Thank you for registering for ${eventConfig.eventName}. You will receive a confirmation email shortly.</p>
            <button class="success-btn" onclick="goBack()">Register Another Ticket</button>
        </div>
    `;

    document.body.appendChild(successMessage);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTicketCards();
    handleFormSubmission();

    // Add some animations on load
    setTimeout(() => {
        const ticketCards = document.querySelectorAll('.ticket-card');
        ticketCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});
