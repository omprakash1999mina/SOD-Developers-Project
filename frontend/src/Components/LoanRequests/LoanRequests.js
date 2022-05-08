import React from 'react';

import style from './LoanRequests.module.css';
import Card from './Card';

const data = {
  amount : 100000,
  tenure : 12,
  rate : 2.5
};

const LoanRequests = () => {
  return (
    <>
      <div className={style.container}>
        <Card data = {data}></Card>
        <Card data = {data}></Card>
        <Card data = {data}></Card>
        <Card data = {data}></Card>
        <Card data = {data}></Card>
      </div>
    </>
  );
}

export default LoanRequests;