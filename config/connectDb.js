const mongoose = require('mongoose');

const {errorHandler} = require('../middleware/errorHandler');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = connectDB;