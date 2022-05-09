import React from 'react';
import {Link} from 'react-router-dom';

import style from './LoginSignUp.module.css';

const Input = (props) => {
return (
  <input type={props.type} name={props.name} placeholder={props.placeholder} className={style.input} required/>
  );
}
  
const Btn = (props) => {
  return (
    <button className={style.btn}>{props.btnText}</button>
  );
}

const Login = () => {
    return (
        <div className={style.card}>
          <form className={style.formGroup}>
            <h1 className={style.heading}>Login</h1>
            <Input type='email' name='email' placeholder='Enter Email'></Input>
            <Input type='password' name='password' placeholder='Enter Password'></Input>
            <Btn btnText = 'Login'></Btn>
          </form>
          <Link to="/signUp" className={style.link}>Don't have an account?</Link>
          <Link to="/forgetPassword" className={style.link}>Forget password?</Link>
        </div>
      );
}

export default Login;