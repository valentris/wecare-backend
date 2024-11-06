const User = require('../models/User');
const CareerBreak = require('../models/CareerBreak');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registering user', error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.getUserData = (req, res) => {
    User.findById(req.userId, (err, results) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).json({ message: 'Error fetching user data', error: err });
      }
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
  
      // Konversi tanggal lahir ke zona waktu lokal
      const userData = {
        namaLengkap: results[0].namaLengkap,
      email: results[0].email,
      alamat: results[0].alamat,
      nomorTelepon: results[0].nomorTelepon,
        ...results[0],
        tanggalLahir: results[0].tanggalLahir
          ? new Date(results[0].tanggalLahir).toLocaleDateString('en-CA') // Format 'YYYY-MM-DD'
          : null,
      };
  
      res.status(200).json(userData);
    });
  };
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error finding user', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords', error: err });
      if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

      const token = jwt.sign({ id: user.id, level_user: user.level_user }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, nama_lengkap: user.nama_lengkap, email: user.email, level_user: user.level_user },
      });
    });
  });
};

exports.saveCareerBreak = (req, res) => {
  const careerData = {
    userId: req.userId, // Dapatkan ID pengguna dari token
    ...req.body // Ambil data dari body permintaan
  };

  CareerBreak.create(careerData, (err, result) => {
    if (err) {
      console.error("Error saving career break data:", err);
      return res.status(500).json({ message: 'Error saving career break data', error: err });
    }
    res.status(201).json({ message: 'Career break data saved successfully' });
  });
};

exports.saveTestResults = (req, res) => {
  const { scores } = req.body; // Ambil skor dari body permintaan
  const userId = req.userId; // Dapatkan ID pengguna dari token

  CareerBreak.updateScores(userId, scores, (err, result) => {
    if (err) {
      console.error("Error saving test results:", err);
      return res.status(500).json({ message: 'Error saving test results', error: err });
    }
    res.status(200).json({ message: 'Test results saved successfully' });
  });
};


exports.getUserProfileData = (req, res) => {
  const userId = req.userId;
  console.log("User ID:", userId);

  CareerBreak.findByUserId(userId, (err, careerData) => {
    if (err) {
      console.error("Error fetching career break data:", err);
      return res.status(500).json({ message: 'Error fetching career break data', error: err });
    }
    if (!careerData) {
      return res.status(404).json({ message: 'Career data not found' });
    }

    console.log("Career Data:", careerData);
    res.status(200).json(careerData);
  });
};