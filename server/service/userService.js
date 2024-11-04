const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const authenticateUser = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username: username })
    if(user && await bcrypt.compare(password, user.password))
      return true
    else return false
  } catch (err) { 
      return false 
  }
}

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
      return { usernameExists: true, emailExists: true }
  }
}

module.exports = { authenticateUser, findUser }