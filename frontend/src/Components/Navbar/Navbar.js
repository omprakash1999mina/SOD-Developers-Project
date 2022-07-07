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