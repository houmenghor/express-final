require('dotenv').config();
const jwt = {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d'
}

module.exports = jwt;