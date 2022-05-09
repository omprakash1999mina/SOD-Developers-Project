import React, {useState} from 'react';

import style from './Profile.module.css';

const userData = {
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

const Profile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.profilePhoto}>
          <img src={userData.profilePhoto} alt="Profile"/>
        </div>
        <div className={style.documentsPhoto}>
          <div className={style.aadharPhoto}>
            <img src={userData.aadharPhoto} alt="Aadhar Card"/>
          </div>
          <div className={style.panPhoto}>
            <img src={userData.panPhoto} alt="PAN Card"/>
          </div>  
        </div>
        <div className={style.slipsPhoto}>
          <img src={userData.salarySlips[currentIndex]} alt="Slips"/>
          <div className={style.buttons}>
            <button className={style.btn} onClick={() => ((currentIndex === 0)?(setCurrentIndex(userData.salarySlips.length-1)):(setCurrentIndex(currentIndex-1)))}>&lt;</button>
            <button className={style.btn} onClick={() => ((currentIndex === userData.salarySlips.length-1)?(setCurrentIndex(0)):(setCurrentIndex(currentIndex+1)))}>&gt;</button>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <h2 className={style.heading}>Basic Details</h2>
        <div className={style.basicDetails}>
          <p className={style.detail}>Name : {userData.name}</p>
          <p className={style.detail}>Age : {userData.age}</p>
          <p className={style.detail}>Email : {userData.email}</p>
          <p className={style.detail}>Aadhar Number : {userData.aadharNo}</p>
          <p className={style.detail}>PAN Number : {userData.panNo}</p>
          <p className={style.detail}>CTC : {userData.ctc}</p>
        </div>
        <h2 className={style.heading}>Account Details</h2>
        <div className={style.acDetails}>
          <p className={style.detail}>Account Holder Name : {userData.acHolderName}</p>
          <p className={style.detail}>Account Number : {userData.acNo}</p>
          <p className={style.detail}>IFAC Code of Bank : {userData.ifacCode}</p>
          <p className={style.detail}>Name of Bank : {userData.bankName}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;