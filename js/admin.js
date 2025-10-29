// Admin panel functionality for .NET Overflow'25 RSVP system

// Default configuration
let currentConfig = {
    eventName: '.NET Overflow\'25',
    eventDate: 'November 11-13, 2025',
    eventDescription: 'A dedicated .NET conference featuring latest technologies and networking opportunities.',
    onlineFormUrl: 'https://forms.office.com/r/YourOnlineFormId',
    offlineFormUrl: 'https://forms.office.com/r/YourOfflineFormId',
    maxOnlineAttendees: 0,
    maxOfflineAttendees: 100,
    registrationMessage: 'Thank you for registering! You will receive a confirmation email shortly.',
    lastUpdated: new Date().toISOString()
};

// Show status message
function showStatus(message, type = 'success') {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = `status-message status-${type}`;
    statusDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
}

// Load configuration from server
async function loadConfig() {
    try {
        showStatus('Loading configuration...', 'success');

        const response = await fetch('/api/config');
        if (response.ok) {
            currentConfig = await response.json();
            populateForm();
            updatePreview();
            showStatus('Configuration loaded successfully!', 'success');
        } else {
            throw new Error('Failed to load configuration');
        }
    } catch (error) {
        console.error('Error loading config:', error);
        // Load default values if server is not available
        populateForm();
        updatePreview();
        showStatus('Using default configuration (server not available)', 'error');
    }
}

// Populate form with current configuration
function populateForm() {
    document.getElementById('eventName').value = currentConfig.eventName || '';
    document.getElementById('eventDate').value = currentConfig.eventDate || '';
    document.getElementById('eventDescription').value = currentConfig.eventDescription || '';
    document.getElementById('onlineFormUrl').value = currentConfig.onlineFormUrl || '';
    document.getElementById('offlineFormUrl').value = currentConfig.offlineFormUrl || '';
    document.getElementById('maxOnlineAttendees').value = currentConfig.maxOnlineAttendees || 0;
    document.getElementById('maxOfflineAttendees').value = currentConfig.maxOfflineAttendees || 100;
    document.getElementById('registrationMessage').value = currentConfig.registrationMessage || '';
}

// Update configuration preview
function updatePreview() {
    document.getElementById('previewEventName').textContent = currentConfig.eventName || 'Not set';
    document.getElementById('previewEventDate').textContent = currentConfig.eventDate || 'Not set';
    document.getElementById('previewOnlineForm').textContent = currentConfig.onlineFormUrl || 'Not set';
    document.getElementById('previewOfflineForm').textContent = currentConfig.offlineFormUrl || 'Not set';
}

// Validate form data
function validateForm() {
    const requiredFields = ['eventName', 'eventDate', 'onlineFormUrl', 'offlineFormUrl'];
    const errors = [];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            errors.push(`${field.labels[0].textContent} is required`);
        }
    });

    // Validate URLs
    const urlFields = ['onlineFormUrl', 'offlineFormUrl'];
    urlFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field.value.trim()) {
            try {
                new URL(field.value);
                if (!field.value.includes('forms.office.com') && !field.value.includes('forms.microsoft.com')) {
                    errors.push(`${field.labels[0].textContent} should be a Microsoft Forms URL`);
                }
            } catch (e) {
                errors.push(`${field.labels[0].textContent} is not a valid URL`);
            }
        }
    });

    return errors;
}

// Save configuration to server
async function saveConfig() {
    try {
        // Validate form
        const errors = validateForm();
        if (errors.length > 0) {
            showStatus(`Validation errors: ${errors.join(', ')}`, 'error');
            return;
        }

        showStatus('Saving configuration...', 'success');

        // Collect form data
        const formData = {
            eventName: document.getElementById('eventName').value.trim(),
            eventDate: document.getElementById('eventDate').value.trim(),
            eventDescription: document.getElementById('eventDescription').value.trim(),
            onlineFormUrl: document.getElementById('onlineFormUrl').value.trim(),
            offlineFormUrl: document.getElementById('offlineFormUrl').value.trim(),
            maxOnlineAttendees: parseInt(document.getElementById('maxOnlineAttendees').value) || 0,
            maxOfflineAttendees: parseInt(document.getElementById('maxOfflineAttendees').value) || 100,
            registrationMessage: document.getElementById('registrationMessage').value.trim(),
            lastUpdated: new Date().toISOString()
        };

        // Save to server
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            currentConfig = formData;
            updatePreview();
            showStatus('Configuration saved successfully!', 'success');
        } else {
            throw new Error('Failed to save configuration');
        }

    } catch (error) {
        console.error('Error saving config:', error);
        // Save to localStorage as fallback
        localStorage.setItem('rsvpConfig', JSON.stringify({
            eventName: document.getElementById('eventName').value.trim(),
            eventDate: document.getElementById('eventDate').value.trim(),
            eventDescription: document.getElementById('eventDescription').value.trim(),
            onlineFormUrl: document.getElementById('onlineFormUrl').value.trim(),
            offlineFormUrl: document.getElementById('offlineFormUrl').value.trim(),
            maxOnlineAttendees: parseInt(document.getElementById('maxOnlineAttendees').value) || 0,
            maxOfflineAttendees: parseInt(document.getElementById('maxOfflineAttendees').value) || 100,
            registrationMessage: document.getElementById('registrationMessage').value.trim(),
            lastUpdated: new Date().toISOString()
        }));
        showStatus('Configuration saved locally (server not available)', 'error');
    }
}

