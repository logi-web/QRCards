function openModal(event, qrId) {
    event.preventDefault();
    document.getElementById(qrId + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(qrId) {
    document.getElementById(qrId + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Simple PWA splash screen handler
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('pwa-splash');
    
    // Wait a short moment then fade out
    setTimeout(() => {
        splash.classList.add('fade-out');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            splash.style.display = 'none';
        }, 800); // Match this to your transition time
    }, 300); // Adjust delay as needed
});
