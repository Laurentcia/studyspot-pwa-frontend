// URL API VERCEL ANDA
const BASE_API_URL = 'https://studyspot-one.vercel.app/api/spots'; 

document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah elemen list ada di halaman ini (untuk index.html atau categories.html)
    if (document.getElementById('spot-list')) {
        fetchSpots();
    }
});

function fetchSpots() {
    const listContainer = document.getElementById('spot-list');
    listContainer.innerHTML = '<p>Memuat data tempat...</p>'; // Tampilkan pesan loading

    // Melakukan fetch (ambil data) ke API Vercel
    fetch(BASE_API_URL)
        .then(response => {
            if (!response.ok) {
                // Memberikan error jika API tidak merespons 200 OK
                throw new Error('Gagal mengambil data dari API.');
            }
            return response.json();
        })
        .then(spots => {
            listContainer.innerHTML = ''; // Kosongkan container
            if (spots && spots.length > 0) {
                spots.forEach(spot => {
                    const spotCard = createSpotCard(spot);
                    listContainer.appendChild(spotCard);
                });
            } else {
                listContainer.innerHTML = '<p>Tidak ada tempat belajar yang ditemukan.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            listContainer.innerHTML = `<p style="color: red;">Error memuat data: ${error.message}. Pastikan koneksi dan URL API benar.</p>`;
        });
}

function createSpotCard(spot) {
    const card = document.createElement('div');
    card.classList.add('spot-card');
    
    // List yang dapat diklik ke detail.html?id=...
    card.innerHTML = `
        <a href="detail.html?id=${spot.id}">
            <h3>${spot.nama_tempat}</h3>
            <p>⭐ ${spot.rating}</p>
            <p>${spot.deskripsi.substring(0, 50)}...</p>
            <small>${spot.alamat}</small>
        </a>
    `;
    return card;
}
