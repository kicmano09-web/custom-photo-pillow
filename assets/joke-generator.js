/**
 * Joke Generator - JokeAPI Integration
 * Fetches random jokes from external API with rating system
 */

class JokeGenerator {
  constructor() {
    this.jokeText = document.getElementById('jokeText');
    this.jokeCategory = document.getElementById('jokeCategory');
    this.getJokeBtn = document.getElementById('getJokeBtn');
    this.shareJokeBtn = document.getElementById('shareJokeBtn');
    this.jokeDisplay = document.getElementById('jokeDisplay');
    this.jokeLoading = document.getElementById('jokeLoading');
    this.jokeError = document.getElementById('jokeError');
    this.thumbsUp = document.getElementById('thumbsUp');
    this.thumbsDown = document.getElementById('thumbsDown');
    this.jokeCount = document.getElementById('jokeCount');
    this.jokeRating = document.getElementById('jokeRating');

    this.jokesLoaded = 0;
    this.jokesLiked = 0;
    this.currentJoke = null;
    this.apiUrl = 'https://v2.jokeapi.dev/joke/Any?format=json&safe-mode';

    this.init();
  }

  init() {
    this.getJokeBtn.addEventListener('click', () => this.fetchJoke());
    this.shareJokeBtn.addEventListener('click', () => this.shareJoke());
    this.thumbsUp.addEventListener('click', () => this.rateJoke(true));
    this.thumbsDown.addEventListener('click', () => this.rateJoke(false));

    // Load stats from localStorage
    this.loadStats();
  }

  async fetchJoke() {
    try {
      this.showLoading();
      this.hideError();

      // Fetch from JokeAPI
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Format joke text
      let jokeText = '';
      if (data.type === 'single') {
        jokeText = data.joke;
      } else if (data.type === 'twopart') {
        jokeText = `${data.setup}\n\n${data.delivery}`;
      }

      // Store current joke
      this.currentJoke = {
        text: jokeText,
        category: data.category,
        type: data.type,
        flags: data.flags
      };

      // Update UI
      this.displayJoke(jokeText, data.category);
      this.updateStats();
      this.hideLoading();
      this.resetRating();
    } catch (error) {
      console.error('Joke fetch error:', error);
      this.hideLoading();
      this.showError();
    }
  }

  displayJoke(joke, category) {
    this.jokeText.textContent = joke;
    this.jokeCategory.textContent = category.toUpperCase();
  }

  rateJoke(isLiked) {
    // Update UI
    if (isLiked) {
      this.thumbsUp.classList.add('active');
      this.thumbsDown.classList.remove('active');
      this.jokesLiked++;
    } else {
      this.thumbsDown.classList.add('active');
      this.thumbsUp.classList.remove('active');
    }

    // Save to localStorage
    this.saveStats();
    this.updateStats();
  }

  shareJoke() {
    if (!this.currentJoke) {
      alert('Get a joke first!');
      return;
    }

    const text = `Check out this joke: "${this.currentJoke.text}" 😂`;

    // Try native share API first
    if (navigator.share) {
      navigator.share({
        title: 'Random Joke',
        text: text
      }).catch(err => console.log('Share failed:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Joke copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy. Try again!');
      });
    }
  }

  updateStats() {
    this.jokesLoaded++;
    this.jokeCount.textContent = this.jokesLoaded;

    const percentage = this.jokesLoaded > 0
      ? Math.round((this.jokesLiked / this.jokesLoaded) * 100)
      : 0;
    this.jokeRating.textContent = percentage + '%';

    this.saveStats();
  }

  resetRating() {
    this.thumbsUp.classList.remove('active');
    this.thumbsDown.classList.remove('active');
  }

  showLoading() {
    this.jokeDisplay.style.display = 'none';
    this.jokeLoading.style.display = 'flex';
    this.getJokeBtn.disabled = true;
  }

  hideLoading() {
    this.jokeLoading.style.display = 'none';
    this.jokeDisplay.style.display = 'block';
    this.getJokeBtn.disabled = false;
  }

  showError() {
    this.jokeDisplay.style.display = 'none';
    this.jokeError.style.display = 'block';
  }

  hideError() {
    this.jokeError.style.display = 'none';
  }

  saveStats() {
    const stats = {
      jokesLoaded: this.jokesLoaded,
      jokesLiked: this.jokesLiked,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('jokeGeneratorStats', JSON.stringify(stats));
  }

  loadStats() {
    const stored = localStorage.getItem('jokeGeneratorStats');
    if (stored) {
      const stats = JSON.parse(stored);
      this.jokesLoaded = stats.jokesLoaded || 0;
      this.jokesLiked = stats.jokesLiked || 0;
      this.updateStats();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new JokeGenerator();
  });
} else {
  new JokeGenerator();
}