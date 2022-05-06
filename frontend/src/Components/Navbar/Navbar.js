import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import style from './Navbar.module.css';
import logo from '../../Assets/logo.jpg';
import profile from '../../Assets/profile.png';

const Navbar = () => {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const handelBurger = () => {
    setBurgerClicked(!burgerClicked);
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
        <div className={`${style.profile} ${(!burgerClicked)?(style.hideVisibility):('')}`}>
            <Link className={style.link} to="/profile">
              <img src={profile} alt="Profile"/>
            </Link>
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