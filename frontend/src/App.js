import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css';
import Navbar from './Components/Navbar/Navbar.js';
import Home from './Components/Home/Home.js';
import LoanRequests from './Components/LoanRequests/LoanRequests.js';
import TakeLoan from './Components/TakeLoan/TakeLoan.js';
import Profile from './Components/Profile/Profile.js';

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path = '/' element={<Home/>}/>
          <Route exact path = '/loanRequests' element={<LoanRequests/>}/>
          <Route exact path = '/takeLoan' element={<TakeLoan/>}/>
          <Route exact path = '/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;