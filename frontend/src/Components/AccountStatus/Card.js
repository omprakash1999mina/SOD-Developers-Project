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
            <div className={style.column}>
                <span className={style.item}>Status : {props.data.status}</span>
                <span className={style.item}>Message : {props.data.message}</span>
                {props.data.upTenure && <span className={style.item}>Updated Tenure : {props.data.upTenure}</span>}
                {props.data.upRate && <span className={style.item}>Updated Interest Rate : {props.data.upRate}</span>}
                <button className={`${style.btn} ${style.acceptBtn}`}>Accept</button>
                <button className={`${style.btn} ${style.rejectBtn}`}>Discard</button>
            </div>
        </div>
    </>
  );
}

export default Card;