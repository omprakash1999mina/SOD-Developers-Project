import React from 'react'
import {Link} from 'react-router-dom';

function TopLanding() {
  return (
        <div className="container-fluid hero-header bg-light mb-5">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <h1 className="display-4 mb-3 animated slideInDown">Give Loan Take Loan <br/> With No Fikrrr</h1>
                    <p className="animated slideInDown">At Loan Corner, we understand that financial aspirations are the driving force behind your dreams. With our tailored loan solutions and personalized service, we empower you to reach new heights and turn possibilities into realities.</p>
                    <div classNameName="flex align-items-center">
                      <Link to="/loanRequests" className="btn btn-primary py-3 px-4 animated slideInDown">Become Lender</Link>
                      <Link to="/takeLoan" className="btn btn-primary py-3 px-4 animated slideInDown mx-4">Borrow Loan</Link>
                    </div>
                </div>
                <div className="col-lg-6 animated fadeIn">
                    <img className="img-fluid animated pulse infinite" src="img/banner-img.png" alt=""/>
                    {/* <img className="img-fluid animated pulse infinite" style="animation-duration: 3s;" src="img/hero-1.png" alt=""/> */}
                </div>
        </div>
      </div>
  )
}

export default TopLanding