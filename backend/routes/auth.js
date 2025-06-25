const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth, authLimiter } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// Public routes
router.post('/register', authLimiter, validate('userRegister'), authController.register);
router.post('/login', authLimiter, validate('userLogin'), authController.login);
router.post('/forgot-password', authLimiter, validate('userLogin'), authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);

// Protected routes
router.get('/me', auth, authController.getMe);
router.put('/profile', auth, validate('userUpdate'), authController.updateProfile);
router.put('/change-password', auth, authController.changePassword);
router.post('/logout', auth, authController.logout);
router.post('/refresh', auth, authController.refreshToken);

module.exports = router; 