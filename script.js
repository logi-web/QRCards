---
layout: null
---
// Modal functions
function openModal(event, id) {
    event.preventDefault();
    document.getElementById(id + '-modal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id + '-modal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

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
