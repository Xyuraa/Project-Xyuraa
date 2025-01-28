/* document.getElementById('myButton').addEventListener('click', function() {
    alert('welcome to web!!')
});
*/

/* function button() {
    var nama = prompt("silahkan masukan nama anda:");
    if (nama) {
        alert("Halo Bro " + nama + "!");
    } else {
        alert('anda tidak memasukan nama');
    }
}
    */

const darkModeToggle = document.getElementById('dark-mode-toggle');
const musicToggle = document.getElementById('music-toggle');
const body = document.body;
const audio = document.getElementById('background-music');
const musicIcon = musicToggle.querySelector('i');
const playPauseButton = document.getElementById('play-pause');

// Simpan preferensi mode gelap dan status audio di localStorage
const currentMode = localStorage.getItem('dark-mode');
const musicStatus = localStorage.getItem('music-status'); // Mengambil status musik dari localStorage

if (currentMode === 'enabled') {
    body.classList.add('dark-mode');
}

if (musicStatus === 'playing') {
    audio.play();
    musicIcon.classList.replace('fa-play', 'fa-pause'); // Ganti ikon ke pause jika musik diputar
}

// Fungsi untuk toggle mode gelap
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const mode = body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
    localStorage.setItem('dark-mode', mode);
});

// Fungsi untuk toggle musik
musicToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        localStorage.setItem('music-status', 'playing');  // Simpan status musik
        musicIcon.classList.replace('fa-play', 'fa-pause'); // Ganti ikon ke pause
    } else {
        audio.pause();
        localStorage.setItem('music-status', 'paused');  // Simpan status musik
        musicIcon.classList.replace('fa-pause', 'fa-play'); // Ganti ikon ke play
    }
});

// Fungsi untuk toggle play/pause
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
});

// Event listener untuk mendeteksi ketika musik berakhir
audio.addEventListener('ended', () => {
    playPauseButton.textContent = 'Play'; // Ubah tombol kembali ke "Play"
});


