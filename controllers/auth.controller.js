const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const response = await authService.register(req.validate);
        return res.status(201).json({
            status: 'success',
            message: 'Registered successfully. Please check your email for the OTP.',
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

module.exports = {
    register
}