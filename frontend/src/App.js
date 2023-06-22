import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import styles from './App.module.css';
import Navbar from './Components/Navbar/Navbar.js';
import Home from './Components/Home/Home.js';
import LoanRequests from './Components/LoanRequests/LoanRequests.js';
import TakeLoan from './Components/TakeLoan/TakeLoan.js';
import Profile from './Components/Profile/Profile.js';
import PublicProfile from './Components/Profile/PublicProfile.js';
// import CreateProfile from './Components/Profile/CreateProfile.js';
import ModifyProfile from './Components/Profile/ModifyProfile.js';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy.js';
import LoanPolicy from './Components/LoanPolicy/LoanPolicy.js';
import AccountStatus from './Components/AccountStatus/AccountStatus.js';
import Login from './Components/LoginSignUp/Login';
import SignUp from './Components/LoginSignUp/SignUp';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.js';
import Footer from "./Components/Footer/Footer.js";
import NotFound from "./Components/NotFound/NotFound";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/Contactus/ContactUs";

function App() {
  return (
    <>
      <Router>
        <div className={styles.container}>
          <Navbar/>
          <Routes>
            <Route exact path = '/' element={<Home/>}/>
            <Route exact path = '/aboutus' element={<AboutUs/>}/>
            <Route exact path = '/contactus' element={<ContactUs/>}/>
            <Route exact path = '/loanRequests' element={<LoanRequests/>}/>
            <Route exact path = '/takeLoan' element={<TakeLoan/>}/>
            <Route exact path = '/profile' element={<Profile/>}/>
            <Route exact path = '/publicProfile/:customerId' element={<PublicProfile/>}/>
            {/* <Route exact path = '/createProfile' element={<CreateProfile/>}/> */}
            <Route exact path = '/modifyProfile' element={<ModifyProfile/>}/>
            <Route exact path = '/privacyPolicy' element={<PrivacyPolicy/>}/>
            <Route exact path = '/loanPolicy' element={<LoanPolicy/>}/>
            <Route exact path = '/accountStatus' element={<AccountStatus/>}/>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/signUp' element={<SignUp/>}></Route>
            <Route exact path='/forgetPassword' element={<ForgetPassword/>}></Route>
            <Route exact path='*' element={<NotFound/>}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
}

export default App;