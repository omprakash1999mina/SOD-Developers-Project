import React from "react";
import style from "./Home.module.css";
import WhyUs from "./WhyUs";
import Services from "./Services";
import OurTeam from "../Footer/OurTeam";
import TopLanding from "./TopLanding";
import AboutUs from "../AboutUs/AboutUs";

const Home = () => {
  return (
    <div className={style.mainContainer}>
      <TopLanding/>
      <Services/>
      <AboutUs/>
      <WhyUs/>
      <OurTeam/>
    </div>
  );
};

export default Home;
