import React from 'react'
import {Link} from 'react-router-dom';
import style from './Home.module.css';
const Card = ({src,text,route}) => {
  return (
    <Link to={route} className={style.link}><div className={style.cardMainContainer}>
        <div className={style.cardTopContainer}>
            <img className={style.cardImage} src={src} alt='Card Background'/>
        </div>
        <div className={style.container}>
            <h1 className={style.cardText}>{text}</h1>
        </div>
    </div></Link>
  )
}

export default Card