import React from 'react';

import style from './Uploading.module.css';
import animation from '../../Assets/LoadingBar.gif';

const Uploading = () => {
  return (
    <>
        <div className={style.uploading}>
            <img src={animation} alt="Uploading"/>
        </div>
    </>
  );
}

export default Uploading;