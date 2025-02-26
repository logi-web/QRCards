// Your existing modal functions
function openModal(event, qrId) {
    event.preventDefault();
    document.getElementById(qrId + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(qrId) {
    document.getElementById(qrId + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// More reliable splash screen handler
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('pwa-splash');
    
    if (splash) { // Make sure the element exists
        // Wait a short moment then fade out
        setTimeout(() => {
            splash.classList.add('fade-out');
        }, 500);
    }
    
    // Make sure content is visible regardless of splash screen
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});
