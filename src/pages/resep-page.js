const ResepPage = {
  render() {
    return `
      <div class="resep-page-container">
        
        <!-- Header Section -->
        <div class="page-header">
          <h1>Koleksi Resep Saya</h1>
          <p>Kelola dan bagikan resep masakan favoritmu</p>
        </div>

        <!-- Main Content dengan Icon Cards -->
        <div class="main-content">
          
          <!-- Icon Card 1: Tambah Resep -->
          <div class="icon-card form-icon-card" id="tambahResepIcon">
            <div class="card-icon">
              <i class="fas fa-plus"></i>
            </div>
            <h2 class="card-title">Tambah Resep Baru</h2>
            <p class="card-description">Bagikan kreasi masakanmu dengan mudah</p>
          </div>

          <!-- Icon Card 2: Resep Saya -->
          <div class="icon-card list-icon-card" id="resepSayaIcon">
            <div class="card-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h2 class="card-title">Resep Saya</h2>
            <p class="card-description">Koleksi resep yang telah diupload</p>
          </div>
        </div>

        <!-- Form Section (Hidden Modal) -->
        <div class="content-section" id="formSection">
          <div class="content-wrapper">
            <button class="close-btn" id="closeFormBtn">&times;</button>
            <div class="form-content">
              <div class="form-header">
                <h2>Tambah Resep Baru</h2>
                <p>Bagikan kreasi masakanmu dengan mudah</p>
              </div>

              <form class="recipe-form" id="formTambahResep">
                <div class="form-group">
                  <label for="namaResep">Nama Resep</label>
                  <input type="text" id="namaResep" placeholder="Masukkan nama resep..." required>
                </div>

                <div class="form-group">
                  <label for="deskripsi">Deskripsi Singkat</label>
                  <textarea id="deskripsi" placeholder="Ceritakan tentang resep ini..." required rows="3"></textarea>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="porsi">Jumlah Porsi</label>
                    <input type="number" id="porsi" placeholder="4" min="1" required>
                  </div>
                  <div class="form-group">
                    <label for="waktuMemasak">Waktu Memasak</label>
                    <input type="text" id="waktuMemasak" placeholder="30 menit" required>
                  </div>
                </div>

                <!-- Bahan-bahan Section -->
                <div class="form-group">
                  <label>Bahan-bahan</label>
                  <div class="dynamic-list" id="daftarBahan">
                    <div class="list-item">
                      <span class="drag-handle">☰</span>
                      <input type="text" class="input-bahan" placeholder="Tulis bahan..." required>
                      <button type="button" class="remove-btn">×</button>
                    </div>
                  </div>
                  <button type="button" class="add-btn" id="tambahBahan">
                    <i class="fas fa-plus"></i>Tambah Bahan
                  </button>
                </div>

                <!-- Langkah-langkah Section -->
                <div class="form-group">
                  <label>Langkah-langkah</label>
                  <div class="dynamic-list" id="daftarLangkah">
                    <div class="list-item">
                      <span class="step-number">1</span>
                      <input type="text" class="input-langkah" placeholder="Tulis langkah..." required>
                      <button type="button" class="remove-btn">×</button>
                    </div>
                  </div>
                  <button type="button" class="add-btn" id="tambahLangkah">
                    <i class="fas fa-plus"></i>Tambah Langkah
                  </button>
                </div>

                <div class="form-group">
                  <label for="linkYoutube">Link YouTube (Opsional)</label>
                  <input type="url" id="linkYoutube" placeholder="https://youtube.com/watch?v=abc123" title="Link video tutorial untuk resep ini">
                  <small class="form-help">Tambahkan video tutorial untuk resep ini</small>
                </div>

                <div class="form-group">
                  <label for="kategori">Kategori</label>
                  <select id="kategori" required>
                    <option value="">Pilih Kategori</option>
                    <option value="sarapan">Sarapan</option>
                    <option value="diet">Diet</option>
                    <option value="makan_malam">Makan Malam</option>
                    <option value="camilan">Camilan</option>
                    <option value="minuman">Minuman</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="gambar">Foto Resep</label>
                  <input type="file" id="gambar" accept="image/*" required>
                </div>

                <button type="submit" class="submit-btn">
                  <i class="fas fa-upload"></i>Unggah Resep
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- List Section (Hidden Modal) -->
        <div class="content-section" id="listSection">
          <div class="content-wrapper">
            <button class="close-btn" id="closeListBtn">&times;</button>
            <div class="list-content">
              <div class="list-header">
                <h2>Resep Saya</h2>
                <p>Koleksi resep yang telah diupload</p>
              </div>

              <div class="recipe-grid" id="daftarResepUpload"></div>

              <!-- Empty State -->
              <div class="empty-state" id="emptyState" style="display: none;">
                <i class="fas fa-utensils"></i>
                <h3>Belum Ada Resep</h3>
                <p>Mulai tambahkan resep pertamamu!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recipe Detail Modal -->
        <div class="content-section" id="detailSection">
          <div class="content-wrapper">
            <button class="close-btn" id="closeDetailBtn">&times;</button>
            <div class="detail-content" id="detailContent">
              <!-- Content will be populated dynamically -->
            </div>
          </div>
        </div>

        <!-- Notification -->
        <div class="notification" id="notification">
          <span id="notificationText"></span>
        </div>

      </div>
    `;
  },

 afterRender() {
  // Get elements
  const tambahResepIcon = document.getElementById('tambahResepIcon');
  const resepSayaIcon = document.getElementById('resepSayaIcon');
  const formSection = document.getElementById('formSection');
  const listSection = document.getElementById('listSection');
  const detailSection = document.getElementById('detailSection');
  const closeFormBtn = document.getElementById('closeFormBtn');
  const closeListBtn = document.getElementById('closeListBtn');
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  const form = document.getElementById('formTambahResep');
  const daftarBahan = document.getElementById('daftarBahan');
  const daftarLangkah = document.getElementById('daftarLangkah');
  const tambahBahanBtn = document.getElementById('tambahBahan');
  const tambahLangkahBtn = document.getElementById('tambahLangkah');

  // Icon click handlers
  tambahResepIcon.addEventListener('click', () => {
    formSection.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  resepSayaIcon.addEventListener('click', () => {
    listSection.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.tampilkanDaftar();
  });

  // Close modal handlers
  const closeModal = (section) => {
    section.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  closeFormBtn.addEventListener('click', () => closeModal(formSection));
  closeListBtn.addEventListener('click', () => closeModal(listSection));
  closeDetailBtn.addEventListener('click', () => closeModal(detailSection));

  // Close modal when clicking outside modal content
  [formSection, listSection, detailSection].forEach(section => {
    section.addEventListener('click', (e) => {
      if (e.target === section) {
        closeModal(section);
      }
    });
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(formSection);
      closeModal(listSection);
      closeModal(detailSection);
    }
  });

  // Add ingredient button
  tambahBahanBtn.addEventListener('click', () => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <span class="drag-handle">☰</span>
      <input type="text" class="input-bahan" placeholder="Tulis bahan..." required>
      <button type="button" class="remove-btn">×</button>
    `;
    daftarBahan.appendChild(item);
  });

  // Add step button
  tambahLangkahBtn.addEventListener('click', () => {
    const currentSteps = daftarLangkah.querySelectorAll('.list-item').length;
    const stepNumber = currentSteps + 1;

    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <span class="step-number">${stepNumber}</span>
      <input type="text" class="input-langkah" placeholder="Tulis langkah..." required>
      <button type="button" class="remove-btn">×</button>
    `;
    daftarLangkah.appendChild(item);
  });

  // Update step numbers after removal
  const updateStepNumbers = () => {
    const stepNumbers = daftarLangkah.querySelectorAll('.step-number');
    stepNumbers.forEach((stepNumber, index) => {
      stepNumber.textContent = index + 1;
    });
  };

  // Remove ingredient item handler
  daftarBahan.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      if (daftarBahan.children.length > 1) {
        e.target.parentElement.remove();
      } else {
        this.showNotification('Minimal harus ada 1 bahan!', 'error');
      }
    }
  });

  // Remove step item handler
  daftarLangkah.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      if (daftarLangkah.children.length > 1) {
        e.target.parentElement.remove();
        updateStepNumbers();
      } else {
        this.showNotification('Minimal harus ada 1 langkah!', 'error');
      }
    }
  });

  // YouTube URL validation
  const validateYouTubeUrl = (url) => {
    if (!url || url.trim() === '') return true; // Empty is valid (optional)
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  // Form submit handler
  let formSubmitted = false;
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('gambar');
    const file = fileInput.files[0];
    if (!file) {
      this.showNotification('Harap pilih gambar!', 'error');
      return;
    }

    // Validate YouTube URL
    const linkYoutube = document.getElementById('linkYoutube').value.trim();
    if (!validateYouTubeUrl(linkYoutube)) {
      this.showNotification('Format link YouTube tidak valid!', 'error');
      document.getElementById('linkYoutube').focus();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const bahanInputs = document.querySelectorAll('.input-bahan');
      const bahan = Array.from(bahanInputs)
        .map(i => i.value.trim())
        .filter(b => b !== '');

      const langkahInputs = document.querySelectorAll('.input-langkah');
      const langkah = Array.from(langkahInputs)
        .map(i => i.value.trim())
        .filter(l => l !== '');

      if (bahan.length === 0) {
        this.showNotification('Harap tambahkan minimal satu bahan!', 'error');
        return;
      }

      if (langkah.length === 0) {
        this.showNotification('Harap tambahkan minimal satu langkah!', 'error');
        return;
      }

      const editId = form.dataset.editId;
      const resep = {
        id: editId ? parseInt(editId) : Date.now(),
        nama: document.getElementById('namaResep').value,
        deskripsi: document.getElementById('deskripsi').value,
        porsi: document.getElementById('porsi').value,
        waktu: document.getElementById('waktuMemasak').value,
        bahan,
        langkah,
        kategori: document.getElementById('kategori').value,
        linkYoutube: linkYoutube || null,
        gambar: reader.result,
        tanggal: new Date().toLocaleDateString('id-ID')
      };

      // Save to localStorage
      let daftar = JSON.parse(localStorage.getItem('uploadedRecipes') || '[]');
      
      if (editId) {
        // Update existing recipe
        const index = daftar.findIndex(r => r.id === parseInt(editId));
        if (index !== -1) {
          daftar[index] = resep;
          this.showNotification('Resep berhasil diupdate!', 'success');
        }
      } else {
        // Add new recipe
        daftar.unshift(resep);
        this.showNotification('Resep berhasil ditambahkan!', 'success');
      }
      
      localStorage.setItem('uploadedRecipes', JSON.stringify(daftar));

      // Reset form
      form.reset();
      delete form.dataset.editId;
      this.resetForm();

      // Close modal
      closeModal(formSection);
    };
    reader.readAsDataURL(file);
  });
},

  resetForm() {
    // Reset dynamic lists to single item
    const daftarBahan = document.getElementById('daftarBahan');
    const daftarLangkah = document.getElementById('daftarLangkah');
    
    // Reset ingredients list
    daftarBahan.innerHTML = `
      <div class="list-item">
        <span class="drag-handle">☰</span>
        <input type="text" class="input-bahan" placeholder="Tulis bahan..." required>
        <button type="button" class="remove-btn">×</button>
      </div>
    `;
    
    // Reset steps list
    daftarLangkah.innerHTML = `
      <div class="list-item">
        <span class="step-number">1</span>
        <input type="text" class="input-langkah" placeholder="Tulis langkah..." required>
        <button type="button" class="remove-btn">×</button>
      </div>
    `;

    // Reset submit button text
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-upload"></i>Unggah Resep';
  },

