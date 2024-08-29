import { Link } from "react-router-dom"
import { homePage } from "../../Const"
import { notFound } from "./Const"

export default function NotFoundPage(){
  
  return(
    <div className="not-found"> 
      { notFound } <Link to={ homePage }>Home</Link>
    </div>
  )
}