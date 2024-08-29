const mongoose = require('mongoose')
const ScoreSchema = new mongoose.Schema({ 
    username: String, 
    time: String 
})
const ScoreModel = mongoose.model("scores", ScoreSchema)
module.exports = ScoreModel