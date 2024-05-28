const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./logger');
dotenv.config();

const connectDB = () => {
    // @ts-ignore
    // mongoose.connect(process.env.MONGO_URI, () => {
    //     logger.info("Connected to Mongo Successfully");
    // })
    mongoose.connect('mongodb+srv://yashmangal:yashmangal123@cluster0.vhdxjpj.mongodb.net/LGBTQ', () => {
        logger.info("Connected to Mongo Successfully");
    })
}
module.exports = connectDB;