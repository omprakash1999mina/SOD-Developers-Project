import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

import style from './ForgetPassword.module.css';

const host = process.env.REACT_APP_API_URL;


const ForgetPassword = () => {
    const navigate = useNavigate(); 
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [email, setEmail] = useState('');
    const [resetData, setResetData] = useState({otp : '', newPassword : '', newConfirmPassword : ''});
    const sendOTP = (e) => {
        e.preventDefault();
        const url = `${host}email/verify`;
        const data = {
          email : email
        }
        const config = {
          headers: {
              "Content-Type": "application/json",
          }
        };
        axios.post(url, data, config).then((response) => {
          console.log(data);
          console.log(response.data.status === 'success');
          if(response.data.status === 'success')
            setIsOTPSent(!isOTPSent);
          else
              console.log(response.data.msg);
          console.log(response);
          return;
      }).catch((error) => {
        console.log(error);
      });
    }
    const changePassword = (e) => {
        e.preventDefault();
        if(resetData.newPassword === resetData.newConfirmPassword)
        {
            const url = `${host}forgot/password`;
            const data = {
              email : email,
              otp : resetData.otp,
              password : resetData.newPassword
            }
            const config = {
              headers: {
                  "Content-Type": "application/json",
              }
            };
            axios.post(url, data, config).then((response) => {
              console.log(data);
              console.log(response.data.status === 'success');
              if(response.data.status === 'success')
              {
                console.log('Password Reset Successfully.');
                navigate('/');
              }
              else
                  console.log(response.data.msg);
              console.log(response);
              return;
          }).catch((error) => {
            console.log(error);
          });
          console.log('Password Changed!');
        }
        else
          console.log("Please Enter same in both the fields");
    }
    const handelChangeInputEmail = (event)=> {
      setEmail(event.target.value);
    }
    const handelChangeInputResetData = (event)=> {
      const {name, value} = event.target;
      setResetData({ ...resetData, [name] : value});
    }
    return (
      <div  className={style.coverContainer}>
        <div className={style.card}>
          {(!isOTPSent)?(<form className={style.formGroup}>
            <h1 className={style.heading}>Reset Password</h1>
            <input className={style.input} type='email' value={email} name='email' placeholder='Enter Email' onChange={handelChangeInputEmail}></input>
            <button className={style.btn} onClick={sendOTP}>Send OTP</button>
          </form>):(
          <form className={style.formGroup}>
            <h1 className={style.heading}>Reset Password</h1>
            <input className={style.input} value={resetData.otp} type='text' name='otp' placeholder='Enter OTP' onChange={handelChangeInputResetData}></input>
            <input className={style.input} value={resetData.newPassword} type='password' name='newPassword' placeholder='Enter new password' onChange={handelChangeInputResetData}></input>
            <input className={style.input} value={resetData.newConfirmPassword} type='password' name='newConfirmPassword' placeholder='Confirm new Password' onChange={handelChangeInputResetData}></input>
            <button className={style.btn} onClick={changePassword}>Submit</button>
          </form>)}
          <Link to="/signUp" className={style.link}>Don't have an account?</Link>
        </div>
      </div>  
    );
}

export default ForgetPassword;