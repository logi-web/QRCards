function openModal(event, qrId) {
    event.preventDefault();
    document.getElementById(qrId + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(qrId) {
    document.getElementById(qrId + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Listen for the PWA launch
window.addEventListener('DOMContentLoaded', () => {
  // You can add a small delay here if needed
  setTimeout(() => {
    // Code to smoothly transition from splash screen
    document.querySelector('body').classList.add('loaded');
  }, 500); // Adjust timing as needed (300ms in this example)
});
