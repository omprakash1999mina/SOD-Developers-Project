import React from "react";
import { Link } from "react-router-dom";
import style from './About.module.css';

const AboutUs = () => {
  return (
    <div className={style.mainContainer}>
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <img className="img-fluid" src="img/about.png" alt=""/>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="h-100">
                            <h1 className="display-6">About Us</h1>
                            <p className="text-primary fs-5 mb-4">The Most Trusted Loan Provider Platform</p>
                            <p>LoanCorner is a fintech early-stage platform that works on a C2C
                                business model. In this, people can quickly get or give a loan to
                                other individuals. Apart from that, individuals can ask other
                                individuals for some modification in the loan plan.</p>
                            <p className="mb-4">All the other issues like loan security etc. will be managed by The LoneCorner so that the individual can give or get loans quickly without concerning the difficulties.</p>
                            <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                                <span>Your Path to Financial Empowerment</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                                <span>Unlocking Financial Possibilities, One Step at a Time</span>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <i className="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                                <span>Fueling Your Dreams, Building Your Future</span>
                            </div>
                            <Link to={"/aboutus"} className="btn btn-primary py-3 px-4" >Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