// Test Microsoft Forms URLs
async function testForms() {
    const onlineUrl = document.getElementById('onlineFormUrl').value.trim();
    const offlineUrl = document.getElementById('offlineFormUrl').value.trim();

    if (!onlineUrl || !offlineUrl) {
        showStatus('Please enter both form URLs before testing', 'error');
        return;
    }

    showStatus('Testing form URLs...', 'success');

    try {
        // Test online form
        const onlineTest = testFormUrl(onlineUrl, 'Online Form');
        const offlineTest = testFormUrl(offlineUrl, 'Offline Form');

        await Promise.all([onlineTest, offlineTest]);

        showStatus('Both forms are accessible!', 'success');
    } catch (error) {
        console.error('Form test error:', error);
        showStatus(`Form test completed with warnings: ${error.message}`, 'error');
    }
}

// Test individual form URL
async function testFormUrl(url, formName) {
    return new Promise((resolve, reject) => {
        // Create a hidden iframe to test the form
        const testFrame = document.createElement('iframe');
        testFrame.style.display = 'none';
        testFrame.style.width = '1px';
        testFrame.style.height = '1px';

        testFrame.onload = () => {
            document.body.removeChild(testFrame);
            console.log(`${formName} loaded successfully`);
            resolve();
        };

        testFrame.onerror = () => {
            document.body.removeChild(testFrame);
            reject(new Error(`${formName} failed to load`));
        };

        document.body.appendChild(testFrame);
        testFrame.src = url;

        // Timeout after 5 seconds
        setTimeout(() => {
            if (testFrame.parentNode) {
                document.body.removeChild(testFrame);
                console.log(`${formName} test timed out`);
                resolve(); // Don't reject, just resolve
            }
        }, 5000);
    });
}

// Auto-save on form changes
function setupAutoSave() {
    const form = document.getElementById('configForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreviewFromForm, 500));
    });
}

// Update preview from form values
function updatePreviewFromForm() {
    document.getElementById('previewEventName').textContent =
        document.getElementById('eventName').value || 'Not set';
    document.getElementById('previewEventDate').textContent =
        document.getElementById('eventDate').value || 'Not set';
    document.getElementById('previewOnlineForm').textContent =
        document.getElementById('onlineFormUrl').value || 'Not set';
    document.getElementById('previewOfflineForm').textContent =
        document.getElementById('offlineFormUrl').value || 'Not set';
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load configuration from localStorage as fallback
function loadLocalConfig() {
    try {
        const saved = localStorage.getItem('rsvpConfig');
        if (saved) {
            currentConfig = { ...currentConfig, ...JSON.parse(saved) };
            populateForm();
            updatePreview();
            showStatus('Loaded configuration from local storage', 'success');
        }
    } catch (error) {
        console.error('Error loading local config:', error);
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async () => {
    // Load configuration (try server first, then localStorage)
    await loadConfig();

    // If server failed, try localStorage
    if (document.getElementById('previewEventName').textContent === 'Not set') {
        loadLocalConfig();
    }

    // Setup auto-save
    setupAutoSave();

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveConfig();
        }
    });

    // Show help tooltip
    setTimeout(() => {
        showStatus('Tip: Press Ctrl+S to quickly save your configuration', 'success');
    }, 2000);
});

// Export configuration for backup
function exportConfig() {
    const config = {
        ...currentConfig,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `rsvp-config-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Import configuration from file
function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const config = JSON.parse(e.target.result);
            currentConfig = { ...currentConfig, ...config };
            populateForm();
            updatePreview();
            showStatus('Configuration imported successfully!', 'success');
        } catch (error) {
            showStatus('Error importing configuration file', 'error');
        }
    };
    reader.readAsText(file);
}

// Make functions available globally
window.loadConfig = loadConfig;
window.saveConfig = saveConfig;
window.testForms = testForms;
window.exportConfig = exportConfig;
window.importConfig = importConfig;