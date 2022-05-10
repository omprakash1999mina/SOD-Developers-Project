import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import style from './ForgetPassword.module.css';

const Input = (props) => {
return (
  <input type={props.type} name={props.name} placeholder={props.placeholder} className={style.input} required/>
  );
}

const ForgetPassword = () => {
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isOTPValid, setIsOTPValid] = useState(false);
    const sendOTP = (e) => {
        e.preventDefault();
        setIsOTPSent(!isOTPSent);
    }
    const changePassword = (e) => {
        e.preventDefault();
        setIsOTPValid(!isOTPValid);
        console.log('Password Changed!');
    }
    return (
        <div className={style.card}>
          {(!isOTPSent)?(<form className={style.formGroup}>
            <h1 className={style.heading}>Reset Password</h1>
            <Input type='email' name='email' placeholder='Enter Email'></Input>
            <button className={style.btn} onClick={sendOTP}>Send OTP</button>
          </form>):(
          <form className={style.formGroup}>
            <h1 className={style.heading}>Reset Password</h1>
            <Input type='text' name='otp' placeholder='Enter OTP'></Input>
            <Input type='password' name='newPassword' placeholder='Enter new password'></Input>
            <Input type='password' name='newConfirmPassword' placeholder='Confirm new Password'></Input>
            <button className={style.btn} onClick={changePassword}>Submit</button>
          </form>)}
          <Link to="/signUp" className={style.link}>Don't have an account?</Link>
        </div>
    );
}

export default ForgetPassword;