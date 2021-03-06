import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import style from './LoginSignUp.module.css';
import googleLogo from '../../Assets/googleLogo.webp';
import { useSnackbar } from 'notistack';
import { authentication } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const host = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState({userName : '', email : '',profileImageLink : '',password : ''});
  const handelChangeInput = (event)=> {
    // const {name, value} = event.target; 
    setPassword(event.target.value); // Modern React Destructuring Syntax
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication,provider)
    .then((res)=>{
        setData({userName : res.user.displayName, email : res.user.email, profileImageLink : res._tokenResponse.photoUrl, password : ''});
        setShowPassword(!showPassword);
        console.log(res);
      })
    .catch((err)=>{
      console.log(err)
    })
  }
  // const submitData = async () => {
  //   setData({userName : data.userName, email : data.email, profileImageLink : data.profileImageLink, password : password});
  //   const signData = {
  //     userName : data.userName,
  //     email : data.email,
  //     profileImageLink : data.profileImageLink,
  //     password : password
  //   };
  //   const url = `${host}register`;
  //   console.log(signData);
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(signData)
  //   });
  //   const json = await response.json();
  //   setPassword('');
  //   localStorage.setItem('accessToken', json.access_token);
  //   localStorage.setItem('refreshToken', json.refresh_token);
  //   localStorage.setItem('id', json.id);
  //   console.log(data, json);
  //   navigate('/');
  // }


  const signupHandler = (e) => {
    e.preventDefault();
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const url = `${host}register`;
      setData({userName : data.userName, email : data.email, profileImageLink : data.profileImageLink, password : password});
      const signData = {
        userName : data.userName,
        email : data.email,
        profileImageLink : data.profileImageLink,
        password : password
      };
      Promise.resolve(axios.post(url, JSON.stringify(signData), config))
        .then((res) => {
          
          enqueueSnackbar("Sign Up Successfully", {
            variant: 'success',
          });
          localStorage.setItem('accessToken', res.data.access_token);
          localStorage.setItem('refreshToken', res.data.refresh_token);
          localStorage.setItem('id', res.data.id);
          navigate('/');
        })
        .catch((e) => {
          enqueueSnackbar(e.response.data.message, {
            variant: 'error',
          });
          console.log(e)
        })
  }


    return (
      <div className={style.coverContainer}>
        <div className={style.card}>
          <h1 className={style.heading}>Sign Up</h1>
            {(!showPassword)?(<div className={style.signUp} onClick={(e) => submitHandler(e)}>
              <img src={googleLogo} alt="Google"/>
              <span>Sign up with Google</span>
            </div>):(
              <>
                <input type="password" value={password} className={style.input} placeholder='Create Password' onChange={handelChangeInput}/>
                <button className={style.btn} onClick={signupHandler}>Submit</button>
              </>
            )}
          <Link to="/login" className={style.link}>Already have an account?</Link>
        </div>
      </div>
    );
}

export default SignUp;