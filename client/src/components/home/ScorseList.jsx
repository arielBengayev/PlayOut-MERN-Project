import { useState, useEffect } from "react"
import axios from "axios"

export default function ScoreList(){
    const [scores, setScores] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/getScores')
        .then(result => setScores(result.data))
        .catch(err => console.log(err))
    }, [])

    return (
      <div className="score-list">
        <h1>SCORES</h1><hr/>
        <ol>
          { scores.map((score, index) =>
            <li key={ index }>
              { score.name } - {score.time}
            </li>
          ) }
        </ol>
      </div>
    )
}