import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import style from './Navbar.module.css';
import logo from '../../Assets/logo.jpg';
import profile from '../../Assets/profile.png';

const Navbar = () => {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') && localStorage.getItem("id"));
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    localStorage.clear()
    handelBurger();
  }

  return (
    <>
      <nav className={`${style.navbar} ${(burgerClicked)?(style.expandNav):('')}`}>
        <div className={`${style.logo} ${style.visible}`} onClick={handelBurgerByLogo}>
          <Link  to="/">
            <img src={logo} alt="Logo"/>
          </Link>
        </div>
        
        <ul className={`${style.navList} ${(!burgerClicked)?(style.hideVisibility):('')}`}>
        <hr className={style.line}></hr>
          <Link className={style.link} to="/" onClick={handelBurger}><li>Home</li></Link>
          <Link className={style.link} to="/loanRequests" onClick={handelBurger}><li>Loan Requests</li></Link>
          <Link className={style.link} to="/takeLoan" onClick={handelBurger}><li>Take Loan</li></Link>
          <Link className={style.link} to="/accountStatus" onClick={handelBurger}><li>Account Status</li></Link>
          {(isLoggedIn)?(<>
          {
            (isProfileCreated)?(
            <>
              <Link className={`${style.link} ${style.smallScreen}`} to="/profile" onClick={handelBurger}><li>Profile</li></Link>
              <Link className={`${style.link} ${style.smallScreen}`} to="/modifyProfile" onClick={handelBurger}><li>Update Profile</li></Link>
            </>):(
            <>
              <Link className={`${style.link} ${style.smallScreen}`} to="/createProfile" onClick={handelBurger}><li>Create Profile</li></Link>
            </>)
          }
          
          <Link className={`${style.link} ${style.smallScreen}`} to="/" onClick={handelLogout}><li>Logout</li></Link></>):(
          <Link className={`${style.link} ${style.smallScreen}`} to="/login" onClick={handelBurger}><li>Login</li></Link>)}

        </ul>
        <div className={`${style.profile} ${(!burgerClicked)?(style.hideVisibility):('')} ${style.bigScreen}`} onClick={handelClick}>
          {
            (isLoggedIn)?(
            <>
                <img src={profile} alt="Profile"/>
                <div className={`${style.select} ${(!isClicked)?(style.hide):('')}`}>
                  {(isProfileCreated)?(<><Link className={style.selectLink} to='/profile' onClick={handelBurger}>Profile</Link>
                  <Link className={style.selectLink} to='/modifyProfile' onClick={handelBurger}>Modify Profile</Link>
                  </>):(<><Link className={style.selectLink} to='/createProfile' onClick={handelBurger}>Create Profile</Link></>)}
                  <Link className={style.selectLink} to='/' onClick={handelLogout}>Logout</Link>
                </div>
            </>):(<>
              <Link to="/login"><button className={style.btnLogin}>Login</button></Link>
            </>)
          }
          </div>
        
        
        {(!burgerClicked)&&<div className={style.burger} onClick={handelBurger}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
        </div>}
        {(burgerClicked)&&<div className={`${style.close} ${style.smallScreen}`} onClick={handelBurger}></div>}
      </nav>
    </>
  );
}

export default Navbar;