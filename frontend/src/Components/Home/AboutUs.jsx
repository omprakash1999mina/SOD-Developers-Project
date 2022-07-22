import React from "react";
import styles from "./Home.module.css";
import logo from "../../Assets/logo.jpg";

const AboutUs = () => {
  return (
    <div className={styles.mainAboutContainer}>
      <h1 className={styles.titleAbout}>About Us</h1>
      <div className={styles.imageContainerAbout}>
        <img src={logo} alt="Logo" className={styles.imageLogoAbout} />
      </div>
      <div className={styles.paraContainerAbout}>
        <p className={styles.paraAbout}>
          LoanCorner is a fintech early-stage platform that works on a C2C
          business model. In this, people can quickly get or give a loan to
          other individuals. Apart from that, individuals can ask other
          individuals for some modification in the loan plan. All the other
          issues like loan security etc. will be managed by The LoneCorner so
          that the individual can give or get loans quickly without concerning
          the difficulties.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
