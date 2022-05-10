import React from 'react';
import {Link} from 'react-router-dom';

import style from './LoginSignUp.module.css';
import googleLogo from '../../Assets/googleLogo.webp';

import { authentication } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {
  const submitHandler = (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication,provider)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
    return (
        <div className={style.card}>
          <h1 className={style.heading}>Sign Up</h1>
            <div className={style.signUp} onClick={(e) => submitHandler(e)}>
              <img src={googleLogo} alt="Google"/>
              <span>Sign up with Google</span>
            </div>
          <Link to="/login" className={style.link}>Already have an account?</Link>
        </div>
    );
}

export default SignUp;