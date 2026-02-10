// --- CONFIG ---
const NOMOR_WA = "6285156174283"; // GANTI NOMOR DI SINI (Tanpa +)

// --- AUDIO CONTROL ---
let isMusicPlaying = false;
const bgMusic = document.getElementById('bgMusic');

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        isMusicPlaying = true;
    }
}

// --- NAVIGASI HALAMAN ---
function switchSection(hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(hideId).classList.add('hidden');
    
    setTimeout(() => {
        document.getElementById(showId).classList.remove('hidden');
        document.getElementById(showId).classList.add('active');
    }, 100); // Delay dikit biar smooth
}

// --- BAGIAN 1: BUKA AMPLOP ---
function openEnvelope() {
    // Efek suara amplop (opsional, visual aja)
    switchSection('envelopeSection', 'greetingSection');
    // Coba auto play music (browser policy might block this)
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => { isMusicPlaying = true; }).catch(e => console.log("Audio perlu interaksi user"));
}

// --- BAGIAN 2: KUIS ---
const quizData = [
    {
        q: "Jujur, hubungan kita ini statusnya apa?",
        opt: ["Temen Biasa", "Temen Rasa Pacar", "HTS (Hubungan Tanpa Status)", "Jodoh (Aamiin)"],
        correct: 3, // Index 3 = Jodoh (Biar dia seneng wkwk)
        msg_correct: "Nah gitu dong, peka! 🎉",
        msg_wrong: "Yakin jawab itu? Coba lagi! 🤨"
    },
    {
        q: "Apa makanan yang paling pas buat ngerayain ultah ke-23?",
        opt: ["Sate Maranggi Cipanas", "Makan Angin", "Janji Manis", "Bubur Diaduk"],
        correct: 0,
        msg_correct: "Gas! Otw Cipanas 🚗",
        msg_wrong: "Dih, masa makan itu. Yang bener dong!"
    },
    {
        q: "Kalau aku ngajak jalan, ekspektasi kamu apa?",
        opt: ["Ditraktir", "Diimamin", "Diajak Ghibah", "Semua Benar"],
        correct: 3,
        msg_correct: "Paket lengkap pokoknya! ❤️",
        msg_wrong: "Kurang lengkap tuh jawabannya..."
    }
];

let currentQuiz = 0;

function startQuiz() {
    switchSection('greetingSection', 'quizSection');
    loadQuiz();
}

function loadQuiz() {
    const data = quizData[currentQuiz];
    document.getElementById('qQuestion').innerText = data.q;
    const optContainer = document.getElementById('qOptions');
    optContainer.innerHTML = '';
    document.getElementById('feedback').innerText = '';

    data.opt.forEach((text, index) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.innerHTML = `<span>${["A","B","C","D"][index]}.</span> ${text}`;
        btn.onclick = () => checkAnswer(index, btn);
        optContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, element) {
    const data = quizData[currentQuiz];
    const feedback = document.getElementById('feedback');

    if (selectedIndex === data.correct) {
        // BENAR
        element.style.background = '#d4edda';
        element.style.borderColor = '#28a745';
        feedback.innerText = data.msg_correct;
        feedback.style.color = '#28a745';
        
        // Efek Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                switchSection('quizSection', 'giftSection');
                initPrankButton(); // Aktifkan tombol jail
            }
        }, 1500);

    } else {
        // SALAH
        element.style.background = '#f8d7da';
        element.style.borderColor = '#dc3545';
        feedback.innerText = data.msg_wrong;
        feedback.style.color = '#dc3545';
        
        // Efek Getar
        const card = document.querySelector('.quiz-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
    }
}

// --- BAGIAN 3: PRANK BUTTON (JAIL) ---
// --- UPDATE FITUR TOMBOL JAIL ---
function initPrankButton() {
    const btnJail = document.getElementById('btnJail');
    
    // 1. Fungsi agar tombol lari (opsional, bisa dimatikan jika ingin fokus ke dialog)
    const moveBtn = () => {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 150);
        btnJail.style.position = 'fixed';
        btnJail.style.left = x + 'px';
        btnJail.style.top = y + 'px';
    };

    // Jalankan efek lari hanya di layar lebar (desktop) agar tidak menyulitkan di HP
    if (window.innerWidth > 768) {
        btnJail.addEventListener('mouseover', moveBtn);
    }

    // 2. Logika Dialog Interaktif saat diklik
    btnJail.onclick = function() {
        // Dialog Pertama
        alert("Eits, tombol ini rusak! Belum kebuka kuncinya, soalnya kuncinya ada di kamu... 😜");
        
        // Dialog Kedua (Konfirmasi)
        let yakin = confirm("Yakin mau buka kuncinya sekarang? Kamunya udah siap belum?");
        
        if (yakin) {
            // Jika dia klik "OK"
            alert("Ciee yang udah siap! Kalau gitu, kabari aku langsung ya pas kita makan sate nanti. Bilang aja: 'Kuncinya mau aku kasih sekarang'. Aku tunggu! ❤️");
            
            // Kirim pesan otomatis ke WA kalau dia berani klik siap
            const pesanSiapp = "Halo! Tadi aku klik tombol 'Hubungan Jelas' di website kamu, dan katanya aku udah siap buka kuncinya... 🤔";
            window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesanSiapp)}`, '_blank');
        } else {
            // Jika dia klik "Cancel"
            alert("Yah, gajadi? Yaudah deh, aku tunggu sampai kamu beneran siap ya. Santai aja, aku nggak kemana-mana kok. 😋");
        }
    };
}

// --- KIRIM WA ---
function pilihHadiah(hadiah) {
    if (confirm(`Yakin pilih ${hadiah}?`)) {
        const pesan = `Halo! Aku Nursita.\nAku udah selesai main kuis ultah ke-23.\n\nHadiah yang aku pilih: *${hadiah}* 🎁\n\nJangan lupa ditepati ya! Ditunggu di Cipanas (kalau pilih sate) hehe.`;
        window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`, '_blank');
    }
}