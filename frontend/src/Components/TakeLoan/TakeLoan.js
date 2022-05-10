import { async } from '@firebase/util';
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import style from './TakeLoan.module.css';

const host = process.env.REACT_APP_API_URL;

const TakeLoan = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({loanAmount : 0, tenure : 0, intRate : 0});
  const handelChangeInput = (event)=> {
    const {name, value} = event.target; 
    setData({ ...data, [name] : value}); // Modern React Destructuring Syntax
  }
  const takeLoan = async (e) => {
    e.preventDefault();
    let credentials = await JSON.parse(localStorage.getItem('loginCredentials'));
    const url = `${host}apply/loan`;
    console.log(data);
    console.log(credentials);
    const loanData = {
      customerId : credentials.id,
      loanAmount : data.loanAmount,
      tenure : data.tenure,
      intRate : data.intRate
    }
    console.log(loanData);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `bearer ${(credentials.access_token)}`
      },
      body: JSON.stringify(loanData)
    });
    const json = await response.json();
    console.log(json);
  }
  const accessCredentials =  async () => {
    const json = await JSON.parse(localStorage.getItem('loginCredentials'));
    return json;
  }
  useEffect(()=>{
      let credentials = accessCredentials();
      if(credentials)
        setData({loanAmount : 0, tenure : 0, intRate : 0});
      else
        navigate('/login');
  }, []); 

  return (
    <div className={style.container}>
      <h1 className={style.primaryHeading}>Take Loan</h1>
      <form className={style.form}>
        <h2 className={style.secondaryHeading}>Fill the below details carefully!</h2>
        <input className={style.input} value={data.loanAmount} type="text" name="loanAmount" id="amount" placeholder='Enter Loan Amount' required onChange={handelChangeInput}/>
        <input className={style.input} value={data.tenure} type="text" name="tenure" id="tenure" placeholder='Enter Tenure (in months)' required onChange={handelChangeInput}/>
        <input className={style.input} value={data.intRate} type="text" name="intRate" id="rate" placeholder='Enter Interest Rate' required onChange={handelChangeInput}/>
        <button className={style.btn} type='submit' onClick={takeLoan}>Submit</button>
      </form>
    </div>
  );
}

export default TakeLoan;