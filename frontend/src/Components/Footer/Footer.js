import React from 'react';
import {Link} from 'react-router-dom';

import style from './Footer.module.css';
// import logo from '../../Assets/logo.jpg';

const Footer = () => {
  return (
    <div className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h1 className="row text-white mb-4">
                        <div className={style.logo}>
                            <img className="img-fluid" src="img/logo.jpg" alt=""/>
                        </div>
                        LoanCorner</h1>
                    <p>Empowering Your Financial Growth, Every Step of the Way and Discover the Gateway to Financial Success with Loan Corner</p>
                    <div className="d-flex pt-2">
                        <Link to="#" className="btn btn-square me-1"><i className="fab fa-twitter"></i></Link>
                        <Link to="#" className="btn btn-square me-1"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="#" className="btn btn-square me-1"><i className="fab fa-youtube"></i></Link>
                        <Link to="#" className="btn btn-square me-0"><i className="fab fa-linkedin-in"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Get In Touch</h5>
                    <p><i className="fa fa-map-marker-alt me-3"></i>123 Street, New Delhi, India</p>
                    <p><i className="fa fa-phone-alt me-3"></i>+91 1234567890</p>
                    <p><i className="fa fa-envelope me-3"></i>info@example.com</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Quick Links</h5>
                    <Link to="/aboutus" className="btn btn-link">About Us</Link>
                    <Link to="/contactus" className="btn btn-link">Contact Us</Link>
                    <Link to="#" className="btn btn-link">Our Services</Link>
                    <Link to="#" className="btn btn-link">Terms & Condition</Link>
                    <Link to="#" className="btn btn-link">Support</Link>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Newsletter</h5>
                    <p>Stay informed, stay inspired. Our newsletter delivers finance updates directly to your inbox.</p>
                    <div className="position-relative mx-auto" style={{maxWidth: 400}}>
                        <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-secondary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <Link to="#">LoanCorner</Link>, All Right Reserved.
                        {/* &copy; <Link href="#">LoanCorner</Link>, All Right Reserved. */}
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        Designed By SOD Developers
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Footer;