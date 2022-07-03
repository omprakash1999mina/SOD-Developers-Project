import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [isProfileCreated, setIsProfileCreated] = useState(true);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    getalldata();
    // console.log("updated")
  }, []);

  const getalldata = () => {
    try {
      const id = localStorage.getItem('id');
      let access_token = localStorage.getItem('accessToken');
      let refresh_token = localStorage.getItem('refreshToken');
      if (!access_token || user.userInfo) { return; }

      if (access_token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        }

        axios.get(API_URL + 'users/' + id, config).then(response => {
          const data = response.data;
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




  return (
    <>
      <nav className={`${style.navbar} ${(burgerClicked) ? (style.expandNav) : ('')}`}>
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
          {(user.isLogin) ? (<>
            {
              (isProfileCreated) ? (
                <>
                  <Link className={`${style.link} ${style.smallScreen}`} to="/profile" onClick={() => handelBurger()}><li>Profile</li></Link>
                  <Link className={`${style.link} ${style.smallScreen}`} to="/modifyProfile" onClick={() => handelBurger()}><li>Update Profile</li></Link>
                </>) : (
                <>
                  <Link className={`${style.link} ${style.smallScreen}`} to="/createProfile" onClick={() => handelBurger()}><li>Create Profile</li></Link>
                </>)
            }

            <Link className={`${style.link} ${style.smallScreen}`} to="/" onClick={() => handelLogout()}><li>Logout</li></Link></>) : (
            <Link className={`${style.link} ${style.smallScreen}`} to="/login" onClick={() => handelBurger()}><li>Login</li></Link>)}

        </ul>
        <div className={`${style.profile} ${(!burgerClicked) ? (style.hideVisibility) : ('')} ${style.bigScreen}`} onClick={() => handelClick()}>
          {
            (user.isLogin) ? (
              <>
                <img src={profile} alt="Profile" />
                <div className={`${style.select} ${(!isClicked) ? (style.hide) : ('')}`}>
                  {(isProfileCreated) ? (<><Link className={style.selectLink} to='/profile' onClick={() => handelBurger()}>Profile</Link>
                    <Link className={style.selectLink} to='/modifyProfile' onClick={() => handelBurger()}>Modify Profile</Link>
                  </>) : (<><Link className={style.selectLink} to='/createProfile' onClick={() => handelBurger()}>Create Profile</Link></>)}
                  <Link className={style.selectLink} to='/' onClick={() => handelLogout()}>Logout</Link>
                </div>
              </>) : (<>
                <Link to="/login"><button className={style.btnLogin}>Login</button></Link>
              </>)
          }
        </div>


        {(!burgerClicked) && <div className={style.burger} onClick={() => handelBurger()}>
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>}
        {(burgerClicked) && <div className={`${style.close} ${style.smallScreen}`} onClick={() => handelBurger()}></div>}
      </nav>
    </>
  );
}

export default Navbar;