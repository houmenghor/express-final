const pool = require('../config/db.config');

const checkEmailExists = async (email) => {
    const query = 'SELECT email FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows.length > 0;
}

const createUser = async (body) => {
    const query = `INSERT INTO users (username, email, password, otp_code, otp_expires_at)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [body.username, body.email, body.password, body.otp_code, body.otp_expires_at];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const activateUser = async (email) => {
    const query = `UPDATE users SET is_active = true, otp_code = NULL, otp_expires_at = NULL WHERE email = $1
    RETURNING id, username, email, is_active, profile_image`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const getUserByEmail = async (email) => {
    const query = 'SELECT id ,username ,email, is_active, password, otp_code, otp_expires_at FROM users WHERE email = $1';
    const value = [email];
    const result = await pool.query(query, value);
    return result.rows[0];
}

const updateOtpCode = async (email, otpCode, otpExpiresAt) => {
    const query = `UPDATE users SET otp_code = $1, otp_expires_at = $2 WHERE email = $3`;
    const values = [otpCode, otpExpiresAt, email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const GetUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const value = [id];
    const result = await pool.query(query, value);
    return result.rows[0];
}

const updatePassword = async (email, newPassword) => {
    const query = `UPDATE users SET password = $1, otp_code = NULL, otp_expires_at = NULL
        WHERE email = $2 RETURNING id, username, email, is_active, profile_image`;
    const values = [newPassword, email];
    const result = await pool.query(query, values);
    return result.rows[0];
}
 
module.exports = {
    checkEmailExists,
    createUser,
    activateUser,
    GetUserById,
    getUserByEmail,
    updateOtpCode,
    updatePassword
}