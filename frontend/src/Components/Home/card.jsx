import React from 'react'

import style from './Home.module.css';
const Card = ({src,text}) => {
  return (
    <div className={style.cardMainContainer}>
        <div className={style.cardTopContainer}>
            <img className={style.cardImage} src={src} />
        </div>
        <div className={style.container}>
            <h1 className={style.cardText}>{text}</h1>
        </div>
    </div>
  )
}

export default Card