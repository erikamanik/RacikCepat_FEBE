const TersimpanPage = {
  render() {
    return `
      <section class="tersimpan-section">
        <h2>Resep Tersimpan</h2>
        <div id="tersimpanResepContainer" class="resep-container"></div>
      </section>
    `;
  },

  afterRender() {
    const container = document.getElementById('tersimpanResepContainer');
    let tersimpan = JSON.parse(localStorage.getItem('savedRecipes') || '[]');

    if (tersimpan.length === 0) {
      container.innerHTML = '<p>Belum ada resep yang disimpan.</p>';
      return;
    }

    tersimpan.forEach(resep => {
      const card = document.createElement('div');
      card.className = 'resep-card';
      card.innerHTML = `
        <img src="${resep.gambar}" alt="${resep.nama}">
        <h3>${resep.nama}</h3>
        <p>Kategori: ${resep.kategori}</p>
        <div class="btn-group">
          <button class="btn-detail" data-id="${resep.id}">Lihat Detail</button>
          <button class="btn-hapus" data-id="${resep.id}" aria-label="Hapus Resep">🗑️</button>
        </div>
      `;
      container.appendChild(card);
    });

    // Event detail
    document.querySelectorAll('.btn-detail').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        sessionStorage.setItem('selectedResepId', id);
        window.location.hash = '#/resep_makanan';
      });
    });

    // Event hapus
    document.querySelectorAll('.btn-hapus').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const konfirmasi = confirm('Hapus resep ini dari daftar tersimpan?');
        if (!konfirmasi) return;

        tersimpan = tersimpan.filter(r => r.id !== id);
        localStorage.setItem('savedRecipes', JSON.stringify(tersimpan));
        location.reload(); // Refresh halaman untuk tampilkan perubahan
      });
    });
  }
};

export default TersimpanPage;
