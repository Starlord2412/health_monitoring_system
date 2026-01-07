/* public/firebase-messaging-sw.js */

// For compat SDK – recommended for service worker
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js')

firebase.initializeApp({
    apiKey: 'AIzaSyAB5u5k0fUyGzmjWn5b1PXeSFE8rtzVAY8',
    authDomain: 'fir-signup-login-logout-28864.firebaseapp.com',
    databaseURL: 'https://fir-signup-login-logout-28864-default-rtdb.firebaseio.com',
    projectId: 'fir-signup-login-logout-28864',
    storageBucket: 'fir-signup-login-logout-28864.firebasestorage.app',
    messagingSenderId: '140565115906',
    appId: '1:140565115906:web:73dc480ab38623a10be31b',
})

const messaging = firebase.messaging()

// Background / closed tab messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message ', payload)

    const title = payload.notification?.title || 'New notification'
    const options = {
        body: payload.notification?.body || '',
        icon: '/health_monitoring_system/vite.svg', // respect base when deployed
    }

    self.registration.showNotification(title, options)
})
