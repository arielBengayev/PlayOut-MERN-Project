const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config()

const sendEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    if(!!user){
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
      user.resetCode = resetCode
      user.resetCodeExpires = Date.now() + 15 * 60 * 1000
      await user.save()

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Gmail,
          pass: process.env.Gmail_Password
        }
      })
      
      var mailOptions = {
        from: process.env.Gmail,
        to: email,
        subject: 'Reset Password Code',
        text: `Your reset code is: ${resetCode}`
      }
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }
    return !!user
  }

  const verification = async (email, code) => {

      const user = await UserModel.findOne({ email: email })
      const response = user.resetCode === code && user.resetCodeExpires > Date.now()
      return response

  }

  const passwordChange = async (email, newPassword) => {
    const user = await UserModel.findOne({ email: email })
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.resetCode = undefined
    await user.save()
  }
  
  module.exports = { sendEmail, verification, passwordChange }