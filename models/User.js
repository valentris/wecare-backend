const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

// Membuat user baru
User.create = (userData, callback) => {
  const sql = `INSERT INTO users (nama_lengkap, email, phone, alamat, jenis_kelamin, tanggal_lahir, status_pernikahan, jumlah_anak, password, jenis_akun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  bcrypt.hash(userData.password, 10, (err, hash) => {
    if (err) callback(err, null);
    db.query(sql, [
      userData.nama_lengkap,
      userData.email,
      userData.phone,
      userData.alamat,
      userData.jenis_kelamin,
      userData.tanggal_lahir,
      userData.status_pernikahan,
      userData.jumlah_anak,
      hash,
      userData.jenis_akun
    ], callback);
  });
};

// Mencari user berdasarkan email
User.findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

User.findById = (id, callback) => {
    console.log("Finding user by ID:", id); // Log ID untuk verifikasi
    const sql = 'SELECT nama_lengkap AS namaLengkap, tanggal_lahir AS tanggalLahir, jenis_kelamin AS jenisKelamin, status_pernikahan AS status, jumlah_anak AS jumlahAnak,email, alamat, phone AS nomorTelepon FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  };

module.exports = User;