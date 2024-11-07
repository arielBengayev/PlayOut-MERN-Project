import { useState, useEffect } from "react"
import axios from "axios"
import { port } from "../Const"
import { getScores, listTitle } from "./Const"

export default function LeaderBoard(){
  const [scores, setScores] = useState([])

  const fetchData = async () => {
    try {
      const result = await axios.get(`${ port }${ getScores }`)
      setScores(result.data)
    } catch (err) { return err }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="leader-board">
      <h1>{ listTitle }</h1><hr className="line"/>
      <ol>
        { scores.map((score, index) =>
          <li key={ index }  className={ index !== 9? "with-line" : "no-line" }>
            { `${ score.username } --> ${ score.time }` }
          </li>
        ) }
      </ol>
    </div>
  )
}