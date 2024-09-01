const ScoreModel = require('../models/score')

const addNewScore = async (score) => {
  try{
  const newScore = await ScoreModel.findOne({ username: score.username })
  if (newScore) {
    if(newScore.time > score.time){
      await ScoreModel.updateOne(
        { username: score.username }, 
        { time: score.time }
      )
    }
  } else { await ScoreModel.create(score) }
  } catch (err) { 
    res.status(500).json({ message: "Internal server error" }) 
  }
}

module.exports = { addNewScore }  