import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./TakeLoan.module.css";
import getRefreshToken from "../../utilities";
const host = process.env.REACT_APP_API_URL;

const TakeLoan = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ loanAmount: '', tenure: '', intRate: ''});
  const handelChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value }); // Modern React Destructuring Syntax
  };

  const takeLoan = async (e) => {
    e.preventDefault();
    
    const id = localStorage.getItem("id");
    const url = `${host}apply/loan`;
    console.log(data);
    const loanData = {
      customerId: id,
      loanAmount: data.loanAmount,
      tenure: data.tenure,
      intRate: data.intRate,
    };
    console.log(loanData);
    const getData = () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem('refreshToken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      };
      // const response = await fetch(url, {
      //   method: 'POST',

      //   body: JSON.stringify(loanData)
      // });
      axios
        .post(url, loanData, config)
        .then((response) => {
          // const json = await response.json();
          console.log(response);
          return;
        })
        .catch((err) => {
          const ok = getRefreshToken(refreshToken)
          if(ok){
            getData()
          }
        });
    };
    getData()
  };
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) setData({ loanAmount: '', tenure: '', intRate: '' });
    else navigate("/login"); // eslint-disable-next-line
  }, []);

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
