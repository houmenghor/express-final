const express = require('express');
const router = express.Router();

const {
    register,
    verifyOtp,
    resendOtp,
    login,
    getProfile
} = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema, verifyOtpSchema, resendOtpSchema, loginSchema } = require('../validators/auth.validator');
const { isLogin } = require('../middleware/auth.middleware');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/resend-otp', validate(resendOtpSchema), resendOtp);

router.get('/me', isLogin, getProfile);


module.exports = router;