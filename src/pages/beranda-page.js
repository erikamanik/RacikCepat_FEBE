const BerandaPage = {
  render() {
    return `
      <section class="hero-section">
        <div class="hero-content">
          <h2>Selamat Datang di RacikCepat</h2>
          <p class="hero-subtitle">Temukan dan bagikan resep makanan favoritmu!</p>
          <p class="hero-description">Platform terlengkap untuk menemukan inspirasi kuliner, berbagi resep keluarga, dan mengeksplorasi cita rasa nusantara dalam satu tempat.</p>
          <button id="eksplorasiButton" class="hero-button">
            <span>Mulai Eksplorasi Resep</span>
            <i class="arrow">→</i>
          </button>
        </div>
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Delicious Food" />
        </div>
      </section>

      <section class="features-section">
        <h3>Mengapa Pilih RacikCepat?</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🍳</div>
            <h4>Ribuan Resep</h4>
            <p>Koleksi resep lengkap dari berbagai daerah dan negara</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⭐</div>
            <h4>Rating & Review</h4>
            <p>Sistem penilaian dari komunitas untuk resep terbaik</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h4>Mudah Digunakan</h4>
            <p>Interface yang intuitif dan ramah pengguna di semua device</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h4>Komunitas</h4>
            <p>Bergabung dengan komunitas pecinta kuliner Indonesia</p>
          </div>
        </div>
      </section>

      <section class="popular-recipes">
        <h3>Resep Populer Hari Ini</h3>
        <div class="recipe-preview-grid">
          <div class="recipe-preview-card">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Nasi Goreng" />
            <div class="recipe-preview-content">
              <h5>Nasi Goreng Spesial</h5>
              <p>★★★★★ (4.8)</p>
            </div>
          </div>
          <div class="recipe-preview-card">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Rendang" />
            <div class="recipe-preview-content">
              <h5>Rendang Padang Asli</h5>
              <p>★★★★★ (4.9)</p>
            </div>
          </div>
          <div class="recipe-preview-card">
            <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Gado-gado" />
            <div class="recipe-preview-content">
              <h5>Gado-Gado Jakarta</h5>
              <p>★★★★☆ (4.7)</p>
            </div>
          </div>
          <div class="recipe-preview-card">
            <img src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Sate" />
            <div class="recipe-preview-content">
              <h5>Sate Ayam Madura</h5>
              <p>★★★★★ (4.8)</p>
            </div>
          </div>
        </div>
        <div class="preview-cta">
          <button id="lihatSemuaButton" class="secondary-button">Lihat Semua Resep</button>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-content">
          <h3>Siap Memulai Petualangan Kuliner?</h3>
          <p>Bergabunglah dengan ribuan chef rumahan dan temukan resep impianmu sekarang!</p>
          <div class="cta-buttons">
            <button id="daftarButton" class="primary-button">Daftar Sekarang</button>
            <button id="loginButton" class="outline-button">Masuk</button>
          </div>
        </div>
        
      </section>
    `;
  },

  afterRender() {
    // Event listener untuk tombol eksplorasi utama
    document.getElementById('eksplorasiButton').addEventListener('click', () => {
      window.location.hash = '#/eksplorasi';
    });

    // Event listener untuk tombol lihat semua resep
    document.getElementById('lihatSemuaButton').addEventListener('click', () => {
      window.location.hash = '#/rekomendasi';
    });

    // ✅ Event listener untuk tombol daftar - mengarah ke halaman register
    document.getElementById('daftarButton').addEventListener('click', () => {
      window.location.hash = '#/register';
    });

    // ✅ Event listener untuk tombol login - mengarah ke halaman login
    document.getElementById('loginButton').addEventListener('click', () => {
      window.location.hash = '#/login';
    });

    // Event listener untuk preview cards
    const previewCards = document.querySelectorAll('.recipe-preview-card');
    previewCards.forEach(card => {
      card.addEventListener('click', () => {
        window.location.hash = '#/rekomendasi';
      });
    });

    // Animasi scroll reveal
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe semua section untuk animasi
    const sections = document.querySelectorAll('.features-section, .popular-recipes, .cta-section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }
};

export default BerandaPage;