import React from "react";
import Card from "./card";

import style from "./Home.module.css";
import giveLoan from "../../Assets/giveLoan.jpg";
import takeLoan from "../../Assets/takeLoan.jpg";
const Home = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.topContainer}>
        <h1 className={style.title}>
          Take Loan . Give Loan <br /> With No Fikrrr!!!!
        </h1>
      </div>
      <div className={style.middleContainer}>
        <h1 className={style.middleTitle}>Loan Section</h1>
        <div className={style.middleMainContainer}>
          <Card src={giveLoan} text="Want to give Loan" />
          <Card src={takeLoan} text="Want to take Loan" />
        </div>
      </div>
    </div>
  );
};

export default Home;
