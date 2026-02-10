// --- CONFIG ---
const NOMOR_WA = "628123456789"; // GANTI NOMOR DI SINI (Tanpa +)

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
// --- DATA KUIS: HARAPAN & WISH NURSITA 23rd ---
const quizData = [
    {
        q: "Di usia ke-23 ini, apa sih 'self-reward' yang paling Nursita pengen dapet kalau berhasil capai target?",
        opt: [
            "Solo traveling biar makin mandiri", 
            "Beli barang yang udah lama di-wishlist", 
            "Staycation tenang tanpa gangguan chat kerjaan", 
            "Makan enak sepuasnya tanpa mikir kalori"
        ],
        correct: 3, // Semua pilihan bagus, kita beri efek apresiasi di bawah
        msg_correct: "Apapun pilihannya, kamu layak dapet itu setelah kerja kerasmu! ✨",
        msg_wrong: "Pilihan yang mantap! Semoga segera terlaksana ya! 🥂"
    },
    {
        q: "Target utama Nursita untuk diri sendiri di tahun 2026 ini apa nih?",
        opt: [
            "Makin jago ngatur waktu & gak gampang capek", 
            "Punya tabungan yang lebih dari cukup", 
            "Lebih berani buat nyoba hal-hal baru", 
            "Makin sayang sama diri sendiri (Self-love)"
        ],
        correct: 3,
        msg_correct: "Self-love itu kunci! Bangga banget kalau kamu pilih ini. ❤️",
        msg_wrong: "Aamiin! Semoga dilancarkan semua niat baiknya ya. 🌟"
    },
    {
        q: "Kalau ada satu kebiasaan lama yang pengen Nursita tinggalin di umur 23, itu adalah...",
        opt: [
            "Sering begadang gak jelas", 
            "Suka nunda-nunda pekerjaan", 
            "Overthinking hal yang belum tentu terjadi", 
            "Terlalu gak enak hati sama orang lain"
        ],
        correct: 2,
        msg_correct: "Setuju! Duniamu bakal jauh lebih tenang tanpa overthinking. 🧘‍♀️",
        msg_wrong: "Langkah kecil buat perubahan besar. Semangat upgrade diri! 🚀"
    },
    {
        q: "Terakhir, doa paling tulus dari Nursita untuk dirinya sendiri hari ini adalah?",
        opt: [
            "Semoga selalu dikelilingi orang-orang tulus", 
            "Semoga sehat fisik dan mental terus", 
            "Semoga rezeki mengalir dari pintu mana aja", 
            "Semua jawaban di atas (Aamiin Paling Serius)"
        ],
        correct: 3,
        msg_correct: "Aamiin Ya Allah! Semoga dikabulkan secepatnya. 🙏✨",
        msg_wrong: "Doa terbaik juga dari aku buat kamu di sini. 😊"
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
function initPrankButton() {
    const btnJail = document.getElementById('btnJail');
    
    // Logic Lari-larian
    const moveBtn = () => {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 150);
        btnJail.style.position = 'fixed';
        btnJail.style.left = x + 'px';
        btnJail.style.top = y + 'px';
    };

    btnJail.addEventListener('mouseover', moveBtn); // Untuk PC
    btnJail.addEventListener('click', (e) => { // Untuk HP (kalo kepencet)
        e.preventDefault();
        alert("Eits, tombol ini rusak! Belum kebuka kuncinya 😜");
        moveBtn();
    });
}

// --- KIRIM WA ---
function pilihHadiah(hadiah) {
    if (confirm(`Yakin pilih ${hadiah}?`)) {
        const pesan = `Halo! Aku Nursita.\nAku udah selesai main kuis ultah ke-23.\n\nHadiah yang aku pilih: *${hadiah}* 🎁\n\nJangan lupa ditepati ya! Ditunggu di Cipanas (kalau pilih sate) hehe.`;
        window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`, '_blank');
    }
}