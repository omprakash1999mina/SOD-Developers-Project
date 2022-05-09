import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import styles from './App.module.css';
import Navbar from './Components/Navbar/Navbar.js';
import Home from './Components/Home/Home.js';
import LoanRequests from './Components/LoanRequests/LoanRequests.js';
import TakeLoan from './Components/TakeLoan/TakeLoan.js';
import Profile from './Components/Profile/Profile.js';
import PublicProfile from './Components/Profile/PublicProfile.js';
import CreateProfile from './Components/Profile/CreateProfile.js';
import ModifyProfile from './Components/Profile/ModifyProfile.js';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy.js';
import LoanPolicy from './Components/LoanPolicy/LoanPolicy.js';
import Login from './Components/LoginSignIn/Login';
import SignIp from './Components/LoginSignIn/SignIn';
import Footer from "./Components/Footer/Footer.js";

function App() {
  return (
    <>
      <Router>
        <div className={styles.container}>
          <Navbar></Navbar>
          <Routes>
            <Route exact path = '/' element={<Home/>}/>
            <Route exact path = '/loanRequests' element={<LoanRequests/>}/>
            <Route exact path = '/takeLoan' element={<TakeLoan/>}/>
            <Route exact path = '/profile' element={<Profile/>}/>
            <Route exact path = '/publicProfile' element={<PublicProfile/>}/>
            <Route exact path = '/createProfile' element={<CreateProfile/>}/>
            <Route exact path = '/modifyProfile' element={<ModifyProfile/>}/>
            <Route exact path = '/privacyPolicy' element={<PrivacyPolicy/>}/>
            <Route exact path = '/loanPolicy' element={<LoanPolicy/>}/>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/signIn' element={<SignIp/>}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
}

export default App;