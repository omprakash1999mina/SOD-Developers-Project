import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Profile.module.css';
import { getUser, userLogin, userLogout } from '../../states/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../utils'
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const defaultUser = {
  profileImageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EAjufrsaffFdvLMDspiG0w_MG0N7eHUPUjz0bkF-v3qO7aFyyKxpKLA5lt7m0P2O_ZI&usqp=CAU',
  name: 'Sudheer Kumar Prajapat',
  age: '20',
  gender: 'Male',
  email: 'example@gmail.com',
  aadhaarNo: '123456789012',
  aadhaarImageLink: 'https://gujjupost.in/wp-content/uploads/2021/08/searchpng.com-sample-aadhaar-card-icon-png-image-free-download-1024x658.png',
  panNo: '123AB567890',
  panImageLink: 'https://images.livemint.com/img/2019/07/11/original/e-pan_card_download_1562831552156.PNG',
  ctc: '20000',
  salarySlipImageLink: ['https://www.hrcabin.com/wp-content/uploads/2021/05/Salary-slip-format-in-excel-download.png', 'https://i.pinimg.com/736x/ed/f6/28/edf6283d6955d5b8488e977e8613b557.jpg'],
  acHolderName: 'Sudheer Kumar Prajapat',
  acNo: '123456780123456',
  ifacCode: 'abc',
  bankName: 'PNB'
}

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [userData, setUserData] = useState(defaultUser);

  useEffect(() => {
    if (localStorage.getItem('accessToken'))
      getalldata();
    else
      navigate('/login'); // eslint-disable-next-line
  }, []);

  // fetchUser();

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
    <div className={style.coverContainer}>
      {user.userInfo &&
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.profilePhoto}>
              <img src={user.userInfo.profileImageLink == "" ? defaultUser.profileImageLink : user.userInfo.profileImageLink} alt="Profile" />
            </div>
            <div className={style.documentsPhoto}>
              <div className={style.aadhaarPhoto}>
                <img src={user.userInfo.aadhaarImageLink == "" ? defaultUser.aadhaarImageLink : user.userInfo.aadhaarImageLink} alt="Aadhaar Card" />
              </div>
              <div className={style.panPhoto}>
                <img src={user.userInfo.panImageLink == "" ? defaultUser.panImageLink : user.userInfo.panImageLink} alt="PAN Card" />
              </div>
            </div>
            <div className={style.slipsPhoto}>
              <img src={user.userInfo.salarySlipImageLink.length != 0 ? user.userInfo.salarySlipImageLink[currentIndex] : defaultUser.salarySlipImageLink} alt="Slips" />
              <div className={style.buttons}>
                <button className={style.btn} onClick={() => ((currentIndex === 0) ? (setCurrentIndex(user.userInfo.salarySlips.length - 1)) : (setCurrentIndex(currentIndex - 1)))}>&lt;</button>
                <button className={style.btn} onClick={() => ((currentIndex === user.userInfo.salarySlips.length - 1) ? (setCurrentIndex(0)) : (setCurrentIndex(currentIndex + 1)))}>&gt;</button>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <h2 className={style.heading}>Basic Details</h2>
            <div className={style.basicDetails}>
              <p className={style.detail}>Name : {user.userInfo.userName}</p>
              <p className={style.detail}>Age : {user.userInfo.age}</p>
              <p className={style.detail}>Gender : {user.userInfo.gender}</p>
              <p className={style.detail}>Email : {user.userInfo.email}</p>
              <p className={style.detail}>Aadhaar Number : {user.userInfo.aadhaarNumber}</p>
              <p className={style.detail}>PAN Number : {user.userInfo.panNumber}</p>
              <p className={style.detail}>CTC : {user.userInfo.ctc}</p>
            </div>
            <h2 className={style.heading}>Account Details</h2>
            <div className={style.acDetails}>
              <p className={style.detail}>Account Holder Name : {user.userInfo.accountHolderName}</p>
              <p className={style.detail}>Account Number : {user.userInfo.accountNumber}</p>
              <p className={style.detail}>IFAC Code of Bank : {user.userInfo.IFACcode}</p>
              <p className={style.detail}>Name of Bank : {user.userInfo.BankName}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Profile;