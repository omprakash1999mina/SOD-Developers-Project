import React from 'react';
import {Link} from 'react-router-dom';

import style from './Footer.module.css';
import logo from '../../Assets/logo.jpg';

const Footer = () => {
  return (
    <>
    <div className={style.footer}>
        <div className={style.left}>
            <div className={style.logo}>
                <img src={logo} alt="Logo"/>
            </div>
                <div className={style.companyName}>LoanCircle</div>
        </div>
        <div className={style.middle}>
            <div className={style.text}>&copy;2022 LoanCircle</div>
            <div className={style.text}>All Rights Reserved!</div>
        </div>
        <div className={style.right}>
            <Link className={style.link} to='/loanPolicy'>Loan Policy</Link>
            <Link className={style.link} to='/privacyPolicy'>Privacy Policy</Link>
        </div>
    </div>
    </>
  );
}

export default Footer;