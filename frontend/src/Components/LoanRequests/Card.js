import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import style from './Card.module.css';

const Card = (props) => {
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const handelOpenModal1 = (e) => {
        e.preventDefault();
        setOpenModal1(!openModal1);
    }
    const handelOpenModal2 = (e) => {
        e.preventDefault();
        setOpenModal2(!openModal2);
    }
    const handelOpenModal3 = (e) => {
        e.preventDefault();
        setOpenModal3(!openModal3);
    }
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
                <div className={style.modalContainer}>
                    <button onClick={handelOpenModal1} className={`${style.btn} ${style.acceptBtn}`}>Accept</button>
                    <div className={`${style.modal} ${(openModal1)?(style.visible):(style.hide)}`}>
                        <div className={style.modalContent}>
                            <h3 className={style.modalHeading}>Do you really want to accept the loan request?</h3>
                            <form className={style.form}>
                                <textarea className={style.textarea} name="acceptMessage" id="acceptMessage" cols="40" rows="10" placeholder='Enter your message (Optional)'></textarea>
                                <div className={style.modalFooter}>
                                    <button type='submit' onClick={handelOpenModal1} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                    <button onClick={handelOpenModal1} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={style.modalContainer}>
                    <button onClick={handelOpenModal2} className={`${style.btn} ${style.rejectBtn}`}>Reject</button>
                    <div className={`${style.modal} ${(openModal2)?(style.visible):(style.hide)}`}>
                        <div className={style.modalContent}>
                            <h3 className={style.modalHeading}>Do you really want to reject the loan request?</h3>
                            <form className={style.form}>
                                <textarea className={style.textarea} name="rejectMessage" id="rejectMessage" cols="40" rows="10" placeholder='Enter your message (Optional)'></textarea>
                                <div className={style.modalFooter}>
                                    <button type='submit' onClick={handelOpenModal2} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                    <button onClick={handelOpenModal2} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={style.modalContainer}>
                    <button onClick={handelOpenModal3} className={`${style.btn} ${style.modifyBtn}`}>Modify</button>
                    <div className={`${style.modal} ${(openModal3)?(style.visible):(style.hide)}`}>
                        <div className={style.modalContent}>
                            <h3 className={style.modalHeading}>Modify the loan request.</h3>
                            <form className={style.form}>
                                <input className={style.modalInput} name='modifiedTenure' type="text" placeholder='Enter modified tenure (in months)' />
                                <input className={style.modalInput} name='modifiedRate' type="text" placeholder='Enter modified interest rate (in months)'/>
                                <textarea className={style.textarea} name="rejectMessage" id="rejectMessage" cols="40" rows="10" placeholder='Enter your message (Optional)'></textarea>
                                <div className={style.modalFooter}>
                                    <button type='submit' onClick={handelOpenModal3} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                    <button onClick={handelOpenModal3} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Card;