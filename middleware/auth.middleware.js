const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const isLogin = (req, res, next) => {
    // 1. check header from requst 
    const authHeader = req.headers.authorization;

    // 2. check header have token or not
    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }

    // 3. catch only token from header
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }
}

module.exports = {
    isLogin
}