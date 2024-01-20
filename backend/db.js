const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(console.log("Connected Successful to Mongo!"))
        .catch(err => { console.log("Connection failed to Mongo!"); })
}

module.exports = connectToMongo