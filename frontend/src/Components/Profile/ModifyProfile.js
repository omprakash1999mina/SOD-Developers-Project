import React, { useState, useEffect } from 'react';
import { userLogout, getUser } from '../../states/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import style from './ModifyProfile.module.css';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const ModifyProfile = () => {
    const [userData, setUserData] = useState();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handelChangeInput = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value }); // Modern React Destructuring Syntax
    }
    const isLogin = Object.keys(user.userInfo).length;
    
    useEffect(() => { 
        if (!isLogin) {
            enqueueSnackbar("You need to login first", {
                variant: "error",
            });
            dispatch(userLogout({}));
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }, [])

    return (
        <div className={style.coverContainer}>
            <div className={style.container}>
                <h1 className={style.primaryHeading}>Modify Your Profile</h1>
                <form className={style.form}>
                    <div className={style.bigBox}>
                        <div className={style.box}>
                            <h2 className={style.secondaryHeading}>Basic Details</h2>
                            <div className={style.basicDetails}>
                                <input className={style.input} value={isLogin ? user.userInfo.userName: ""} type="text" name='name' placeholder='Enter your name' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.age: ""} type="text" name='age' placeholder='Enter your age' required onChange={handelChangeInput} />
                                <div className={style.radios}>
                                    {/* <label htmlFor="gender">{isLogin ? user.userInfo.gender: "Gender :"} &nbsp;</label> */}
                                    <label htmlFor="gender">Gender : &nbsp;</label>
                                    <label htmlFor="male">Male</label><input className={style.radio} id='male' type="radio" name='gender' value='Male' checked={user.userInfo.gender === 'Male'} onChange={handelChangeInput} />
                                    <label htmlFor="female">Female</label><input className={style.radio} id='female' type="radio" name='gender' value='Female' checked={user.userInfo.gender  === 'Female'} onChange={handelChangeInput} />
                                    <label htmlFor="other">Other</label><input className={style.radio} id='other' type="radio" name='gender' value='Other' checked={user.userInfo.gender  === 'Other'} onChange={handelChangeInput} />
                                </div>
                                <input className={style.input} value={isLogin ? user.userInfo.email: ""} type="email" name='email' placeholder='Enter your email' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.aadhaarNumber: ""} type="text" name='aadhaarNumber' placeholder='Enter your Aadhaar No.' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.ctc: ""} type="text" name='ctc' placeholder='Enter your CTC' required onChange={handelChangeInput} />
                            </div>
                        </div>
                        <div className={style.box}>
                            <h2 className={style.secondaryHeading}>Bank Account Details</h2>
                            <div className={style.acDetails}>
                                <input className={style.input} value={isLogin ? user.userInfo.accountHolderName: ""} type="text" name='accountHolderName' placeholder='Enter account holder name' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.accountNumber: ""} type="text" name='accountNumber' placeholder='Enter account number' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.IFACcode: ""} type="text" name='IFACcode' placeholder='Enter IFAC Code' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.BankName: ""} type="text" name='BankName' placeholder='Enter name of bank' required onChange={handelChangeInput} />
                                <input className={style.input} value={isLogin ? user.userInfo.panNumber: ""} type="text" name='panNumber' placeholder='Enter your PAN No.' required onChange={handelChangeInput} />
                            </div>
                        </div>
                    </div>
                    <h2 className={style.secondaryHeading}>Documents</h2>
                    <div className={style.documents}>
                        <div className={style.imageInput}>
                            <label className={style.label} htmlFor="profilePhoto">Upload Profile Photo</label>
                            <input className={style.imgInp} type="file" name='profilePhoto' id='profilePhoto' />
                        </div>
                        <div className={style.imageInput}>
                            <label className={style.label} htmlFor="aadhaarPhoto">Upload Aadhaar Card Photo</label>
                            <input className={style.imgInp} type="file" name='aadhaarPhoto' id='aadhaarPhoto' />
                        </div>
                        <div className={style.imageInput}>
                            <label className={style.label} htmlFor="panPhoto">Upload PAN Card Photo</label>
                            <input className={style.imgInp} type="file" name='panPhoto' id='panPhoto' />
                        </div>
                        <div className={style.imageInput}>
                            <label className={style.label} htmlFor="salarySlips">Upload Salary Slips</label>
                            <input className={style.imgInp} type="file" name='salarySlips' id='salarySlips' />
                        </div>
                    </div>
                    <button className={style.btn} type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ModifyProfile;