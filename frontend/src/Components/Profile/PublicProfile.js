import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./PublicProfile.module.css";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({
    profileImageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EAjufrsaffFdvLMDspiG0w_MG0N7eHUPUjz0bkF-v3qO7aFyyKxpKLA5lt7m0P2O_ZI&usqp=CAU",
    userName: "Sudheer Kumar Prajapat",
    age: "20",
    gender: "Male",
    email: "example@gmail.com",
    ctc: "20000",
  });
  useEffect(() => {
    const url = `https://apis.opdevelopers.live/api/users/${id.customerId}`;
    try {
      const getdata = () => {
        const atoken = window.localStorage.getItem("accessToken");
        const rtoken = window.localStorage.getItem("refreshToken");
        if (atoken) {
          const config = {
            headers: {
              Authorization: `Bearer ${atoken}`,
            },
          };

          Promise.resolve(axios.get(url, config))
            .then((res) => {
              console.log(res);
              setUserData(res.data);
              return;
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                axios
                  .post("https://apis.opdevelopers.live/api/refresh", {
                    refresh_token: rtoken,
                  })
                  .then((res) => {
                    console.log(res);
                    localStorage.setItem("accessToken", res.data.access_token);
                    localStorage.setItem(
                      "refreshToken",
                      res.data.refresh_token
                    );
                    getdata();
                    return;
                  })
                  .catch((error) => {
                    console.log(error);
                    enqueueSnackbar(
                      "You need to login first",
                      {
                        variant: "error",
                      }
                    );
                    window.localStorage.clear();
                    navigate('/loanRequests', { replace: true })
                    return;
                  });
              } else {
                console.log(error);
                let message = error.response.data.message;
                enqueueSnackbar(message, {
                  variant: "error",
                });
                navigate('/loanRequests', { replace: true })
                return;
              }
            });
        } else {
          enqueueSnackbar("You need to login first", {
            variant: "error",
          });
          window.localStorage.clear();
          navigate('/loanRequests', { replace: true })
          return;
        }
      };

      getdata();
      return;
    } catch (error) {
      console.log(error);
      enqueueSnackbar("You need to login first", {
        variant: "error",
      });
      navigate('/loanRequests', { replace: true })
      return;
    }
  }, []);

  return ( <div className={style.coverContainer}>
      {(userData!=null)?(
       
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
      
      ):(<h2>User Details not available</h2>)}
    </div>
  );
};

export default PublicProfile;
