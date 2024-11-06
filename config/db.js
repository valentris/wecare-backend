const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
 host: 'sql.freedb.tech', // Hanya untuk debugging, jangan push ke GitHub
  user: 'freedb_root_wecare',
  password: '2AY$N!NfdjHDj72',
  database: 'freedb_backend-wecare',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;
