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


  
module.exports = {
    register
}