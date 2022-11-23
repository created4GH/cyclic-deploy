const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log('verifyJWT')
    const token = req.cookies?.jwt;
    try {
        console.log('token', token)
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('jwt', process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        res.sendStatus(401);
    }
};

module.exports = verifyJWT;