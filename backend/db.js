const mongoose = require('mongoose')
const mongoURI = "mongodb://0.0.0.0/iNoteBook"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(console.log("Connected Successful to Mongo!"))
        .catch(err => { console.log("Connection failed to Mongo!", err); })
}

module.exports = connectToMongo