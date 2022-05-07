import React from 'react';

import style from './CreateProfile.module.css';

const CreateProfile = () => {
  return (
    <>
        <div className={style.container}>
            <h1 className={style.primaryHeading}>Create Your Profile</h1>
            <form className={style.form}>
                <div className={style.bigBox}>
                    <div className={style.box}>
                        <h2 className={style.secondaryHeading}>Basic Details</h2>
                        <div className={style.basicDetails}>
                            <input className={style.input} type="text" name='name' placeholder='Enter your name' required />
                            <input className={style.input} type="text" name='age' placeholder='Enter your age' required />
                            <input className={style.input} type="email" name='email' placeholder='Enter your email' required />
                            <input className={style.input} type="text" name='aadharNo' placeholder='Enter your Aadhar No.' required />
                            <input className={style.input} type="text" name='ctc' placeholder='Enter your CTC' required />
                        </div>
                    </div>
                    <div className={style.box}>
                        <h2 className={style.secondaryHeading}>Bank Account Details</h2>
                        <div className={style.acDetails}>
                            <input className={style.input} type="text" name='acHolderName' placeholder='Enter account holder name' required />
                            <input className={style.input} type="text" name='acNo' placeholder='Enter account number' required />
                            <input className={style.input} type="text" name='ifacCode' placeholder='Enter IFAC Code' required />
                            <input className={style.input} type="text" name='bankName' placeholder='Enter name of bank' required />
                            <input className={style.input} type="text" name='panNo' placeholder='Enter your PAN No.' required />
                        </div>
                    </div>
                </div>
                <h2 className={style.secondaryHeading}>Documents</h2>
                <div className={style.documents}>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="profilePhoto">Upload Profile Photo</label>
                        <input className={style.imgInp} type="file" name='profilePhoto' id='profilePhoto' required />
                    </div>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="aadharPhoto">Upload Aadhar Card Photo</label>
                        <input className={style.imgInp} type="file" name='aadharPhoto' id='aadharPhoto' required />
                    </div>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="panPhoto">Upload PAN Card Photo</label>
                        <input className={style.imgInp} type="file" name='panPhoto' id='panPhoto' required />
                    </div>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="salarySlips">Upload Salary Slips</label>
                        <input className={style.imgInp} type="file" name='salarySlips' id='salarySlips' required />
                    </div>
                </div>
                <button className={style.btn} type='submit'>Submit</button>
            </form>
        </div>
    </>
  );
}

export default CreateProfile;