// models/CareerBreak.js
const db = require('../config/db');

const CareerBreak = {};

// Fungsi untuk menyimpan data career break ke dalam tabel career_break
CareerBreak.create = (careerData, callback) => {
  const sql = `INSERT INTO career_break (user_id, bidang_kerja, alasan_berhenti, bidang_kerja_menarik, keterampilan_dikembangkan, alasan_ingin_bekerja, durasi_jeda_karir, kegiatan_selama_jeda, pengalaman_selama_jeda, tujuan_karir) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    careerData.userId,
    careerData.bidangKerja,
    careerData.alasanBerhenti,
    careerData.bidangKerjaMenarik,
    careerData.keterampilanDikembangkan,
    careerData.alasanInginBekerja,
    careerData.durasiJedaKarir,
    careerData.kegiatanSelamaJeda,
    careerData.pengalamanSelamaJeda,
    careerData.tujuanKarir
  ], callback);
};

CareerBreak.updateScores = (userId, scores, callback) => {
    const sql = `
      UPDATE career_break
      SET extraversion = ?, openness = ?, agreeableness = ?, emotional_stability = ?, conscientiousness = ?
      WHERE user_id = ?
    `;
  
    db.query(sql, [
      scores.extraversion,
      scores.openness,
      scores.agreeableness,
      scores.emotionalStability,
      scores.conscientiousness,
      userId
    ], callback);
  };
  
  CareerBreak.findByUserId = (userId, callback) => {
    const sql = `
      SELECT 
        user_id, bidang_kerja, durasi_jeda_karir, tujuan_karir, 
        extraversion, openness, agreeableness, emotional_stability, conscientiousness 
      FROM career_break 
      WHERE user_id = ?`;
  
    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  };

module.exports = CareerBreak;
