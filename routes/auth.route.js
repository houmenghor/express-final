const express = require('express');
const router = express.Router();

const {
    register,
    verifyOtp,
    resendOtp,
    login,
    getProfile,
    logout,
    forgotPassword,
    verifyResetOtp,
    resetPassword
} = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema, verifyOtpSchema, resendOtpSchema, loginSchema, forgotPasswordSchema, verifyResetOtpSchema, resetPasswordSchema } = require('../validators/auth.validator');
const { isLogin } = require('../middleware/auth.middleware');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/resend-otp', validate(resendOtpSchema), resendOtp);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/verify-reset-otp', validate(verifyResetOtpSchema), verifyResetOtp);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

router.get('/me', isLogin, getProfile);
router.post('/logout', isLogin, logout);


module.exports = router;