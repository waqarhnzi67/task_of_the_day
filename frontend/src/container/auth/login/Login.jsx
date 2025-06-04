import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import Cap from "../../assets/mob.png";


export default function Login() {

  const [emailUsername, setEmailUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ message: '', type: '' });
  const navigate = useNavigate();


  useEffect(() => {

      if (popupMessage) {
        const timer = setTimeout(() => {
          setPopupMessage('');
        }, 3000); // 3000ms = 3 seconds
    
        return () => clearTimeout(timer); // Clean up
      }
    }, [popupMessage]);



  const handleSubmit = async (e) => {
    e.preventDefault();


    const formValidate = () =>{
      if(!emailUsername || emailUsername.trim() ===''){
        setPopupMessage({message: "Please enter our email address or username", type:"error"})
        return false
      }
      if(!password || password.trim()===''){
        setPopupMessage({message: "Please enter your password", type:"error"})
        return false
      }
      return true;
    }
    if(!formValidate()) return;

    try {
      const userData = {emailUsername, password}
      const response = await axios.post('http://localhost:5000/api/login', userData)


      if (response.status === 200) {
        setPopupMessage({message: response.data.message, type:"success"})
        localStorage.setItem('token', response.data.token);

        const token = localStorage.getItem("token")
        const decode = jwtDecode(token)
        console.log(decode);
        

        setTimeout(()=>{
          navigate("/dashboard")
        }, 2000)
      }


    } catch (error) {
      if (error.response?.data?.message) {
        setPopupMessage({message: error.response.data.message, type:"error"})
      } else {
        setPopupMessage({message: "An unexpected error occurred", type:"error"})

      }  
    }
    
  }


  return (
    <div className="login-container">
      <div>
        <img src={Cap} alt="banner" />
      </div> 
      <div>
        {
          popupMessage && (
            <div className={`popup-message ${popupMessage.type}`}>
            {popupMessage.message}
          </div>
          )
        }
        <form onSubmit={handleSubmit} className="login">
        <h4>Login</h4>
          <label>Email/username:</label>
          <input type={"text" || "email"} value={emailUsername} onChange={(e)=>setEmailUsername(e.target.value)} />
          <label>
            Password:
          <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/>
          </label>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)}/>   
          <span><a className="forget" href="/#">Forget password?</a></span>   
          <button type="submit">Login</button>
          <a className="dont-have" href="/signup">Don't have account? Signup</a>
        </form>
      </div>
    </div>
  );
}
