const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.mongoURI;

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(console.log("Connected Successful to Mongo!"))
        .catch(err => { console.log("Connection failed to Mongo!", err); })
}

module.exports = connectToMongo 