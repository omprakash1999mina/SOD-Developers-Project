import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import utils from '../../utils'
import style from './Navbar.module.css';
import logo from '../../Assets/logo.jpg';
import profile from '../../Assets/profile.png';
import { getUser, userLogin, userLogout } from '../../states/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [burgerClicked, setBurgerClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const handelBurger = () => {
    setBurgerClicked(!burgerClicked);
  }
  const handelBurgerByLogo = () => {
    setBurgerClicked(false);
  }
  const handelClick = () => {
    setIsClicked(!isClicked);
  }
  const handelLogout = () => {
    dispatch(userLogout({}));
    setIsProfileCreated(false);
    localStorage.clear()
    dispatch(userLogout({}));
    handelBurger();
  }
  const pathname = useLocation().pathname;
  useEffect(() => {
    // window.scrollTo(0, 0);
    getalldata();
    // console.log("updated")
  }, [pathname]);

  const getalldata = () => {
    try {
      const id = localStorage.getItem('id');
      let access_token = localStorage.getItem('accessToken');
      let refresh_token = localStorage.getItem('refreshToken');
      if (!access_token || Object.keys(user.userInfo).length !== 0) { return; }

      if (access_token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        }

        axios.get(API_URL + 'users/' + id, config).then(response => {
          const data = response.data;
          setIsProfileCreated(true);
          dispatch(userLogin(data));
        }).catch(async (error) => {
          // console.log(error);
          if (error.response && error.response.status === 401) {
            access_token = await utils.getNewAccessToken(refresh_token);
            if (!access_token) {
              dispatch(userLogout({}));
            } else {
              localStorage.setItem("accessToken", access_token);
              getalldata();
            }
          }
          else {
            dispatch(userLogout({}));
          }
        });
      }
    } catch (error) {
      // console.log(error)
      dispatch(userLogout({}));
    }
  }

  const refOutSideClick = React.useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (refOutSideClick.current && !refOutSideClick.current.contains(e.target)) {
        setIsClicked(false);
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [refOutSideClick])

  return (
    <>
      {/* <nav className={`${style.navbar} ${(burgerClicked) ? (style.expandNav) : ('')}`}>
        <div className={`${style.logo} ${style.visible}`} onClick={handelBurgerByLogo}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <ul className={`${style.navList} ${(!burgerClicked) ? (style.hideVisibility) : ('')}`}>
          <hr className={style.line}></hr>
          <Link className={style.link} to="/" onClick={() => handelBurger()}><li>Home</li></Link>
          <Link className={style.link} to="/loanRequests" onClick={() => handelBurger()}><li>Loan Requests</li></Link>
          <Link className={style.link} to="/takeLoan" onClick={() => handelBurger()}><li>Take Loan</li></Link>
          <Link className={style.link} to="/accountStatus" onClick={() => handelBurger()}><li>Account Status</li></Link>


          {user.isLogin && <Link className={`${style.link} ${style.smallScreen}`} to="/profile" onClick={() => handelBurger()}><li>Profile</li></Link>}
          {user.isLogin && <Link className={`${style.link} ${style.smallScreen}`} to="/modifyProfile" onClick={() => handelBurger()}><li>Update Profile</li></Link>}
          {user.isLogin && <Link className={`${style.link} ${style.smallScreen}`} to="/" onClick={() => handelLogout()}><li>Logout</li></Link>}
          {!user.isLogin && <Link className={`${style.link} ${style.smallScreen}`} to="/login" onClick={() => handelBurger()}><li>Login</li></Link>}

        </ul>
        <div ref={refOutSideClick} className={`${style.profile} ${(!burgerClicked) ? (style.hideVisibility) : ('')} ${style.bigScreen}`} onClick={() => handelClick()}>
          {
            (user.isLogin) ? (
              <>
                <img src={profile} alt="Profile" />
                <div className={`${style.select} ${(!isClicked) ? (style.hide) : ('')}`}>
                  {(isProfileCreated) ? (<><Link className={style.selectLink} to='/profile' onClick={() => handelBurger()}>Profile</Link>
                    <Link className={style.selectLink} to='/modifyProfile' onClick={() => handelBurger()}>Modify Profile</Link>
                  </>) : (<><Link className={style.selectLink} to='/signup' onClick={() => handelBurger()}>Create Profile</Link></>)}
                  <Link className={style.selectLink} to='/' onClick={() => handelLogout()}>Logout</Link>
                </div>
              </>) : (<>
                <Link to="/login"><button className={style.btnLogin}>SignIn</button></Link>
              </>)
          }
        </div>


        {(!burgerClicked) && <div className={style.burger} onClick={() => handelBurger()}>
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>}
        {(burgerClicked) && <div className={`${style.close} ${style.smallScreen}`} onClick={() => handelBurger()}></div>}
      </nav> */}
      <div className={style.mainContainer}>

        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
            {/* <a href="index.html" className="navbar-brand d-flex align-items-center">
                <h1 className="m-0"><img className="img-fluid me-3" src={logo} alt="Logo"/>Insure</h1>
            </a> */}
            <Link to={"/"}>
              <h3 className="row d-flex align-items-center">
                <div className={style.logo}>
                    <img className="img-fluid" src="img/logo.jpg" alt="logo"/>
                </div>
              LoanCorner</h3>
            </Link>
            {/*  mobile */}
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto bg-light rounded pe-4 py-3 py-lg-0">
                    <Link to={"/"} className="nav-item nav-link active">Home</Link>
                    <Link to={"/aboutus"} className="nav-item nav-link">About Us</Link>
                    <Link to={"/loanRequests"} className="nav-item nav-link">Loan Requests</Link>
                    <Link to={"/takeloan"} className="nav-item nav-link">Take Loan</Link>
                    {/* <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                        <div className="dropdown-menu bg-light border-0 m-0">
                            <a href="feature.html" className="dropdown-item">Features</a>
                            <a href="appointment.html" className="dropdown-item">Appointment</a>
                            <a href="team.html" className="dropdown-item">Team Members</a>
                            <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                            <a href="404.html" className="dropdown-item">404 Page</a>
                        </div>
                    </div> */}
                    <Link to={"/accountStatus"} className="nav-item nav-link">Account Status</Link>
                </div>
            </div>
            <Link to={"/login"} className="btn btn-primary px-3 d-none d-lg-block">Sign In</Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;