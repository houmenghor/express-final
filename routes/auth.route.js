const express = require('express');
const router = express.Router();

const {
    register,
    verifyOtp
} = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema, verifyOtpSchema } = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);


module.exports = router;