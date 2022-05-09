import React from 'react';

import style from './TakeLoan.module.css';

const TakeLoan = () => {
  return (
    <div className={style.container}>
      <h1 className={style.primaryHeading}>Take Loan</h1>
      <form className={style.form}>
        <h2 className={style.secondaryHeading}>Fill the below details carefully!</h2>
        <input className={style.input} type="text" name="amount" id="amount" placeholder='Enter Loan Amount' required />
        <input className={style.input} type="text" name="tenure" id="tenure" placeholder='Enter Tenure (in months)' required />
        <input className={style.input} type="text" name="rate" id="rate" placeholder='Enter Interest Rate' required />
        <button className={style.btn} type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default TakeLoan;