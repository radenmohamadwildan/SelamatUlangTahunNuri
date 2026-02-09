// --- KONFIGURASI PENTING ---
// Ganti dengan nomor WhatsApp kamu. Gunakan format internasional tanpa '+'
// Contoh: 628123456789
const nomorWhatsApp = "628123456789"; 

// --- Logic Ganti Halaman ---
function nextPage(currentId) {
    // Sembunyikan halaman saat ini
    document.getElementById(`page-${currentId}`).classList.add('hidden');
    
    // Tampilkan halaman selanjutnya
    const nextId = currentId + 1;
    const nextPage = document.getElementById(`page-${nextId}`);
    
    if (nextPage) {
        nextPage.classList.remove('hidden');
    }
}

// --- Logic Kirim Pesan WA ---
function pilihHadiah(hadiah) {
    const pesan = `Hai! Aku udah buka websitenya 😆. Makasih ya!\n\nUntuk reward ulang tahun ke-23 ini, aku pilih: *${hadiah}* ✨.\n\nJadi kapan nih? wkwk.`;
    
    // Membuat link WhatsApp
    const url = `https://wa.me/6285156174283?text=${encodeURIComponent(pesan)}`;
    
    // Buka link di tab baru
    window.open(url, '_blank');
}

// --- Logic Animasi Hati (Opsional biar estetik) ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');
    heart.innerHTML = '❤';
    
    // Posisi horizontal acak
    heart.style.left = Math.random() * 100 + "vw";
    
    // Durasi animasi acak (antara 3 sampai 5 detik)
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    
    // Ukuran acak
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    
    document.body.appendChild(heart);
    
    // Hapus elemen setelah animasi selesai (5 detik)
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Jalankan fungsi createHeart setiap 300 milidetik
setInterval(createHeart, 300);