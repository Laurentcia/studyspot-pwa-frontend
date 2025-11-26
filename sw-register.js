// Cek jika browser mendukung Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                // Pendaftaran berhasil
                console.log('Service Worker berhasil terdaftar dengan scope: ', registration.scope);
            })
            .catch(err => {
                // Pendaftaran gagal
                console.log('Pendaftaran Service Worker gagal: ', err);
            });
    });
}
