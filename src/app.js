import BerandaPage from './pages/beranda-page.js';
import EksplorasiPage from './pages/eksplorasi-page.js';
import RekomendasiPage from './pages/rekomendasi-page.js';
import ResepPage from './pages/resep-page.js';
import TersimpanPage from './pages/tersimpan-page.js';
import ProfilePage from './pages/profile-page.js';
import LoginPage from './pages/login-page.js';
import RegisterPage from './pages/daftar-page.js';
import PremiumPage from './pages/premium-page.js'; // ✅ Tambahkan ini

const routes = {
  '/': BerandaPage,
  '/eksplorasi': EksplorasiPage,
  '/rekomendasi': RekomendasiPage,
  '/resep': ResepPage,
  '/tersimpan': TersimpanPage,
  '/profil': ProfilePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/premium': PremiumPage, // ✅ Tambahkan ini
};

const renderPage = async () => {
  const hash = window.location.hash.slice(1).toLowerCase() || '/';
  const page = routes[hash] || BerandaPage;
  document.getElementById('app').innerHTML = await page.render();
  if (page.afterRender) page.afterRender();
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);
