// detail.js

// URL API VERCEL ANDA
const BASE_API_URL = 'https://studyspot-one.vercel.app/api/spots'; 

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('spot-detail-content')) {
        fetchSpotDetail();
    }
});

function fetchSpotDetail() {
    // 1. Ambil ID dari URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const spotId = urlParams.get('id'); // Mengambil nilai ID

    const detailContainer = document.getElementById('spot-detail-content');

    if (!spotId) {
        detailContainer.innerHTML = '<p style="color: red;">ID tempat tidak ditemukan di URL.</p>';
        return;
    }

    detailContainer.innerHTML = 'Memuat detail...';

    // 2. Fetch data detail dari API Vercel menggunakan ID
    // INI BAGIAN KRITISNYA: fetch menggunakan BASE_API_URL / ID
    fetch(`${BASE_API_URL}/${spotId}`) 
        .then(response => {
            if (!response.ok) {
                // Memberikan error jika API tidak merespons 200 OK
                throw new Error(`Gagal mengambil detail tempat ID ${spotId}.`);
            }
            return response.json();
        })
        .then(spot => {
            // 3. Render data (kode rendering di sini)
            document.getElementById('detail-title').innerText = `Detail ${spot.nama_tempat}`;
            
            const fasilitasListHtml = spot.fasilitas.map(f => `<li>${f}</li>`).join('');

            detailContainer.innerHTML = `
                <div id="spot-detail-content">
                    <img src="https://via.placeholder.com/600x400/0A1128/FFFFFF?text=${encodeURIComponent(spot.nama_tempat)}" alt="${spot.nama_tempat}">
                    <h2>${spot.nama_tempat}</h2>
                    <div class="detail-info">
                        <p><strong>Rating:</strong> ⭐ ${spot.rating} (${spot.kategori})</p>
                        <p><strong>Alamat:</strong> ${spot.alamat}</p>
                        <p><strong>Jam Buka:</strong> ${spot.jam_buka}</p>
                        <p><strong>Deskripsi:</strong> ${spot.deskripsi}</p>
                        
                        <h3>Fasilitas</h3>
                        <ul class="fasilitas-list">
                            ${fasilitasListHtml}
                        </ul>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching detail:', error);
            // Ini akan menampilkan pesan 'Failed to fetch' di PWA
            detailContainer.innerHTML = `<p style="color: red;">Gagal memuat detail tempat. (${error.message})</p>`;
        });
}
