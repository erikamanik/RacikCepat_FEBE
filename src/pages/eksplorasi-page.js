const EksplorasiPage = {
  render() {
    return `
      <section class="eksplorasi-section">
        <h2>Cari Resep Berdasarkan Bahan</h2>
        <div class="search-container">
          <div class="add-ingredient-row">
            <input type="text" id="ingredientInput" placeholder="Contoh: telur, tomat, bawang">
            <button id="addIngredientButton" class="add-btn">+ TAMBAH</button>
            <button id="scanButton" class="scan-icon-btn" aria-label="Scan Bahan">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="none"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M21 7V5a2 2 0 0 0-2-2h-2" />
                <path d="M3 17v2a2 2 0 0 0 2 2h2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <line x1="4" y1="12" x2="20" y2="12" />
              </svg>
            </button>
          </div>

          <ul id="ingredientList" class="ingredient-list"></ul>

          <div class="button-group">
            <button id="searchButton">Cari Resep</button>
          </div>
        </div>

        <!-- Camera Modal -->
        <div id="cameraModal" class="camera-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Scan Bahan Makanan</h3>
              <button id="closeCameraModal" class="close-btn">&times;</button>
            </div>
            <div class="camera-container">
              <video id="cameraVideo" autoplay playsinline></video>
              <canvas id="captureCanvas" style="display: none;"></canvas>
            </div>
            <div class="camera-controls">
              <button id="captureButton">📸 Ambil Foto</button>
              <button id="stopCameraButton">Tutup Kamera</button>
            </div>
            <div id="scanResult" class="scan-result" style="display: none;">
              <p>Bahan terdeteksi: <span id="detectedIngredient"></span></p>
              <button id="useDetectedButton">Gunakan Hasil Scan</button>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    const ingredientInput = document.getElementById('ingredientInput');
    const ingredientList = document.getElementById('ingredientList');

    const getExistingIngredients = () =>
      Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.toLowerCase());

    const addIngredient = (value) => {
      const existingIngredients = getExistingIngredients();

      const ingredients = value
        .split(',')
        .map(i => i.trim().toLowerCase())
        .filter(i => i && !existingIngredients.includes(i));

      ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.className = 'ingredient-item';
        li.innerHTML = `
          <span class="drag-icon">☰</span>
          <span class="ingredient-text">${ingredient}</span>
          <button class="remove-btn" title="Hapus bahan" aria-label="Hapus bahan">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        `;
        li.querySelector('.remove-btn').addEventListener('click', () => li.remove());
        ingredientList.appendChild(li);
      });
    };

    document.getElementById('addIngredientButton').addEventListener('click', () => {
      const value = ingredientInput.value.trim();
      if (value) {
        addIngredient(value);
        ingredientInput.value = '';
      }
    });

    ingredientInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const value = ingredientInput.value.trim();
        if (value) {
          addIngredient(value);
          ingredientInput.value = '';
        }
      }
    });

    document.getElementById('useDetectedButton').addEventListener('click', () => {
      const detected = document.getElementById('detectedIngredient').textContent;
      addIngredient(detected);
      this.closeCamera();
    });

    document.getElementById('searchButton').addEventListener('click', () => {
      const items = Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.trim());
      if (items.length === 0) {
        alert('Tambahkan setidaknya satu bahan.');
        return;
      }
      sessionStorage.setItem('searchKeyword', items.join(','));
      window.location.hash = '#/rekomendasi';
    });

    document.getElementById('scanButton').addEventListener('click', () => {
      const isPremium = localStorage.getItem('isPremiumUser') === 'true';
      const scanCount = parseInt(localStorage.getItem('scanUsage') || '0', 10);

      if (!isPremium && scanCount >= 3) {
        alert('Masa gratis scan bahan sudah habis. Silakan upgrade ke versi premium untuk melanjutkan.');
        window.location.hash = '#/premium';
        return;
      }

      if (!isPremium) {
        localStorage.setItem('scanUsage', scanCount + 1);
      }

      this.openCamera();
    });

    document.getElementById('closeCameraModal').addEventListener('click', () => this.closeCamera());
    document.getElementById('stopCameraButton').addEventListener('click', () => this.closeCamera());
    document.getElementById('captureButton').addEventListener('click', () => this.captureImage());
  },

  async openCamera() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      video.srcObject = stream;
      modal.style.display = 'block';
      this.currentStream = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Tidak dapat mengakses kamera. Pastikan browser memiliki izin kamera.');
    }
  },

  closeCamera() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');
    const scanResult = document.getElementById('scanResult');

    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }

    video.srcObject = null;
    modal.style.display = 'none';
    scanResult.style.display = 'none';
  },

  captureImage() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('captureCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    this.simulateIngredientDetection();
  },

  simulateIngredientDetection() {
    const commonIngredients = [
      'telur', 'tomat', 'bawang merah', 'bawang putih', 'cabai',
      'wortel', 'kentang', 'ayam', 'daging sapi', 'ikan',
      'tahu', 'tempe', 'bayam', 'kangkung', 'nasi'
    ];

    setTimeout(() => {
      const randomIngredient = commonIngredients[Math.floor(Math.random() * commonIngredients.length)];
      document.getElementById('detectedIngredient').textContent = randomIngredient;
      document.getElementById('scanResult').style.display = 'block';
    }, 1500);
  }
};

export default EksplorasiPage;
