const RekomendasiPage = {
  render() {
    return `
      <style>
        .filter-kategori {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .filter-icon-label {
          display: flex;
          align-items: center;
        }

        .filter-icon-label svg {
          width: 24px;
          height: 24px;
          fill: black;
        }

        .filter-kategori select {
          padding: 5px 10px;
          font-size: 14px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-content {
          background: #fff;
          max-width: 600px;
          width: 90%;
          border-radius: 10px;
          padding: 20px;
          position: relative;
          animation: fadeIn 0.3s ease-in-out;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          margin-bottom: 10px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #888;
        }

        .recipe-detail img {
          max-width: 100%;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .recipe-info h4 {
          margin-top: 10px;
          margin-bottom: 5px;
        }

        .category-badge {
          background: #f0ad4e;
          color: white;
          padding: 4px 8px;
          border-radius: 5px;
          font-size: 13px;
          display: inline-block;
          margin-bottom: 10px;
        }

        .ingredients-list,
        .steps-list {
          padding-left: 20px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <section class="rekomendasi-section" style="position: relative;">
        <div class="filter-kategori">
          <label for="kategoriSelect" class="filter-icon-label" aria-label="Filter Kategori">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm4 5h10v2H7v-2zm-4 5h18v2H3v-2z"/>
            </svg>
          </label>
          <select id="kategoriSelect">
            <option value="">Semua Kategori</option>
            <option value="sarapan">Sarapan</option>
            <option value="diet">Diet</option>
            <option value="makan malam">Makan Malam</option>
            <option value="camilan">Camilan</option>
            <option value="minuman">Minuman</option>
          </select>
        </div>

        <h2>Hasil Rekomendasi Resep</h2>
        <div id="hasilResep" class="resep-container"></div>

        <!-- Modal untuk detail resep -->
        <div id="modalDetail" class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modalTitle">Detail Resep</h3>
              <button class="modal-close" id="closeModal">&times;</button>
            </div>
            <div class="modal-body" id="modalBody"></div>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    this.keyword = sessionStorage.getItem('searchKeyword') || '';
    this.category = sessionStorage.getItem('searchCategory') || '';

    this.resepDummy = [
      {
        id: 1,
        nama: 'Telur Dadar Tomat',
        kategori: 'sarapan',
        gambar: 'https://source.unsplash.com/400x300/?omelette',
        bahan: ['telur', 'tomat', 'garam', 'merica', 'minyak goreng'],
        langkah: ['Kocok telur dalam mangkuk', 'Potong tomat menjadi dadu kecil', 'Panaskan minyak di wajan', 'Masukkan telur kocok', 'Tambahkan potongan tomat', 'Masak hingga matang']
      },
      {
        id: 2,
        nama: 'Salad Telur Diet',
        kategori: 'diet',
        gambar: 'https://source.unsplash.com/400x300/?salad',
        bahan: ['telur rebus', 'selada', 'tomat cherry', 'timun', 'olive oil', 'lemon'],
        langkah: ['Rebus telur hingga matang', 'Potong telur menjadi 4 bagian', 'Cuci bersih sayuran', 'Campur semua bahan dalam mangkuk', 'Tambahkan olive oil dan perasan lemon', 'Aduk rata dan sajikan']
      }
    ];

    this.resepUpload = JSON.parse(localStorage.getItem('uploadedRecipes') || '[]');
    this.semuaResep = [...this.resepDummy, ...this.resepUpload];
    this.tersimpan = JSON.parse(localStorage.getItem('savedRecipes') || '[]');

    this.renderResep();

    const kategoriSelect = document.getElementById('kategoriSelect');
    kategoriSelect.value = this.category;

    kategoriSelect.addEventListener('change', (e) => {
      this.category = e.target.value;
      sessionStorage.setItem('searchCategory', this.category);
      this.renderResep();
    });

    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalDetail');

    closeModalBtn.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
      }
    });
  },

  renderResep() {
    const hasilResepContainer = document.getElementById('hasilResep');
    hasilResepContainer.innerHTML = '';

    if (!this.keyword) {
      hasilResepContainer.innerHTML = '<p>Keyword tidak ditemukan. Silakan cari ulang.</p>';
      return;
    }

    const hasil = this.semuaResep.filter(resep => {
      const cocokKeyword = resep.bahan.some(b => b.toLowerCase().includes(this.keyword.toLowerCase()));
      const cocokKategori = this.category ? resep.kategori === this.category : true;
      return cocokKeyword && cocokKategori;
    });

    if (hasil.length === 0) {
      hasilResepContainer.innerHTML = '<p>Tidak ditemukan resep dengan kata kunci dan kategori tersebut.</p>';
      return;
    }

    hasil.forEach(resep => {
      const sudahTersimpan = this.tersimpan.find(r => r.id === resep.id);
      const warnaIcon = sudahTersimpan ? 'orangered' : 'orange';

      const card = document.createElement('div');
      card.className = 'resep-card';
      card.innerHTML = `
        <img src="${resep.gambar}" alt="${resep.nama}">
        <h3>${resep.nama}</h3>
        <p>Kategori: ${resep.kategori}</p>
        <div class="btn-group">
          <button class="btn-detail" data-id="${resep.id}">Lihat Selengkapnya →</button>
          <button class="btn-bookmark" data-id="${resep.id}" aria-label="Simpan Resep">
            <svg xmlns="http://www.w3.org/2000/svg" fill="${warnaIcon}" viewBox="0 0 24 24" width="24" height="24">
              <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-7-5-7 5V4z"/>
            </svg>
          </button>
        </div>
      `;
      hasilResepContainer.appendChild(card);
    });

    document.querySelectorAll('.btn-detail').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const resep = this.semuaResep.find(r => r.id === id);
        this.showModal(resep);
      });
    });

    document.querySelectorAll('.btn-bookmark').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        let tersimpan = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const index = tersimpan.findIndex(r => r.id === id);
        const svg = e.currentTarget.querySelector('svg');

        if (index === -1) {
          const resep = this.semuaResep.find(r => r.id === id);
          tersimpan.push(resep);
          svg.setAttribute('fill', 'orangered');
          alert('Resep berhasil disimpan.');
        } else {
          tersimpan.splice(index, 1);
          svg.setAttribute('fill', 'orange');
          alert('Resep dihapus dari tersimpan.');
        }
        localStorage.setItem('savedRecipes', JSON.stringify(tersimpan));
      });
    });
  },

  showModal(resep) {
    const modalOverlay = document.getElementById('modalDetail');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');

    modalTitle.textContent = resep.nama;
    modalBody.innerHTML = `
      <div class="recipe-detail">
        <div class="recipe-image">
          <img src="${resep.gambar}" alt="${resep.nama}" />
        </div>
        <div class="recipe-info">
          <div class="recipe-category">
            <span class="category-badge">${resep.kategori}</span>
          </div>
          <div class="ingredients-section">
            <h4>Bahan-bahan:</h4>
            <ul class="ingredients-list">
              ${resep.bahan.map(bahan => `<li>${bahan}</li>`).join('')}
            </ul>
          </div>
          <div class="steps-section">
            <h4>Langkah-langkah:</h4>
            <ol class="steps-list">
              ${resep.langkah.map(langkah => `<li>${langkah}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
    modalOverlay.style.display = 'flex';
  }
};

export default RekomendasiPage;
