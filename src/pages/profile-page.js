// profile-page.js
const ProfilePage = {
  userProfile: JSON.parse(localStorage.getItem('currentUser')) || {
    username: '',
    email: ''
  },

  isEditing: false,

  render() {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ff6b6b, #ff8e53); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h1 style="text-align: center; color: white; margin-bottom: 30px; font-size: 2rem; font-weight: 300;">
            Profil Pengguna
          </h1>

          <form id="profileForm" style="background: white; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <div style="margin-bottom: 20px;">
              <label for="username" style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">Nama Pengguna</label>
              <input type="text" id="username" name="username" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; background-color: #f8f9fa; box-sizing: border-box;" readonly />
            </div>

            <div style="margin-bottom: 25px;">
              <label for="email" style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">Email</label>
              <input type="email" id="email" name="email" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; background-color: #f8f9fa; box-sizing: border-box;" readonly />
            </div>

            <button type="button" id="editButton" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">EDIT PROFILE</button>
            <div id="editActions" style="display: none;">
              <button type="submit" id="saveButton" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #ff6b6b, #ff8e53); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">SIMPAN PERUBAHAN</button>
              <button type="button" id="cancelButton" style="width: 100%; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">BATAL</button>
            </div>
          </form>

          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <button id="logoutButton" style="flex: 1; min-width: 120px; padding: 12px 20px; background: #dc3545; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;">LOGOUT</button>
            <button id="switchAccountButton" style="flex: 1; min-width: 150px; padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;">MASUK/DAFTAR AKUN LAIN</button>
          </div>
        </div>

        <div id="successMessage" style="display: none; margin-top: 20px; padding: 15px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 8px; text-align: center;">Profil berhasil diperbarui!</div>
        <div id="errorMessage" style="display: none; margin-top: 20px; padding: 15px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 8px; text-align: center;"></div>
      </div>
    `;
  },

  afterRender() {
    if (!localStorage.getItem('isLoggedIn')) {
      window.location.hash = '#/login';
      return;
    }

    const form = document.getElementById('profileForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const editButton = document.getElementById('editButton');
    const editActions = document.getElementById('editActions');
    const cancelButton = document.getElementById('cancelButton');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    usernameInput.value = this.userProfile.username;
    emailInput.value = this.userProfile.email;

    let originalValues = { ...this.userProfile };

    editButton.addEventListener('click', () => {
      this.isEditing = true;
      usernameInput.removeAttribute('readonly');
      emailInput.removeAttribute('readonly');
      editButton.style.display = 'none';
      editActions.style.display = 'block';
      usernameInput.focus();
    });

    cancelButton.addEventListener('click', () => {
      this.isEditing = false;
      usernameInput.value = originalValues.username;
      emailInput.value = originalValues.email;
      usernameInput.setAttribute('readonly', true);
      emailInput.setAttribute('readonly', true);
      editButton.style.display = 'block';
      editActions.style.display = 'none';
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.isEditing) return;

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();

      if (!username || !email) return this.showError('Semua field harus diisi!');
      if (!this.isValidEmail(email)) return this.showError('Format email tidak valid!');

      this.userProfile.username = username;
      this.userProfile.email = email;
      localStorage.setItem('currentUser', JSON.stringify(this.userProfile));

      usernameInput.setAttribute('readonly', true);
      emailInput.setAttribute('readonly', true);
      editButton.style.display = 'block';
      editActions.style.display = 'none';
      this.isEditing = false;
      this.showSuccess('Profil berhasil diperbarui!');
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      window.location.hash = '#/login';
    });

    document.getElementById('switchAccountButton').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      window.location.hash = '#/login';
    });
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => successMessage.style.display = 'none', 3000);
  },

  showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => errorMessage.style.display = 'none', 5000);
  }
};

export default ProfilePage;
