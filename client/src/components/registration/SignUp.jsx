import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './registration.css'

export default function SignUp(){
    const [user, setUser] = useState({email: "", name: "", password: ""})
    const [users, setUsers] = useState([])
    const [correctEmail, setCorrectEmail] = useState({correct: true, exist: false})
    const [correctUsername, setCorrectUsername] = useState({correct: true, exist: false})
    const [correctPassword, setCorrectPassword] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEmail = (e) => {setUser({...user, email: e.target.value})}
    const handleName = (e) => {setUser({...user, name: e.target.value})}
    const handlePassword = (e) => {setUser({...user, password: e.target.value})}

    const isEmailCorrect = () => {
        if(!user.email.includes('@') || !user.email.includes('.')){
            setCorrectEmail({...correctEmail, correct: false})
            return false
        } 
        if(users.find(u => {
            if(u.email === user.email){  
                setCorrectEmail({...correctEmail, exist: true})
                return true
            }
            })) return false
        return true
    }

    const isUsernameCorrect = () => {
        if(user.name.trim() === "" || user.name.length < 2){
            setCorrectUsername({...correctUsername, correct: false})
            return false
        }
        if(users.find(u => {
            if(u.name === user.name){ 
                setCorrectUsername({...correctUsername, exist: true})
                return true
            }
            })) return false
         return true
    }

    const isPasswordCorrect = () => {
        if(!/\d/.test(user.password) || user.password.length < 8){
            setCorrectPassword(false)
            return false
        } 
        return true
    }

    const addUser = () => {
        if(isEmailCorrect() && isUsernameCorrect() && isPasswordCorrect()){
            axios.post('http://localhost:3001/add', user)
            .then(result => console.log(result))
            .catch(err => console.log(err))
            return true
        }
        return false
    }

    const handleSignUn = (e) => {
        e.preventDefault()
        if(addUser()) navigate('/home')
    }

    return(
        <div className='registration'>
            <h1 className='main-title'> welcom to<br/> play out</h1>
            <div className="main-container">
                <h1 className='title'>Sign Up</h1>
                <input type="email" placeholder="Email" value={user.email} onChange={handleEmail}/>
                {!correctEmail.correct && <label className='incorrect'>incorrect email</label>}
                {correctEmail.exist && <label className='incorrect'>email already exists</label>}
                <input type="text" placeholder="Username" value={user.name} onChange={handleName}/>
                {correctUsername.exist && <label className='incorrect'>username already exists</label>}
                {!correctUsername.correct && <label className='incorrect'>please choose a username</label>}
                <input type="password" placeholder="Password" value={user.password} onChange={handlePassword}/>
                {!correctPassword && <label className='incorrect'>min 8 char, including numbers</label>}
                <button onClick={handleSignUn}>Sign Un</button>
            </div>
        </div>
    )
}