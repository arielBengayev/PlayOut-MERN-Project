const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/user')
const ScoreModel = require('./models/score')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

const { login, signUp, getScores, addScore, port }  = require('./const')
const { addNewScore } = require('./service/addScoreService')
const { authenticateUser, findUser } = require('./service/userService')

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

mongoose.connect(process.env.DataBase_URL)

app.post(login, async (req, res) => {
  const user = req.body
  const isAuthenticated = await authenticateUser(user.username, user.password)
  res.json({ success: isAuthenticated })
})

app.post(signUp, async (req, res) => {
  try {
    const user = req.body;
    const { usernameExists, emailExists } = await findUser(user.username, user.email)
    if (usernameExists || emailExists) {
      return res.json({ usernameExists, emailExists })
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    const result = await UserModel.create(user)
    res.json({ success: !!result })
  } catch (err) {
      res.status(500).json({ message: "Internal server error" })
  }
})

app.get(getScores, async (req, res) => {
  try{
    const scores = await ScoreModel.find().sort({ time: 1 }).limit(10)
    res.json(scores)
  } catch (err) { 
      res.status(500).json({ message: "Internal server error" }) 
  }
})

app.post(addScore, async (req, res) => {
    const score = req.body
    addNewScore(score)
})

app.listen(port, () => { console.log("Server is running") })