import React from 'react';
import {Link} from 'react-router-dom';

import style from './LoginSignIn.module.css';
import SignInWithGoogle from '../../Assets/signInWithGoogle.png';

import { authentication } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignIn = () => {
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
          <h1 className={style.heading}>Sign In</h1>
            <div className={style.signIn} onClick={(e) => submitHandler(e)}>
              <img src={SignInWithGoogle} alt="Sign in with Google"/>
            </div>
          <Link to="/login" className={style.link}>Already have an account?</Link>
        </div>
    );
}

export default SignIn;