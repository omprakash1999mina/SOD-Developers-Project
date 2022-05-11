import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import style from './LoginSignUp.module.css';
import axios from "axios";
const host = process.env.REACT_APP_API_URL;

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email : '', password : ''});
    const handelChangeInput = (event)=> {
      const {name, value} = event.target; 
      setFormData({ ...formData, [name] : value}); // Modern React Destructuring Syntax
    }
    const handelLogin = async (e) => {
      e.preventDefault();
      const url = `${host}login`;
      // const response = 'Hello';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const json = await response.json();
      // console.log(json);
      localStorage.setItem('accessToken', json.access_token);
      localStorage.setItem('refreshToken', json.refresh_token);
      localStorage.setItem('id', json.id);
      navigate('/');
      enqueueSnackbar("Logged In successfully", {
        variant: 'success',
      });
    }


    const signinHandler = (e) => {
      e.preventDefault();
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const url = `${host}/login`;
      Promise.resolve(
        axios.post(
          url,
          JSON.stringify(formData), config
        )
      )
        .then((res) => {
          if (res.status == "200") {
            // console.log(res);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            enqueueSnackbar("Logged in successfully", {
              variant: 'success',
            });
            navigate("/")
          }
        })
        .catch((e) => {
          console.log(e)
          let message = e.response.data.message
          enqueueSnackbar(message, {
            variant: 'error',
          })   
        });
    }




    return (
      <div className={style.coverContainer}>
        <div className={style.card}>
          <form className={style.formGroup}>
            <h1 className={style.heading}>Login</h1>
            <input className={style.input} type='email' name='email' value={formData.email} placeholder='Enter Email' onChange={handelChangeInput}></input>
            <input className={style.input} type='password' name='password' value={formData.password} placeholder='Enter Password' onChange={handelChangeInput}></input>
            <button className={style.btn} onClick={signinHandler}>Login</button>
          </form>
          <Link to="/signUp" className={style.link}>Don't have an account?</Link>
          <Link to="/forgetPassword" className={style.link}>Forget password?</Link>
        </div>
      </div>
      );
}

export default Login;