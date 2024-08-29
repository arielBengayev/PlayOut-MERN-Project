const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/user')
const ScoreModel = require('./models/score')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

const port = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

mongoose.connect(process.env.DataBase_URL)

async function authenticateUser(username, password) {
  try {
    const user = await UserModel.findOne({ username: username })
    if(user && await bcrypt.compare(password, user.password))
      return true
    else return false
  } catch (err) { 
    return false 
  }
}

app.post('/login', async (req, res) => {
  const user = req.body
  const isAuthenticated = await authenticateUser(user.username, user.password)
  res.json({ success: isAuthenticated })
})

const findUser = async (username, email) => {
  try {
    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }]
    })
    return {
      usernameExists: user && user.username === username,
      emailExists: user && user.email === email,
    }
  } catch (err) {
    return { usernameExists: false, emailExists: false }
  }
}

app.post('/signUp', async (req, res) => {
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

app.get('/getScores', async (req, res) => {
  try{
    const scores = await ScoreModel.find().sort({ time: 1 }).limit(10)
    res.json(scores)
  } catch (err) { 
      res.status(500).json({ message: "Internal server error" }) 
  }
})

const isUserAppears = async (score) => {
  try{
  const isAppears = await ScoreModel.findOne({ username: score.username })
  if (isAppears) {
    if(isAppears.time > score.time){
      const result = await ScoreModel.updateOne(
        { username: score.username }, 
        { time: score.time }
      )
      return result
    }
  } else {
    const result = await ScoreModel.create(score)
    return result
  }
  } catch (err) { 
    res.status(500).json({ message: "Internal server error" }) 
  }
}

app.post('/addScore', async (req, res) => {
    const score = req.body
    const result = isUserAppears(score)
      res.json(result)
})

app.listen(port, () => { console.log("Server is running") })