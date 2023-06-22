import React from 'react'

function WhyUs() {
  return (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 500}}>
                <h1 className="display-6">Why Us!</h1>
                <p className="text-bold fs-5 mb-5">The Best In Finance Industry</p>
            </div>
            <div className="row g-5">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="d-flex align-items-start">
                        <img className="img-fluid flex-shrink-0" src="img/icon-7.png" alt=""/>
                        <div className="ps-4">
                            <h5 className="mb-3">Easy To Start</h5>
                            <span>Get started with our services effortlessly, as we ensure a seamless and hassle-free onboarding process.</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="d-flex align-items-start">
                        <img className="img-fluid flex-shrink-0" src="img/icon-6.png" alt=""/>
                        <div className="ps-4">
                            <h5 className="mb-3">Safe & Secure</h5>
                            <span>Rest assured with our services, as we prioritize the utmost safety and security of your valuable information and transactions.</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="d-flex align-items-start">
                        <img className="img-fluid flex-shrink-0" src="img/icon-5.png" alt=""/>
                        <div className="ps-4">
                            <h5 className="mb-3">Affordable Plans</h5>
                            <span>Our company offers a range of budget-friendly plans designed to meet your needs and financial goals.</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="d-flex align-items-start">
                        <img className="img-fluid flex-shrink-0" src="img/icon-4.png" alt=""/>
                        <div className="ps-4">
                            <h5 className="mb-3">Secure Storage</h5>
                            <span>Your data, our priority. We specialize in secure data management, safeguarding your valuable information with utmost diligence.</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="d-flex align-items-start">
                        <img className="img-fluid flex-shrink-0" src="img/icon-3.png" alt=""/>
                        <div className="ps-4">
                            <h5 className="mb-3">Protected By Insurance</h5>
                            <span>With us, your financial journey is safeguarded. We are proud to be a company protected by comprehensive insurance, ensuring your peace of mind.</span>
                            {/* <span>Your financial journey, secured. We're protected by comprehensive insurance for your peace of mind.</span> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="d-flex align-items-start">
                        <img className="img-fluid flex-shrink-0" src="img/icon-8.png" alt=""/>
                        <div className="ps-4">
                            <h5 className="mb-3">24/7 Support</h5>
                            <span>Experience round-the-clock support with our services, as our dedicated team is available 24/7 to assist you every step of the way.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default WhyUs
