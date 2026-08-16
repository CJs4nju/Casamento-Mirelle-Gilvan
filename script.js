document.addEventListener('DOMContentLoaded', () => {
  // Contagem Regressiva para 26/12/2026 15:00:00
  const targetDate = new Date('2026-12-26T15:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').innerText = String(days).padStart(3, '0');
      document.getElementById('hours').innerText = String(hours).padStart(2, '0');
      document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
      document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Controle de Música Ambiente
  const bgAudio = document.getElementById('bg-audio');
  const musicModal = document.getElementById('music-modal');
  const playMusicBtn = document.getElementById('play-music');
  const skipMusicBtn = document.getElementById('skip-music');
  const musicFloat = document.getElementById('music-float');

  function startMusic() {
    bgAudio.play().then(() => {
      musicModal.style.display = 'none';
      musicFloat.style.display = 'inline-flex';
      musicFloat.innerHTML = '🎵 Música Ativa';
    }).catch(err => {
      console.log("Autoplay bloqueado pelo navegador:", err);
      musicModal.style.display = 'none';
      musicFloat.style.display = 'inline-flex';
      musicFloat.innerHTML = '▶️ Tocar Música';
    });
  }

  playMusicBtn.addEventListener('click', startMusic);

  skipMusicBtn.addEventListener('click', () => {
    musicModal.style.display = 'none';
    musicFloat.style.display = 'inline-flex';
    musicFloat.innerHTML = '▶️ Tocar Música';
  });

  musicFloat.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        musicFloat.innerHTML = '🎵 Música Ativa';
      }).catch(e => alert("Toque novamente para ativar o áudio."));
    } else {
      bgAudio.pause();
      musicFloat.innerHTML = '▶️ Tocar Música';
    }
  });

  // Exibir/Ocultar Chave Pix
  const togglePixBtn = document.getElementById('toggle-pix-btn');
  const pixContainer = document.getElementById('pix-container');

  togglePixBtn.addEventListener('click', () => {
    if (pixContainer.style.display === 'none') {
      pixContainer.style.display = 'flex';
      togglePixBtn.innerText = 'Ocultar Chave Pix';
    } else {
      pixContainer.style.display = 'none';
      togglePixBtn.innerText = 'Mostrar Chave Pix';
    }
  });

  // Copiar Chave Pix
  const copyPixBtn = document.getElementById('copy-pix-btn');
  copyPixBtn.addEventListener('click', () => {
    const pixKey = '74988535247';
    navigator.clipboard.writeText(pixKey).then(() => {
      copyPixBtn.innerText = 'Chave Pix Copiada!';
      setTimeout(() => {
        copyPixBtn.innerText = 'Copiar Chave Pix';
      }, 3000);
    });
  });
});
