import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import style from './Navbar.module.css';
import logo from '../../Assets/logo.jpg';
import profile from '../../Assets/profile.png';

const Navbar = () => {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileCreated, setIsProfileCreated] = useState(true);
  const handelBurger = () => {
    setBurgerClicked(!burgerClicked);
  }
  const handelClick = () => {
    setIsClicked(!isClicked);
  }
  const handelLogout = () => {
    setIsLoggedIn(false);
    setIsProfileCreated(false);
  }

  return (
    <>
      <nav className={`${style.navbar} ${(burgerClicked)?(style.expandNav):('')}`}>
        <ul className={`${style.navList} ${(!burgerClicked)?(style.hideVisibility):('')}`}>
            <div className={style.logo}>
              <Link className={style.link} to="/"><img src={logo} alt="Logo"/></Link>
            </div>
            <li><Link className={style.link} to="/">Home</Link></li>
            <li><Link className={style.link} to="/loanRequests">Loan Requests</Link></li>
            <li><Link className={style.link} to="/takeLoan">Take Loan</Link></li>
        </ul>
        <div className={`${style.profile} ${(!burgerClicked)?(style.hideVisibility):('')}`} onClick={handelClick}>
          <img src={profile} alt="Profile"/>
          <div className={`${style.select} ${(!isClicked)?(style.hide):('')}`}>
            {(isLoggedIn && isProfileCreated) && <Link className={style.selectLink} to='/profile'>Profile</Link>}
            {((isLoggedIn) && isProfileCreated)?((isLoggedIn) && <Link className={style.selectLink} to='/modifyProfile'>Modify Profile</Link>):(
               (isLoggedIn) && <Link className={style.selectLink} to='/createProfile'>Create Profile</Link>
            )}
            {(isLoggedIn)?(<Link className={style.selectLink} to='/' onClick={handelLogout}>Logout</Link>):(
              <Link className={style.selectLink} to='/login'>Login</Link>
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