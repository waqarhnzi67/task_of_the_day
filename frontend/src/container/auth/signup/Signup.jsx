import React, {useState, useEffect} from "react";
import axios from 'axios';
import Cap from "../../assets/mob.png";

export default function Signup() {

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('')
  const [popupMessage, setPopupMessage] = useState({ message: '', type: '' });


  useEffect(() => {

    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage('');
      }, 3000); // 3000ms = 3 seconds
  
      return () => clearTimeout(timer); // Clean up
    }
  }, [popupMessage]);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const validate_form = ()=>{
      if(!first_name || first_name.trim() ===''){
        setPopupMessage({message: "Enter your first name", type:"error"})
        return false;
      }if(!last_name || last_name.trim() ===''){
        setPopupMessage({message: "Enter your last name", type:"error"})
        return false
      }if(!email_address){
        setPopupMessage({message: "Enter a proper email address", type:"error"})
        return false;
      }if(!username || username.trim()===''){
        setPopupMessage({message: "Enter your username", type:"error"})
        return false
      }if(!gender){
        setPopupMessage({message: "Select your gender", type:"error"})
        return false
      }if(!date_of_birth){
        setPopupMessage({message: "Please enter your DOB", type:"error"})
        return false;
      }if(!password || password.trim() === ''){
        setPopupMessage({message: "Set a password", type:"error"})
        return false
      }if(!confirm_password){
        setPopupMessage({message: "Please enter the confirm password", type:"error"})
        return false
      }if(password !== confirm_password){
        setPopupMessage({message: "Confirm password is not matched", type:"error"})
        return false
      }
      return true;
    }

    
    const data = {first_name, last_name, email_address, username, gender, date_of_birth, password}
    if (!validate_form()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/signup', data)

      setPopupMessage({ message: response.data.message, type: 'success' });

        setFirstName('')
        setLastName('')
        setEmailAddress('');
        setUsername('');
        setGender('')
        setDateOfBirth('')
        setPassword('')
        setConfirmPassword('')

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // alert(error.response.data.message); // show error from backend 
        setPopupMessage({ message: error.response.data.message, type: 'error' });
      } else {
        console.error("Frontend error:", error);
      }
    }


    
  }

  return (
    <div className="signup-container">
        {popupMessage && (
          <div className={`popup-message ${popupMessage.type}`}>
            {popupMessage.message}
          </div>
        )}
      <div className="signup-form">
      <h4>Signup</h4>
        <form onSubmit={handleSubmit}>
          <div id="first-second">
            <input value={first_name} type="text" placeholder="Charles" onChange={(e)=>setFirstName(e.target.value)}/>
            <input value={last_name} type="text" placeholder="Lee" onChange={(e)=>setLastName(e.target.value)}/>
          </div>
          <div>
            <input value={email_address} type="email" placeholder="xyz@example.com" onChange={(e)=>setEmailAddress(e.target.value)}/>
            <input value={username} type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="divider">
            <div>
              <label htmlFor="">Gender</label>
              <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="" disabled>
                  Choose
                </option>
                <option name="male" value="male">Male</option>
                <option name="female" value="female">Female</option>
                <option name="none" value="none">None</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Birth</label>
              <input value={date_of_birth} type="date" name="" onChange={(e)=>setDateOfBirth(e.target.value)}/>
            </div>
          </div>
          <div>
              <input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
              <input value={confirm_password} type="password" placeholder="Confirm" onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>
          <div className="signup-btn">
            <button type="submit">Signup</button>
          </div>
          <div className="already-have">
            <span><a href="/login">Already have an account?</a></span>
          </div>
        </form>
      </div>
      <div>
        <img src={Cap} alt="banner" />
      </div>
    </div>
  );
}
