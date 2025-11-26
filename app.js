// URL API VERCEL ANDA
const BASE_API_URL = 'https://studyspot-one.vercel.app/api/spots'; 

document.addEventListener('DOMContentLoaded', () => {
    // Hanya jalankan fungsi ini di index.html atau categories.html
    const spotListContainer = document.getElementById('spot-list-container-main');
    if (spotListContainer) {
        fetchSpots(spotListContainer);
    }
});

function fetchSpots(containerElement) {
    containerElement.innerHTML = '<p>Memuat data tempat...</p>'; // Tampilkan pesan loading

    fetch(BASE_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari API.');
            }
            return response.json();
        })
        .then(spots => {
            containerElement.innerHTML = ''; // Kosongkan container
            if (spots && spots.length > 0) {
                spots.forEach(spot => {
                    const spotCard = createSpotCard(spot);
                    containerElement.appendChild(spotCard);
                });
            } else {
                containerElement.innerHTML = '<p>Tidak ada tempat belajar yang ditemukan.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            containerElement.innerHTML = `<p style="color: red;">Error memuat data: ${error.message}. Pastikan koneksi dan URL API benar.</p>`;
        });
}

function createSpotCard(spot) {
    const card = document.createElement('div');
    card.classList.add('spot-card');
    
    // Pastikan gambar_url di API Anda benar atau gunakan placeholder jika belum ada gambar
    const imageUrl = spot.gambar_url.startsWith('http') ? spot.gambar_url : `https://via.placeholder.com/300x200/0A1128/FFFFFF?text=${encodeURIComponent(spot.nama_tempat)}`;

    card.innerHTML = `
        <a href="detail.html?id=${spot.id}">
            <img src="${imageUrl}" alt="${spot.nama_tempat}">
            <div class="spot-card-content">
                <h3>${spot.nama_tempat}</h3>
                <p>⭐ ${spot.rating} - ${spot.kategori}</p>
                <p>${spot.deskripsi.substring(0, 70)}...</p>
                <small>${spot.alamat}</small>
            </div>
        </a>
    `;
    return card;
}
