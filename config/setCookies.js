const jwt = require('jsonwebtoken');

const setCookies = (res, user) => {
    const token = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    );
    res.cookie('jwt', token, { httpOnly: true, expires: new Date(Date.now() + 30 * 60 * 1000) });
};

module.exports = setCookies;


