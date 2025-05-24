// login-page.js
const LoginPage = {
  render() {
    return `
      <section class="login-section">
        <div class="login-container">
          <div class="login-card">
            <div class="login-image">
              <img src="https://img.freepik.com/vector-gratis/ilustracion-mujer-irani-dibujada-mano_23-2149857688.jpg">
            </div>
            <div class="login-form-container">
              <div class="login-header">
                <div class="login-form-container">
              <div class="login-header">
  <img src="images/logo.png" alt="Logo" class="login-logo" />
                <h2>Masuk ke Akun Anda</h2>
              </div>
              
              <form id="loginForm" class="login-form">
                <div class="form-group">
                  <input type="email" id="email" placeholder="Alamat Email" required />
                </div>
                <div class="form-group">
                  <input type="password" id="password" placeholder="Password" required />
                </div>
                <button type="submit" class="btn-masuk">Masuk</button>
              </form>
              
              <p class="auth-switch">Belum punya akun? <a href="#/register" id="registerLink">Daftar di sini</a></p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    this.loadCSS();
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        this.showNotification('Harap isi semua kolom.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.showNotification('Format email tidak valid!', 'error');
        return;
      }

      const savedUser = localStorage.getItem('userProfile');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email) {
          this.showNotification('Login berhasil! Selamat datang kembali.', 'success');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(user));
          setTimeout(() => {
            window.location.hash = '#/';
          }, 1500);
          return;
        }
      }

      this.showNotification('Email atau password salah!', 'error');
    });

    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/register';
    });

    const inputs = document.querySelectorAll('.login-form input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  },

  loadCSS() {
    if (!document.getElementById('login-styles')) {
      const style = document.createElement('style');
      style.id = 'login-styles';
      style.textContent = `/* CSS content dipisahkan ke file lain */`;
      document.head.appendChild(style);
    }
  },

  showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
};

export default LoginPage;
