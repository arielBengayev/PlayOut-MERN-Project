const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/user')
const ScoreModel = require('./models/score')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

const { login, signUp, getScores, addScore, port, resetPassword, verifyCode, resetPasswordConfirm }  = require('./const')
const { addNewScore } = require('./service/addScoreService')
const { authenticateUser, findUser } = require('./service/userService')
const { sendEmail, verification, passwordChange } = require('./service/resetPasswordService')

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
    const user = req.body
    const { usernameExists, emailExists } = await findUser(user.username, user.email)
    if (usernameExists || emailExists) {
      return res.json({ usernameExists, emailExists })
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    const newUser = await UserModel.create(user)
    res.json({ success: !!newUser })
  } catch (err) {
      res.status(500).json({ message: "Internal server error" })
  }
})

app.post(resetPassword, async (req, res) => {
  try{
    const { email } = req.body
    const user = await sendEmail(email)
    res.json({ success: user })
  } catch (err) { 
      res.status(500).json({ message: "Internal server error" }) 
   }
})

app.post(verifyCode, async (req, res) => {
  try {
    const { email, code } = req.body
    const response = await verification(email, code)
    res.json({ success: response })
  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
})

app.post(resetPasswordConfirm, async (req, res) => {
  try {
    const { email, newPassword } = req.body
    await passwordChange(email, newPassword)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false })
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