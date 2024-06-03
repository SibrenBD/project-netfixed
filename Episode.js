document.addEventListener('DOMContentLoaded', () => {
  const episodesContainer = document.querySelector('.episodes');
  const totalEpisodes = 100;

  for (let i = 1; i <= totalEpisodes; i++) {
      const episodeElement = document.createElement('div');
      episodeElement.classList.add('episode');
      episodeElement.textContent = i;
      if (i === 7) {
          episodeElement.classList.add('active');
      }
      episodesContainer.appendChild(episodeElement);
  }

  document.getElementById('play-button').addEventListener('click', () => {
      alert('Play button clicked');
  });
});
