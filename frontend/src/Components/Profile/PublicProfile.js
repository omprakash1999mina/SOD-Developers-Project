import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./PublicProfile.module.css";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import utils from '../../utils'
import { userLogout } from '../../states/User/UserSlice';
import { useDispatch } from 'react-redux';
const API_URL = process.env.REACT_APP_API_URL;

// const userData = {
//     profilePhoto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EAjufrsaffFdvLMDspiG0w_MG0N7eHUPUjz0bkF-v3qO7aFyyKxpKLA5lt7m0P2O_ZI&usqp=CAU',
//     name : 'Sudheer Kumar Prajapat',
//     age : '20',
//     gender : 'Male',
//     email : 'example@gmail.com',
//     ctc : '20000'
// };

const PublicProfile = () => {
  let id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({
    profileImageLink: "",
    userName: "",
    age: "",
    gender: "",
    email: "",
    ctc: "",
  });

  useEffect(() => {
    getalldata();
  }, []);


  const getalldata = () => {
    try {
      let access_token = localStorage.getItem('accessToken');
      let refresh_token = localStorage.getItem('refreshToken');

      if (access_token) {
        const config = {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        }

        axios.get(API_URL + 'users/' + id.customerId, config).then(response => {
          const data = response.data;
          setUserData(data);
          return;
        }).catch(async (error) => {
          // console.log(error);
          if (error.response && error.response.status === 401) {
            access_token = await utils.getNewAccessToken(refresh_token);
            if (!access_token) {
              dispatch(userLogout({}));
              enqueueSnackbar("You need to login first", {
                variant: "error",
              });
              navigate('/loanRequests', { replace: true })
              return;
            } else {
              localStorage.setItem("accessToken", access_token);
              getalldata();
            }
          }
          else {
            dispatch(userLogout({}));
            enqueueSnackbar("You need to login first", {
              variant: "error",
            });
            navigate('/loanRequests', { replace: true })
            return;
          }
        });
      }
    } catch (error) {
      // console.log(error)
      dispatch(userLogout({}));
      enqueueSnackbar("You need to login first", {
        variant: "error",
      });
      navigate('/loanRequests', { replace: true })
      return;
    }
  }

  return (<div className={style.coverContainer}>
    {(userData != null) ? (

      <div className={style.container}>
        <h1 className={style.heading}>Candidate Profile</h1>
        <div className={style.profilePhoto}>
          <img src={userData.profileImageLink} alt="Profile" />
        </div>
        <table className={style.details}>
          <tr>
            <td className={style.detail}>Name</td>
            <td className={style.detail}>:&nbsp;</td>
            <td className={style.detail}>{userData.userName}</td>
          </tr>
          <tr>
            <td className={style.detail}>Email</td>
            <td className={style.detail}>:&nbsp;</td>
            <td className={style.detail}>{userData.email}</td>
          </tr>
          <tr>
            <td className={style.detail}>Gender</td>
            <td className={style.detail}>:&nbsp;</td>
            <td className={style.detail}>{userData.gender}</td>
          </tr>
          <tr>
            <td className={style.detail}>CTC</td>
            <td className={style.detail}>:&nbsp;</td>
            <td className={style.detail}>{userData.ctc}</td>
          </tr>
          <tr>
            <td className={style.detail}>Age</td>
            <td className={style.detail}>:&nbsp;</td>
            <td className={style.detail}>{userData.age}</td>
          </tr>

        </table>
      </div>

    ) : (<h2>User Details not available</h2>)}
  </div>
  );
};

export default PublicProfile;
