import React, {useState} from 'react';

import style from './AccountStatus.module.css';

const AccountStatus = () => {
    const [balance, setBalance] = useState(0);
    return (
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <h1 className={style.primaryHeading}>Your Account Status</h1>
                    <h2 className={style.secondaryHeading}>Current Bank Balance : {balance}</h2>
                    <div className={style.innerBox}>
                        <button className={style.btn}>Deposit</button>
                        <button className={style.btn}>Withdraw</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountStatus;