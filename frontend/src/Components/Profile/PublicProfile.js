import React from 'react';

import style from './PublicProfile.module.css';

const userData = {
    profilePhoto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EAjufrsaffFdvLMDspiG0w_MG0N7eHUPUjz0bkF-v3qO7aFyyKxpKLA5lt7m0P2O_ZI&usqp=CAU',
    name : 'Sudheer Kumar Prajapat',
    age : '20',
    gender : 'Male',
    email : 'example@gmail.com',
    ctc : '20000'
};

const PublicProfile = () => {
  return (
    <div className={style.coverContainer}>
        <div className={style.container}>
            <h1 className={style.heading}>Candidate Profile</h1>
            <div className={style.profilePhoto}>
                <img src={userData.profilePhoto} alt="Profile"/>
            </div>
            <div className={style.details}>
                <p className={style.detail}>Name : {userData.name}</p>
                <p className={style.detail}>Email : {userData.email}</p>
                <p className={style.detail}>Gender : {userData.gender}</p>
                <p className={style.detail}>CTC : {userData.ctc}</p>
                <p className={style.detail}>Age : {userData.age}</p>
            </div>
        </div>
    </div>
  );
}

export default PublicProfile;