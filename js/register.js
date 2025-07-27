import { regURL } from "./url.js";

window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("registerForm");

  if (!form) {
    console.error("Form #registerForm tidak ditemukan.");
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const telfon = document.getElementById("telepon").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const password = document.getElementById("password").value;

    if (!nama || !email || !telfon || !alamat || !password) {
      alert("Semua field harus diisi.");
      return;
    }

    // if (!verifyPassword(password)) {
    //   alert("Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial.");
    //   return;
    // }

    const payload = {
      nama: nama,
      email: email,
      telfon: telfon,
      alamat: alamat,
      password: password
    };

    fetch(regURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal mendaftar. Silakan cek kembali data Anda.');
      }
      return response.json();
    })
    .then(data => {
      alert('Registrasi berhasil! Silakan login.');
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error('Error saat registrasi:', error);
      alert('Terjadi kesalahan saat registrasi.');
    });
  });
});

// function verifyPassword(password) {
//   const minLength = 8;
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);
//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
// }
