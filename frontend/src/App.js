import './App.css';
import Home from './container/home/Home';
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom'

import Login from './container/auth/login/Login'
import Signup from './container/auth/signup/Signup'
import Dashboard from './container/dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute';
import Redirect from './components/Redirect';

function App() {
  return (
    <div className='App'>
     {/* <Login /> */}
     <Router>
      <Routes>
        <Route path='/' element={<Redirect><Home/></Redirect>} />
        <Route path='/login' element={<Redirect><Login/></Redirect>}/>
        <Route path='/signup' element={<Redirect><Signup/></Redirect>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
