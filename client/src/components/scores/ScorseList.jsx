import { useState, useEffect } from "react"
import axios from "axios"
import { port } from "../Const"
import { getScores, listTitle } from "./Const"

export default function ScoreList(){
  const [scores, setScores] = useState([])
console
  const fetchData = async () => {
    try {
      const result = await axios.get(`${ port }${ getScores }`)
      setScores(result.data)
    } catch (err) { return err }
  }

  useEffect(() => { fetchData() }, [scores])

  return (
    <div className="score-list">
      <h1>{ listTitle }</h1><hr className="line"/>
      <ol>
        { scores.map((score, index) =>
          <li key={ index }>
            { score.username } - { score.time }
          </li>
        ) }
      </ol>
    </div>
  )
}