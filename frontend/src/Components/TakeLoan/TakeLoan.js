import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import axios from "axios";
import style from "./TakeLoan.module.css";
import utils from '../../utils'
import { userLogout, getUser } from '../../states/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const host = process.env.REACT_APP_API_URL;
const TakeLoan = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ loanAmount: 0, tenure: 0, intRate: 0 });

  const handelChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value }); // Modern React Destructuring Syntax
  };

  const takeLoan = (e) => {
    e.preventDefault();
    postalldata();
  }

  useEffect(() => {
    const empty = "";
    const { age, gender, ctc } = user.userInfo;
    if (age === empty || gender === empty || ctc === empty) {
      enqueueSnackbar("Complete your profile", {
        variant: "error",
      });
      setTimeout(() => {
        navigate('/modifyProfile');
      }, 1000);
    }
  }, []);

  const postalldata = () => {
    try {
      let access_token = localStorage.getItem('accessToken');
      let refresh_token = localStorage.getItem('refreshToken');
      const id = localStorage.getItem('id');
      if (access_token) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${access_token}`,
          }
        }
        const url = `${host}apply/loan`;
        const loanData = {
          customerId: id,
          loanAmount: data.loanAmount,
          tenure: data.tenure,
          intRate: data.intRate,
        };

        axios.post(url, loanData, config).then((res) => {
          enqueueSnackbar("Loan applied successfully", {
            variant: 'success',
          });
          navigate('/loanRequests');
          return;
        }).catch(async (error) => {
          // console.log(error);
          if (error.response && error.response.status === 401) {
            access_token = await utils.getNewAccessToken(refresh_token);
            if (!access_token) {
              dispatch(userLogout({}));
              navigate('/login');
              return;
            } else {
              localStorage.setItem("accessToken", access_token);
              postalldata();
            }
          }
          else if (error.response) {
            enqueueSnackbar(error.response.data.message, {
              variant: "error",
            });
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
      navigate('/login');
      return;
    }
  }


  return (
    <div className={style.container}>
      <h1 className={style.primaryHeading}>Take Loan</h1>
      <form className={style.form}>
        <h2 className={style.secondaryHeading}>
          Fill the below details carefully!
        </h2>
        <input
          className={style.input}
          // value={data.loanAmount}
          type="text"
          name="loanAmount"
          id="amount"
          placeholder="Enter Loan Amount"
          required
          onChange={handelChangeInput}
        />
        <input
          className={style.input}
          // value={data.tenure}
          type="text"
          name="tenure"
          id="tenure"
          placeholder="Enter Tenure (in months)"
          required
          onChange={handelChangeInput}
        />
        <input
          className={style.input}
          // value={data.intRate}
          type="text"
          name="intRate"
          id="rate"
          placeholder="Enter Interest Rate"
          required
          onChange={handelChangeInput}
        />
        <button className={style.btn} type="submit" onClick={takeLoan}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TakeLoan;
