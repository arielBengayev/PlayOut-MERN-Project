const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/user')

const app = express()
app.use(cors())
app.use(express.json())

const dbUrl = 'mongodb+srv://ariel:ariel123@ariel.6sfuhu5.mongodb.net/PlayOut?retryWrites=true&w=majority&appName=ariel'
mongoose.connect(dbUrl)

app.get('/get', (req, res) => {
    UserModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post('/add', (req, res) => {
    const user = req.body
    UserModel.create(user)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.listen(3001, () => {console.log("Server is running")})