const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const response = await authService.register(req.validate);
        return res.status(201).json({
            status: 'success',
            message: 'Registered successfully. Please check your mailbox or spam folder for the OTP.',
            data: response
        });
    } catch (error) {
        const statusCode = error.message.includes('already') ? 422 : 500;
        return res.status(statusCode).json({
            status: 'error',
            message: 'Register failed',
            error: error.message
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp_code } = req.validate;
        const response = await authService.verifyOtp(email, otp_code);
        return res.json({
            status: 'success',
            message: 'Account activated successfully',
            data: response
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'OTP verification failed',
            error: error.message
        });
    }
}

module.exports = {
    register,
    verifyOtp
}