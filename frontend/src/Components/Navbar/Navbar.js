import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import style from './Navbar.module.css';
import logo from '../../Assets/logo.jpg';
import profile from '../../Assets/profile.png';

const Navbar = () => {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loginCredentials') || localStorage.getItem('singUpCredentials'));
  const [isProfileCreated, setIsProfileCreated] = useState(true);
  const handelBurger = () => {
    setBurgerClicked(!burgerClicked);
  }
  const handelBurgerByLogo = () => {
    setBurgerClicked(false);
  }
  const handelClick = () => {
    setIsClicked(!isClicked);
  }
  const handelLogout = () => {
    setIsLoggedIn(false);
    setIsProfileCreated(false);
    localStorage.removeItem('loginCredentials');
    localStorage.removeItem('signUpCredentials');
    handelBurger();
  }

  return (
    <>
      <nav className={`${style.navbar} ${(burgerClicked)?(style.expandNav):('')}`}>
        <div className={`${style.logo} ${style.visible}`} onClick={handelBurgerByLogo}>
          <Link className={style.link} to="/"><img src={logo} alt="Logo"/></Link>
        </div>
        <ul className={`${style.navList} ${(!burgerClicked)?(style.hideVisibility):('')}`}>
            <li><Link className={style.link} to="/" onClick={handelBurger}>Home</Link></li>
            <li><Link className={style.link} to="/loanRequests" onClick={handelBurger}>Loan Requests</Link></li>
            <li><Link className={style.link} to="/takeLoan" onClick={handelBurger}>Take Loan</Link></li>
            <li><Link className={style.link} to="/accountStatus" onClick={handelBurger}>Account Status</Link></li>
        </ul>
        <div className={`${style.profile} ${(!burgerClicked)?(style.hideVisibility):('')}`} onClick={handelClick}>
          <img src={profile} alt="Profile"/>
          <div className={`${style.select} ${(!isClicked)?(style.hide):('')}`}>
            {(isLoggedIn && isProfileCreated) && <Link className={style.selectLink} to='/profile' onClick={handelBurger}>Profile</Link>}
            {((isLoggedIn) && isProfileCreated)?((isLoggedIn) && <Link className={style.selectLink} to='/modifyProfile' onClick={handelBurger}>Modify Profile</Link>):(
               (isLoggedIn) && <Link className={style.selectLink} to='/createProfile' onClick={handelBurger}>Create Profile</Link>
            )}
            {(isLoggedIn)?(<Link className={style.selectLink} to='/' onClick={handelLogout}>Logout</Link>):(
              <Link className={style.selectLink} to='/login' onClick={handelBurger}>Login</Link>
            )}
          </div>
        </div>
        <div className={style.burger} onClick={handelBurger}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;