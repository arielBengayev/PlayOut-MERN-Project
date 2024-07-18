import { Link } from "react-router-dom"

export default function NotFoundPage(){
    return(
        <div className="not-found"> 
            { `404 Not Found => ` }
            <Link to='/home'>Home</Link>
        </div>
    )
}