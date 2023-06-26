import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import style from "./LoginSignUp.module.css";
import axios from "axios";
const host = process.env.REACT_APP_API_URL;

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handelChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Modern React Destructuring Syntax
  };

  const signinHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${host}login`;
    Promise.resolve(axios.post(url, JSON.stringify(formData), config))
      .then((res) => {
        // console.log(res);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        enqueueSnackbar("Logged in successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.response) {
          let message = e.response.data.message;
          enqueueSnackbar(message, {
            variant: "error",
          });
        }
      });
  };

  return (
    <div className={style.coverContainer}>
      
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt=""/>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h3 className="text-center text-muted">Sign in</h3>
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form1Example13">Email address</label>
                  <input className="form-control form-control-lg"  type="email" name="email" value={formData.email} placeholder="Enter Email" onChange={handelChangeInput}  id="form1Example13"/>
                </div>
      
                <div className="form-outline mb-4">
                  <label className="form-label" for="form1Example23">Password</label>
                  <input className="form-control form-control-lg" type="password" name="password" value={formData.password} placeholder="Enter Password" onChange={handelChangeInput} id="form1Example23" />
                </div>
      
                <div className="d-flex justify-content-around mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                    <label className="form-check-label" for="form1Example3"> Remember me </label>
                  </div>
                  <Link to="/forgetPassword">Forgot password?</Link>
                </div>
      
                <button onClick={(e)=>signinHandler(e)} type="submit" className="btn btn-primary btn-lg btn-block w-100">Sign in</button>
      
                <div className="divider flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                
                <div className="col w-100">
                  <button className="btn btn-primary btn-lg btn-block w-100 mb-2" style={{backgroundColor: "#3b5998"}} >
                    <i className="fab fa-google me-2"></i>Continue with Google
                  </button>

                  {/* <a className="btn btn-primary btn-lg btn-block w-100" style={{backgroundColor: "#55acee"}} href="#!" role="button">
                    <i className="fab fa-twitter me-2"></i>Continue with Twitter
                  </a> */}
              </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>


    //   <div className={style.card}>
    //     <form className={style.formGroup}>
    //       <h1 className={style.heading}>Login</h1>
    //       <input
    //         className={style.input}
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         placeholder="Enter Email"
    //         onChange={handelChangeInput}
    //       ></input>
    //       <input
    //         className={style.input}
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         placeholder="Enter Password"
    //         onChange={handelChangeInput}
    //       ></input>
    //       <button className={style.btn} onClick={(e)=>signinHandler(e)}>
    //         Login
    //       </button>
    //     </form>
    //     <Link to="/signUp" className={style.link}>
    //       Don't have an account?
    //     </Link>
    //     <Link to="/forgetPassword" className={style.link}>
    //       Forget password?
    //     </Link>
    //   </div>
    // </div>
  );
};

export default Login;
