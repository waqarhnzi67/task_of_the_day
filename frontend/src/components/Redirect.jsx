import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            navigate('/dashboard')
        }
    },[navigate])
  return (
    <div>
      
    </div>
  )
}
