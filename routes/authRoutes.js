const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth'); // Pastikan path ini benar


const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', verifyToken, authController.getUserData); // Rute baru untuk mendapatkan data user
router.post('/career-break', verifyToken, authController.saveCareerBreak);
router.post('/career-break/results', verifyToken, authController.saveTestResults);
router.get('/user-profile', verifyToken, authController.getUserProfileData);

module.exports = router;