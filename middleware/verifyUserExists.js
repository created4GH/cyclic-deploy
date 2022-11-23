const User = require('../models/user');

const verifyUserExists = async (req, res, next) => {
    console.log('verify user')
    try {
    console.log('username')
        const { username } = req.user;
        console.log('username', username);
        const user = await User.findOne({ username });
        console.log('user', user);
        if (!user) return res.status(404).json('No such a user');
        req.user = user;
        next();
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports = verifyUserExists;