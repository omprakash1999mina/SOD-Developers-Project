import React from 'react';

import style from './LoanRequests.module.css';
import Card from './Card';

const dataArr = [ {amount : 100000, tenure : 12, rate : 2.5},
                  {amount : 120000, tenure : 22, rate : 1.5},
                  {amount : 100080, tenure : 13, rate : 6.5},
                  {amount : 126700, tenure : 42, rate : 1.7},
                  {amount : 100000, tenure : 52, rate : 5.5},
                  {amount : 173000, tenure : 25, rate : 6.5},
];
// const dataArr = [];

const LoanRequests = () => {
  return (
    <>
      <div className={style.container}>
        {(dataArr.length === 0) && <h2 className={style.heading}>Currently there is no loan requests!</h2>}
        {dataArr.map((currentData)=>{
          return <Card key={currentData.amount+currentData.tenure+currentData.rate+Math.random()} data={currentData}/>
        })}
      </div>
    </>
  );
}

export default LoanRequests;