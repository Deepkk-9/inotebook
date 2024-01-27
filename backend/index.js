const connectToMongo = require('./db')
const express = require('express')
let cors = require('cors')

connectToMongo()

const app = express()
app.use(cors({
    origin: "*"
}));

const port = 5000

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`Backend Listining at port ${port}`);
})

