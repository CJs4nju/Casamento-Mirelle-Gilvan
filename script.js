document.addEventListener('DOMContentLoaded', () => {
  const byId = (id) => document.getElementById(id);

  // Contagem regressiva: 26/12/2026 às 15h, horário local do visitante.
  const targetDate = new Date('2026-12-26T15:00:00').getTime();
  const countdown = {
    days: byId('days'),
    hours: byId('hours'),
    minutes: byId('minutes'),
    seconds: byId('seconds'),
  };

  function updateCountdown() {
    const remaining = targetDate - Date.now();
    if (remaining <= 0) {
      countdown.days.textContent = '000';
      countdown.hours.textContent = '00';
      countdown.minutes.textContent = '00';
      countdown.seconds.textContent = '00';
      return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    countdown.days.textContent = String(days).padStart(3, '0');
    countdown.hours.textContent = String(hours).padStart(2, '0');
    countdown.minutes.textContent = String(minutes).padStart(2, '0');
    countdown.seconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Música local: o navegador só permite tocar após uma interação do visitante.
  const audio = byId('bg-audio');
  const musicModal = byId('music-modal');
  const playMusicButton = byId('play-music');
  const skipMusicButton = byId('skip-music');
  const floatingMusicButton = byId('music-float');

  function showMusicButton(label) {
    floatingMusicButton.style.display = 'inline-flex';
    floatingMusicButton.textContent = label;
  }

  function hideMusicModal() {
    musicModal.style.display = 'none';
    musicModal.setAttribute('aria-hidden', 'true');
  }

  async function playLocalMusic() {
    try {
      audio.load();
      await audio.play();
      hideMusicModal();
      showMusicButton('🎵 Música ativa');
    } catch (error) {
      console.warn('Não foi possível iniciar musica.mp3:', error);
      hideMusicModal();
      showMusicButton('▶️ Tocar música');
    }
  }

  playMusicButton.addEventListener('click', playLocalMusic);

  skipMusicButton.addEventListener('click', () => {
    hideMusicModal();
    showMusicButton('▶️ Tocar música');
  });

  floatingMusicButton.addEventListener('click', async () => {
    if (audio.paused) {
      await playLocalMusic();
    } else {
      audio.pause();
      showMusicButton('▶️ Tocar música');
    }
  });

  audio.addEventListener('error', () => {
    showMusicButton('⚠️ Áudio indisponível');
  });

  // Mostrar/ocultar dados do Pix.
  const togglePixButton = byId('toggle-pix-btn');
  const pixContainer = byId('pix-container');

  togglePixButton.addEventListener('click', () => {
    const isHidden = pixContainer.style.display === 'none';
    pixContainer.style.display = isHidden ? 'flex' : 'none';
    togglePixButton.textContent = isHidden ? 'Ocultar chave Pix' : 'Mostrar chave Pix';
  });

  // Copiar a chave, com fallback para navegadores sem Clipboard API.
  const copyPixButton = byId('copy-pix-btn');
  const pixKey = '74988535247';

  async function copyPixKey() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pixKey);
      } else {
        const input = document.createElement('textarea');
        input.value = pixKey;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      copyPixButton.textContent = 'Chave Pix copiada!';
      window.setTimeout(() => {
        copyPixButton.textContent = 'Copiar chave Pix';
      }, 3000);
    } catch (error) {
      copyPixButton.textContent = pixKey;
    }
  }

  copyPixButton.addEventListener('click', copyPixKey);
});
