import React, {useState} from 'react';

import style from './ModifyProfile.module.css';

const fetchedData = {
    profilePhoto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EAjufrsaffFdvLMDspiG0w_MG0N7eHUPUjz0bkF-v3qO7aFyyKxpKLA5lt7m0P2O_ZI&usqp=CAU',
    name : 'Sudheer Kumar Prajapat',
    age : '20',
    email : 'example@gmail.com',
    aadharNo : '123456789012',
    aadharPhoto : 'https://gujjupost.in/wp-content/uploads/2021/08/searchpng.com-sample-aadhaar-card-icon-png-image-free-download-1024x658.png',
    panNo : '123AB567890',
    panPhoto : 'https://images.livemint.com/img/2019/07/11/original/e-pan_card_download_1562831552156.PNG',
    ctc : '20000',
    salarySlips : ['https://www.hrcabin.com/wp-content/uploads/2021/05/Salary-slip-format-in-excel-download.png', 'https://i.pinimg.com/736x/ed/f6/28/edf6283d6955d5b8488e977e8613b557.jpg'],
    acHolderName : 'Sudheer Kumar Prajapat',
    acNo : '123456780123456',
    ifacCode : 'abc',
    bankName : 'PNB'
}

const ModifyProfile = () => {
    const [userData, setUserData] = useState(fetchedData);
    const handelChangeInput = (event)=> {
        const {name, value} = event.target; 
        setUserData({ ...userData, [name] : value}); // Modern React Destructuring Syntax
    }

  return (
    <>
        <div className={style.container}>
            <h1 className={style.primaryHeading}>Create Your Profile</h1>
            <form className={style.form}>
                <div className={style.bigBox}>
                    <div className={style.box}>
                        <h2 className={style.secondaryHeading}>Basic Details</h2>
                        <div className={style.basicDetails}>
                            <input className={style.input} value={userData.name} type="text" name='name' placeholder='Enter your name' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.age} type="text" name='age' placeholder='Enter your age' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.email} type="email" name='email' placeholder='Enter your email' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.aadharNo} type="text" name='aadharNo' placeholder='Enter your Aadhar No.' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.ctc} type="text" name='ctc' placeholder='Enter your CTC' required onChange={handelChangeInput}/>
                        </div>
                    </div>
                    <div className={style.box}>
                        <h2 className={style.secondaryHeading}>Bank Account Details</h2>
                        <div className={style.acDetails}>
                            <input className={style.input} value={userData.acHolderName} type="text" name='acHolderName' placeholder='Enter account holder name' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.acNo} type="text" name='acNo' placeholder='Enter account number' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.ifacCode} type="text" name='ifacCode' placeholder='Enter IFAC Code' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.bankName} type="text" name='bankName' placeholder='Enter name of bank' required onChange={handelChangeInput}/>
                            <input className={style.input} value={userData.panNo} type="text" name='panNo' placeholder='Enter your PAN No.' required onChange={handelChangeInput}/>
                        </div>
                    </div>
                </div>
                <h2 className={style.secondaryHeading}>Documents</h2>
                <div className={style.documents}>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="profilePhoto">Upload Profile Photo</label>
                        <input className={style.imgInp}  type="file" name='profilePhoto' id='profilePhoto'/>
                    </div>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="aadharPhoto">Upload Aadhar Card Photo</label>
                        <input className={style.imgInp}  type="file" name='aadharPhoto' id='aadharPhoto'/>
                    </div>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="panPhoto">Upload PAN Card Photo</label>
                        <input className={style.imgInp}  type="file" name='panPhoto' id='panPhoto'/>
                    </div>
                    <div className={style.imageInput}>
                        <label className={style.label} htmlFor="salarySlips">Upload Salary Slips</label>
                        <input className={style.imgInp} type="file" name='salarySlips' id='salarySlips'/>
                    </div>
                </div>
                <button className={style.btn} type='submit'>Submit</button>
            </form>
        </div>
    </>
  );
}

export default ModifyProfile;