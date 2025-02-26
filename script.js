function openModal(event, qrId) {
    event.preventDefault();
    document.getElementById(qrId + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(qrId) {
    document.getElementById(qrId + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('body').classList.add('loaded');
  }, 500); // delay 
});
