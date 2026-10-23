const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userModel = require('../models/user.model');
const { sendOtpEmail } = require('./mail.service');

const generateOTP = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++)
        otp += characters.charAt(crypto.randomInt(characters.length));
    return otp;
};

const register = async (body) => {
    // check email exist 
    const checkEmail = await userModel.checkEmailExists(body.email);
    if (checkEmail) {
        throw new Error('User with this email already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const otpCode = generateOTP();
    const hashedOtpCode = await bcrypt.hash(otpCode, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // create user
    const user = await userModel.createUser({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        otp_code: hashedOtpCode,
        otp_expires_at: otpExpiresAt
    });

    await sendOtpEmail(body.email, body.username, otpCode);
    return user;
}

const verifyOtp = async (email, otpCode) => {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        throw new Error('User with this email does not exists');
    }

    if (user.is_active) {
        throw new Error('User is already activated');
    }

    const isOtpMatch = await bcrypt.compare(otpCode, user.otp_code);
    if (!isOtpMatch) {
        throw new Error('Invalid OTP code');
    } 

    if (new Date() > user.otp_expires_at) {
        throw new Error('OTP code has expired. Please request a new one.');
    }

    return await userModel.activateUser(email);
}
  
module.exports = {
    register,
    verifyOtp
}