function openModal(event, qrId) {
    event.preventDefault();
    document.getElementById(qrId + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(qrId) {
    document.getElementById(qrId + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Splash screen handling
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.querySelector('main'); // Adjust selector as needed
    
    // Hide main content initially
    if (mainContent) {
        mainContent.style.opacity = '0';
    }
    
    // App initialization tasks can go here
    // For example, loading data, checking authentication, etc.
    
    // Simulate loading time (remove in production and rely on actual loading)
    setTimeout(() => {
        // Hide splash screen
        splashScreen.classList.add('hidden');
        
        // Show main content
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transition = 'opacity 0.5s ease-in';
        }
    }, 2000); // Adjust timing as needed (2 seconds in this example)
});
