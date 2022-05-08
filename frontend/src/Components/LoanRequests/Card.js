import React from 'react';
import {Link} from 'react-router-dom';

import style from './Card.module.css';

const Card = (props) => {
  return (
    <>
        <div className={style.card}>
            <div className={style.row}>
                <Link className={style.link} to='/publicProfile'>Candidate Profile</Link>
            </div>
            <div className={style.row}>
                <span className={style.item}>Amount : {props.data.amount}</span>
                <span className={style.item}>Tenure : {props.data.tenure}</span>
                <span className={style.item}>Interest Rate : {props.data.rate}</span>
            </div>
            <div className={style.row}>
                <button className={style.btn}>Accept</button>
                <button className={style.btn}>Reject</button>
                <button className={style.btn}>Modify</button>
            </div>
        </div>
    </>
  );
}

export default Card;