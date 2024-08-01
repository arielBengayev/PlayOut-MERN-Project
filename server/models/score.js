const mongoose = require('mongoose')
const ScoreSchema = new mongoose.Schema({ 
    name: String, 
    time: String 
})
const ScoreModel = mongoose.model("scores", ScoreSchema)
module.exports = ScoreModel