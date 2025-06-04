import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }
  return (
    <div className='dashboard'>
     <div><h1>Welcome to Dashboard!</h1></div>
     <div>
     <button type='button' onClick={handleLogout}>Logout</button>
     </div>
    </div>
  )
}
