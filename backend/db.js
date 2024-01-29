const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://kawaledeep9:AFISSJaDSA9tacH2@inotebook.rimwswq.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(console.log("Connected Successful to Mongo!"))
        .catch(err => { console.log("Connection failed to Mongo!", err); })
}

module.exports = connectToMongo