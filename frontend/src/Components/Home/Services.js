import React from 'react'
import {Link} from 'react-router-dom';

function Services() {
  return (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto" style={{maxWidth: 500}}>
                <h1 className="display-6 mb-5">We Provide professional Loan Services</h1>
            </div>
            <div className="row g-4 justify-content-center">
                

                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item rounded h-100 p-5">
                        <div className="d-flex align-items-center ms-n5 mb-4">
                            <div className="service-icon flex-shrink-0 bg-primary rounded-end me-4">
                                <img className="img-fluid" src="img/icon/icon-07-light.png" alt=""/>
                            </div>
                            <h4 className="mb-0">Moneylender</h4>
                        </div>
                        <p className="mb-4">Join us as a lender and make a meaningful impact. Empower dreams, shape a brighter financial future. Together, we can make a difference.</p>
                        <Link to="/loanRequests" className="btn btn-light px-3" >Become Lender</Link>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item rounded h-100 p-5">
                        <div className="d-flex align-items-center ms-n5 mb-4">
                            <div className="service-icon flex-shrink-0 bg-primary rounded-end me-4">
                                <img className="img-fluid" src="img/icon/icon-06-light.png" alt=""/>
                            </div>
                            <h4 className="mb-0">Borrowers</h4>
                        </div>
                        <p className="mb-4">Partnering with our lender opens doors to long-term relationships, as we strive to support your financial needs beyond a single transaction</p>
                        <Link to="/takeLoan" className="btn btn-light px-3" >Borrow Loan</Link>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item rounded h-100 p-5">
                        <div className="d-flex align-items-center ms-n5 mb-4">
                            <div className="service-icon flex-shrink-0 bg-primary rounded-end me-4">
                                <img className="img-fluid" src="img/icon/icon-05-light.png" alt=""/>
                            </div>
                            <h4 className="mb-0">Fixed Deposit</h4>
                        </div>
                        <p className="mb-4">Introducing our new Fixed Deposit service, with competitive interest rates and utmost fund safety through stringent security measures and regulatory compliance.</p>
                        <Link to="#" className="btn btn-light px-3" >Comming Soon</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Services