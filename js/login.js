import { authURL } from "./url.js";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('loginForm');

  if (!form) {
    console.error("Form loginForm tidak ditemukan di DOM.");
    return;
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const passkey = document.getElementById('passkey').value;

    if (!email || !passkey) {
      alert("Email dan password harus diisi.");
      return;
    }

    const payload = {
      email: email,
      password: passkey
    };

    fetch(authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login gagal. Cek email atau password.');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('iss_token', data.token);
        localStorage.setItem('userEmail', email);
        window.location.href = 'https://sampahkudev.github.io/dashboard';
      } else {
        alert('Login gagal: ' + (data.message || 'Token tidak ditemukan'));
      }
    })
    .catch(error => {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan saat login.');
    });
  });
});
