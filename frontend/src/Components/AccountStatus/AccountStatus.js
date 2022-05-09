import React, {useState} from 'react';

import style from './AccountStatus.module.css';

const AccountStatus = () => {
    const [balance, setBalance] = useState(0);
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const handelOpenModal1 = (e) => {
        e.preventDefault();
        setOpenModal1(!openModal1);
    }
    const handelOpenModal2 = (e) => {
        e.preventDefault();
        setOpenModal2(!openModal2);
    }
    const depositBalance = (e) => {
        e.preventDefault();
        handelOpenModal1(e);
    }
    const withdrawBalance = (e) => {
        e.preventDefault();
        handelOpenModal2(e);
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <h1 className={style.primaryHeading}>Your Account Status</h1>
                    <h2 className={style.secondaryHeading}>Current Bank Balance : {balance}</h2>
                    <div className={style.innerBox}>
                        <div className={style.modalContainer}>
                            <button onClick={handelOpenModal1} className={style.btn}>Deposit</button>
                            <div className={`${style.modal} ${(openModal1)?(style.visible):(style.hide)}`}>
                                <div className={style.modalContent}>
                                    <h3 className={style.modalHeading}>Do you really want to deposit the money??</h3>
                                    <form className={style.form}>
                                        <input className={style.modalInput} name='depositedBalance' type="text" placeholder='Enter amount to be deposited' required/>
                                        <div className={style.modalFooter}>
                                            <button type='submit' onClick={depositBalance} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                            <button onClick={handelOpenModal1} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={style.modalContainer}>
                            <button onClick={handelOpenModal2} className={style.btn}>Withdraw</button>
                            <div className={`${style.modal} ${(openModal2)?(style.visible):(style.hide)}`}>
                                <div className={style.modalContent}>
                                    <h3 className={style.modalHeading}>Do you really want to withdraw the money?</h3>
                                    <form className={style.form}>
                                        <input className={style.modalInput} name='withdrawnBalance' type="text" placeholder='Enter amount to be withdrawn' required/>
                                        <div className={style.modalFooter}>
                                            <button type='submit' onClick={withdrawBalance} className={`${style.btn} ${style.submitBtn}`}>Submit</button>
                                            <button onClick={handelOpenModal2} className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountStatus;