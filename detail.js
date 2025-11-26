// GANTI DENGAN URL API VERCEL ANDA YANG SEBENARNYA
const BASE_API_URL = 'https://studyspot-one.vercel.app/api/spots'; 

document.addEventListener('DOMContentLoaded', () => {
    // Hanya jalankan fungsi ini di detail.html
    if (document.getElementById('spot-detail-content')) {
        fetchSpotDetail();
    }
});

function fetchSpotDetail() {
    // 1. Ambil ID dari URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const spotId = urlParams.get('id');

    if (!spotId) {
        document.getElementById('spot-detail-content').innerHTML = '<p>ID tempat tidak ditemukan.</p>';
        return;
    }

    const detailContainer = document.getElementById('spot-detail-content');
    detailContainer.innerHTML = 'Memuat detail...';

    // 2. Fetch data detail dari API
    fetch(`${BASE_API_URL}/${spotId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil detail tempat.');
            }
            return response.json();
        })
        .then(spot => {
            // 3. Render (Tampilkan) data
            document.getElementById('header-name').innerText = spot.nama_tempat;
            document.getElementById('detail-title').innerText = `Detail ${spot.nama_tempat}`;
            
            // Render Fasilitas sebagai list
            const fasilitasListHtml = spot.fasilitas.map(f => `<li>${f}</li>`).join('');

            detailContainer.innerHTML = `
                <h2>${spot.nama_tempat}</h2>
                <div class="detail-info">
                    <p><strong>Rating:</strong>  ${spot.rating}</p>
                    <p><strong>Kategori:</strong> ${spot.kategori}</p>
                    <p><strong>Alamat:</strong> ${spot.alamat}</p>
                    <p><strong>Jam Buka:</strong> ${spot.jam_buka}</p>
                    <p><strong>Deskripsi:</strong> ${spot.deskripsi}</p>
                    
                    <h3>Fasilitas</h3>
                    <ul class="fasilitas-list">
                        ${fasilitasListHtml}
                    </ul>
                    </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching detail:', error);
            detailContainer.innerHTML = `<p style="color: red;">Gagal memuat detail tempat. (${error.message})</p>`;
        });
}
