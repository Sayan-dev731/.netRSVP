function generateMemberFields() {
    const count = document.getElementById('memberCount').value;
    const container = document.getElementById('teamMembers');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';
        memberDiv.style.opacity = '0';
        memberDiv.style.transform = 'translateY(20px)';

        memberDiv.innerHTML = `
            <h3>Your Details</h3>
            <div class="form-group">
                <label for="name${i}">Full Name</label>
                <input type="text" id="name${i}" required placeholder="Enter full name">
            </div>
            <div class="form-group">
                <label for="erp${i}">ERP ID</label>
                <input type="text" id="erp${i}" required placeholder="Enter ERP ID">
            </div>
            <div class="form-group">
                <label for="year${i}">Year</label>
                <select id="year${i}" required>
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>
            </div>
            <div class="form-group">
                <label for="email${i}">Email</label>
                <input type="email" id="email${i}" required placeholder="Enter email address">
            </div>
            <div class="form-group">
                <label for="phone${i}">Phone Number</label>
                <input type="tel" id="phone${i}" required pattern="[0-9]{10}" placeholder="Enter 10-digit phone number">
            </div>
            <div class="form-group">
                <label for="discord${i}">Discord Username</label>
                <input type="text" id="discord${i}" required>
            </div>
        `;

        container.appendChild(memberDiv);

        // Animate each member field
        setTimeout(() => {
            memberDiv.style.transition = 'all 0.5s ease';
            memberDiv.style.opacity = '1';
            memberDiv.style.transform = 'translateY(0)';
        }, i * 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateMemberFields();

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = 'Registering...';
        submitBtn.disabled = true;

        // Collect form data
        const teamName = document.getElementById('teamName').value;
        const memberCount = document.getElementById('memberCount').value;
        const members = [];

        // Collect data for each member
        for (let i = 0; i < memberCount; i++) {
            members.push({
                name: document.getElementById(`name${i}`).value,
                erpId: document.getElementById(`erp${i}`).value,
                year: document.getElementById(`year${i}`).value,
                email: document.getElementById(`email${i}`).value,
                phone: document.getElementById(`phone${i}`).value,
                discord: document.getElementById(`discord${i}`).value
            });
        }

        try {
            // Replace with your deployed Google Apps Script URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzB94KuP5XDiH7h70UtkQVR1kva1UuLMPboV27A_EulFA9iWizNuE0jp4FgldzaDNdbHw/exec';

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({
                    teamName,
                    members
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                submitBtn.innerHTML = 'Registration Complete!';
                submitBtn.style.background = '#4CAF50';

                // Optional: Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                    generateMemberFields();
                    submitBtn.innerHTML = 'Register Team';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = 'Error! Try Again';
            submitBtn.style.background = '#DC2626';
            submitBtn.disabled = false;
        }
    });
});
