import React, {useState} from 'react';
import axios from "axios";

import style from './AccountStatus.module.css';
// import getRefreshToken from "../../utilities";

const host = process.env.REACT_APP_API_URL;

const AccountStatus = () => {
    const fetchBalance = () =>{
        // const url = `${host}update/balance`;
        return 0;
    }
    const [dAmount, setDAmount] = useState('');
    const [wAmount, setWAmount] = useState('');
    const [balance, setBalance] = useState(fetchBalance);
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const updateBalance = (newBalance) => {
        const getData = () => {
            const url = `${host}update/balance`;
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = localStorage.getItem('id');
            const data = {
                customerId : id,
                profileAccountBalance : newBalance
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${accessToken}`,
                },
            };
            axios.post(url, data, config).then((response) => {
                // const json = await response.json();
                console.log(data, id, accessToken);
                console.log(response.data.status === 'success');
                if(response.data.status === 'success') // eslint-disable-next-line
                    setBalance(eval(newBalance));
                else
                    console.log(response.msg);
                console.log(response);
                return;
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    const newConfig = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                    const data = {
                        refresh_token: refreshToken,
                    };
                    axios.post(host + "refresh", data, newConfig).then((res) => {
                        console.log(res);
                        const new_refresh_token = res.data.access_token;

                        localStorage.setItem("accessToken", new_refresh_token);
                        // console.log("level 4");
                        getData();

                        //   return new_refresh_token;
                    }).catch((error) => {
                        console.log(error);
                        console.log("log out");
                        window.localStorage.clear();
                        // dispatch(userLogout);
                        //   return false;
    
                        // const ok = getRefreshToken(refreshToken)
                        // if(ok){
                        //   getData();
                        // }
                    });
                }
            })
        }
        getData();
    }
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
        handelOpenModal1(e); // eslint-disable-next-line
        updateBalance((String)(eval(balance)+eval(dAmount)));
        console.log('Balance deposited.');
    }
    const withdrawBalance = (e) => {
        e.preventDefault();
        handelOpenModal2(e); // eslint-disable-next-line
        if(eval(balance)-eval(wAmount) < 0)
            console.log('Insufficient balance.'); // eslint-disable-next-line
            updateBalance((String)(eval(balance)-eval(wAmount)));
        // else
        console.log('Balance withdrawn.');
    }
    const handelChangeInputDeposit = (event)=> {
        setDAmount(event.target.value);
    }
    const handelChangeInputWithdraw = (event)=> {
        setWAmount(event.target.value);
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
                                        <input className={style.modalInput} value={dAmount} name='depositedBalance' type="text" placeholder='Enter amount to be deposited' required onChange={handelChangeInputDeposit} />
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
                                        <input className={style.modalInput} value={wAmount} name='withdrawnBalance' type="text" placeholder='Enter amount to be withdrawn' required onChange={handelChangeInputWithdraw} />
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