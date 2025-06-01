import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Task.css";
import Logo from '../../assets/logo.png'
// import axios from 'axios'

export default function Task() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);



useEffect(() => {
  const fetchTask = async () =>{
    try {
      const res = await axios.get('http://localhost:5000/api/tasks')
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching backend data!!")
    }
  };
  fetchTask();
})


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (!title || !title.trim()) {
        alert("Please fill the title");
        return;
      }
      if (!status) {
        alert("Please select an option");
        return;
      }
      if (!date) {
        alert("Please select date");
        return;
      } 


      const response = await axios.post('http://localhost:5000/api/tasks', {
        title, status, date
      });

      console.log('Task added:', response.data);

    // Optional: Clear form
      setTitle('');
      setStatus('');
      setDate('');
      
    } catch (error) {
      console.log("Frontend error: ", error);
    }
  };

  const handleDelete = async (id) =>{
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      console.log(response.data.message);

      if(!response.ok){
        throw new Error("Failed to delete task") 
      }
      setTasks(prev => prev.filter(task => task._id !== id));
      console.log("Task deleted");

    } catch (error) {
      
    }
    
    
  }
  

  return (
    <div className="task-container">
      <img src={Logo} alt="main-logo" />
      <form>
        <input className="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title.."
          autoFocus
          required
        />
        <select
          name="completed"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled selected>
            {" "}
            Status
          </option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not completed</option>
        </select>
        <input className="task-date" type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </form>

      <div className="task-list-main-container">
        <h4>List of Tasks..</h4>
        <table>
          <thead>
            <tr>
              <th className="task-list">Sr.No</th>
              <th>Task Title</th>
              <th className="task-status">Status</th>
              <th className="task-date">Date</th>
              <th className="task-actions">Actions</th>
            </tr>
          </thead>
          <tbody>

          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td className="centered-th">{index + 1}.</td>
              <td className="task-title">{task.title}</td>
              <td className="centered-th">{task.status}</td>
              <td className="centered-th">{new Date(task.date).toLocaleDateString("en-GB")}
              </td>
            <td className="centered-th delete" onClick={()=>handleDelete(task._id)}><span>Delete</span></td>
          </tr>
          ))}

            
          </tbody>
        </table>
      </div>
    </div>
  );
}
