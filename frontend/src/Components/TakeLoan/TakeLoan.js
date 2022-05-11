import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./TakeLoan.module.css";
const host = process.env.REACT_APP_API_URL;
import { useSnackbar } from 'notistack';
const TakeLoan = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ loanAmount: 0, tenure: 0, intRate: 0 });
  const handelChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value }); // Modern React Destructuring Syntax
  };


  const takeLoan = (e)=>{
    e.preventDefault();
    const url = `${host}apply/loan`;
    try {
      console.log("first")
      const getdata = () => {
        const atoken = window.localStorage.getItem("accessToken");
        const rtoken = window.localStorage.getItem("refreshToken");
        const id = window.localStorage.getItem("id");
        if (atoken) {
          console.log("first1")
          const config = {
            headers: {
              Authorization: `Bearer ${atoken}`,
              "Content-Type": "application/json",
            },
          };
          const loanData = {
            customerId: id,
            loanAmount: data.loanAmount,
            tenure: data.tenure,
            intRate: data.intRate,
          };

          Promise.resolve(
            axios.post(
              url,
              loanData,
              config
            )
          )
            .then((res) => {
              console.log(res)
              enqueueSnackbar("Loan applied successfully", {
                variant: 'success',
              });
              return;
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                axios
                  .post(
                    "https://apis.opdevelopers.live/api/refresh",
                    {
                      refresh_token:rtoken
                    }
                  )
                  .then((res) => {
                    console.log(res)
                    localStorage.setItem(
                      "accessToken",
                      res.data.access_token
                    );
                    localStorage.setItem(
                      "refreshToken",
                      res.data.refresh_token
                    );
                    getdata();
                    return;
                  })
                  .catch((error) => {
                    console.log(error)
                    enqueueSnackbar("You need to login first to apply for loan", {
                      variant: 'error',
                    });
                    window.localStorage.clear();
                    return;
                  });

              }else{
                console.log(error)
                let message = error.response.data.message
                enqueueSnackbar(message, {
                  variant: 'error',
                });
                return
              }
            });
        }else{
          enqueueSnackbar("You need to login first to apply for loan", {
             variant: 'error',
           });
          window.localStorage.clear();
     
          return
        }
      };

      getdata();
      return;
    } catch (error) {
      console.log(error);
      enqueueSnackbar("You need to login first to apply for loan", {
        variant: 'error',
      });
      return
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
          value={data.loanAmount}
          type="text"
          name="loanAmount"
          id="amount"
          placeholder="Enter Loan Amount"
          required
          onChange={handelChangeInput}
        />
        <input
          className={style.input}
          value={data.tenure}
          type="text"
          name="tenure"
          id="tenure"
          placeholder="Enter Tenure (in months)"
          required
          onChange={handelChangeInput}
        />
        <input
          className={style.input}
          value={data.intRate}
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
