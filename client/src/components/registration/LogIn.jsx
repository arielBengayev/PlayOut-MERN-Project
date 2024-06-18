import { useState, useEffect } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
// import { CiUser, CiLock } from "react-icons/ci"
import './registration.css'

export default function LogIn(){
    const [user, setUser] = useState({name: "", password: ""})
    const [users, setUsers] = useState([])
    const [path, setPath] = useState(false)
    const [correct, setCorrect] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleName = (e) => {setUser({...user, name: e.target.value})}
    const handlePassword = (e) => {setUser({...user, password: e.target.value})}

    const handleSignIn = (e) => {
        e.preventDefault()
        users.map(u => u.name === user.name && u.password === user.password ? 
            navigate('/home') : setCorrect(false))  
    }

    return(
        <div className='registration'>
            <h1 className='main-title'> welcom to<br/> play out</h1>
            <div className="main-container">
                <h1 className='title'>login</h1>
                <input type="text" placeholder="Username" value={user.name} onChange={handleName}/>
                {!correct && <label className='incorrect'>incorrect password or user name</label>}
                <input type="password" placeholder="Password" value={user.password} onChange={handlePassword}/>
                <NavLink to='/reset' className='forgat-password'>Forgat Password?</NavLink>
                <button  onClick={handleSignIn}>Login</button>
                <label className='new-member'>new member? <NavLink to='/signUp' className='sign-up'>Sign Up</NavLink></label>
            </div>  
        </div>
    )
}