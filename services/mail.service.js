const resend = require('../config/mail.config');

// const transporter = require('../config/mail.config');
require('dotenv').config();

const sendOtpEmail = async (email, username, otpCode) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
                .otp { font-size: 32px; font-weight: bold; color: #4CAF50; letter-spacing: 5px; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Hello ${username},</h2>
                <p>Thank you for registering. Here is your verification code:</p>
                <div class="otp">${otpCode}</div>
                <p>This code will expire in 10 minutes. Please do not share it with anyone.</p>
            </div>
        </body>
        </html>
    `;

    // await transporter.sendMail({
    //     from: `My App <${process.env.SMTP_USER}>`,
    //     to: email,
    //     subject: 'Your Verification Code',
    //     html: htmlContent
    // });

    const { data, error } = await resend.emails.send({
        from: `My App <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Your Verification Code',
        html: htmlContent
    });
    if (error) {
        console.error('Resend Error:', error.message);
        throw new Error(error.message);
    }

    return data;
};

module.exports = { sendOtpEmail };