tampilkanDaftar() {
  const daftarResepUpload = document.getElementById('daftarResepUpload');
  const emptyState = document.getElementById('emptyState');
  const daftar = JSON.parse(localStorage.getItem('uploadedRecipes') || '[]');

  // Kosongkan konten sebelum render ulang
  daftarResepUpload.innerHTML = '';

  if (daftar.length === 0) {
    daftarResepUpload.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    daftarResepUpload.style.display = 'grid';
    emptyState.style.display = 'none';

    daftar.forEach(resep => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.dataset.id = resep.id;

      card.innerHTML = `
        <div class="recipe-image">
          <img src="${resep.gambar || 'default-image.jpg'}" alt="${resep.nama}" />
          <div class="recipe-actions">
            <button class="action-btn view-btn"><i class="fas fa-eye"></i></button>
            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="recipe-info">
          <h3>${resep.nama}</h3>
          <p class="recipe-description">${resep.deskripsi}</p>
          <div class="recipe-meta">
            <span><i class="fas fa-users"></i> ${resep.porsi} porsi</span>
            <span><i class="fas fa-clock"></i> ${resep.waktu}</span>
          </div>
          <div class="recipe-footer">
            <span class="recipe-category">${this.getKategoriLabel(resep.kategori)}</span>
            <span class="recipe-date">${resep.tanggal}</span>
          </div>
        </div>
      `;

      // Tambahkan event listener
      card.querySelector('.view-btn').addEventListener('click', () => {
        ResepPage.lihatDetail(resep.id);
      });

      card.querySelector('.edit-btn').addEventListener('click', () => {
        ResepPage.editResep(resep.id);
      });

      card.querySelector('.delete-btn').addEventListener('click', () => {
        ResepPage.hapusResep(resep.id);
      });

      daftarResepUpload.appendChild(card);
    });
  }
},

  // Extract YouTube video ID from URL
  getYouTubeVideoId(url) {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  },

  lihatDetail(id) {
    const daftar = JSON.parse(localStorage.getItem('uploadedRecipes') || '[]');
    const resep = daftar.find(r => r.id === id);
    
    if (!resep) return;

    const detailSection = document.getElementById('detailSection');
    const detailContent = document.getElementById('detailContent');
    
    // Prepare YouTube video section
    let youtubeSection = '';
    if (resep.linkYoutube) {
      const videoId = this.getYouTubeVideoId(resep.linkYoutube);
      if (videoId) {
        youtubeSection = `
          <div class="youtube-section">
            <h2><i class="fab fa-youtube"></i> Video Tutorial</h2>
            <div class="youtube-video">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allowfullscreen>
              </iframe>
            </div>
          </div>`;
      } else {
        youtubeSection = `
          <div class="youtube-section">
            <h2><i class="fab fa-youtube"></i> Video Tutorial</h2>
            <div class="youtube-link">
              <a href="${resep.linkYoutube}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube"></i> Lihat Video Tutorial
              </a>
            </div>
          </div>`;
      }
    }
    
    detailContent.innerHTML = `
      <div class="recipe-detail">
        <div class="detail-header">
          <div class="detail-image">
            <img src="${resep.gambar}" alt="${resep.nama}" />
          </div>
          <div class="detail-info">
            <h1>${resep.nama}</h1>
            <p class="detail-description">${resep.deskripsi}</p>
            <div class="detail-meta">
              <div class="meta-item">
                <i class="fas fa-users"></i>
                <span>${resep.porsi} Porsi</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-clock"></i>
                <span>${resep.waktu}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-tag"></i>
                <span>${this.getKategoriLabel(resep.kategori)}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-calendar"></i>
                <span>${resep.tanggal}</span>
              </div>
            </div>
          </div>
        </div>
        
        ${youtubeSection}
        
        <div class="detail-content-wrapper">
          <div class="ingredients-section">
            <h2><i class="fas fa-list"></i> Bahan-bahan</h2>
            <ul class="ingredients-list">
              ${resep.bahan.map(bahan => `<li>${bahan}</li>`).join('')}
            </ul>
          </div>
          
          <div class="steps-section">
            <h2><i class="fas fa-utensils"></i> Langkah-langkah</h2>
            <ol class="steps-list">
              ${resep.langkah.map(langkah => `<li>${langkah}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
    
    detailSection.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  editResep(id) {
    const daftar = JSON.parse(localStorage.getItem('uploadedRecipes') || '[]');
    const resep = daftar.find(r => r.id === id);
    
    if (!resep) return;

    // Close list modal
    document.getElementById('listSection').classList.remove('active');
    
    // Fill form with existing data
    document.getElementById('namaResep').value = resep.nama;
    document.getElementById('deskripsi').value = resep.deskripsi;
    document.getElementById('porsi').value = resep.porsi;
    document.getElementById('waktuMemasak').value = resep.waktu;
    document.getElementById('kategori').value = resep.kategori;
    document.getElementById('linkYoutube').value = resep.linkYoutube || '';

    // Fill ingredients
    const daftarBahan = document.getElementById('daftarBahan');
    daftarBahan.innerHTML = resep.bahan.map(bahan => `
      <div class="list-item">
        <span class="drag-handle">☰</span>
        <input type="text" class="input-bahan" placeholder="Tulis bahan..." value="${bahan}" required>
        <button type="button" class="remove-btn">×</button>
      </div>
    `).join('');

    // Fill steps
    const daftarLangkah = document.getElementById('daftarLangkah');
    daftarLangkah.innerHTML = resep.langkah.map((langkah, index) => `
      <div class="list-item">
        <span class="step-number">${index + 1}</span>
        <input type="text" class="input-langkah" placeholder="Tulis langkah..." value="${langkah}" required>
        <button type="button" class="remove-btn">×</button>
      </div>
    `).join('');

    // Mark form as editing
    const form = document.getElementById('formTambahResep');
    form.dataset.editId = id;
    
    // Change submit button text
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-save"></i>Update Resep';
    
    // Show form modal
    document.getElementById('formSection').classList.add('active');
  },

  hapusResep(id) {
    if (confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
      let daftar = JSON.parse(localStorage.getItem('uploadedRecipes') || '[]');
      daftar = daftar.filter(resep => resep.id !== id);
      localStorage.setItem('uploadedRecipes', JSON.stringify(daftar));
      
      this.showNotification('Resep berhasil dihapus!', 'success');
      this.tampilkanDaftar();
    }
  },

  getKategoriLabel(kategori) {
    const labels = {
      'sarapan': 'Sarapan',
      'diet': 'Diet',
      'makan_malam': 'Makan Malam',
      'camilan': 'Camilan',
      'minuman': 'Minuman'
    };
    return labels[kategori] || kategori;
  },

  showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
};
export default ResepPage;