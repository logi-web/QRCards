---
layout: null
---
// Modal functions
function openModal(event, qrId) {
    event.preventDefault();
    document.getElementById(qrId + '-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(qrId) {
    document.getElementById(qrId + '-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// Add keyboard support for closing with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.active');
        openModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Check if app was launched from homescreen
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone || 
           document.referrer.includes('android-app://');
}

// Function to show splash screen
function showSplashScreen() {
    // Check if the app was launched as PWA and is not navigating from splash screen
    if (isPWA() && !sessionStorage.getItem('splashShown') && !window.location.href.includes('splash-screen.html')) {
        sessionStorage.setItem('splashShown', 'true');
        window.location.href = '{{ site.baseurl }}/splash-screen.html';
    }
}

// Check for PWA launch on page load
window.addEventListener('DOMContentLoaded', showSplashScreen);

// Register Service Worker for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('{{ site.baseurl }}/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                
                // Check for updates on each page load
                registration.update();
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Optional: Add a prompt for users to refresh when a new service worker is available
let newWorker;
let refreshing = false;

// Listen for new service worker installation
navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
});

// This function shows a notification when a new service worker is waiting
function showUpdateNotification() {
    // You can implement a more sophisticated UI notification here
    if (confirm('New version available! Click OK to refresh.')) {
        newWorker.postMessage({ action: 'skipWaiting' });
    }
}

// Listen for new workers that have waiting state
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('{{ site.baseurl }}/service-worker.js')
        .then(reg => {
            reg.addEventListener('updatefound', () => {
                newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateNotification();
                    }
                });
            });
        });
}
