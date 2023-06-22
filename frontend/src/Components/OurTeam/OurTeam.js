import React from 'react';
import {Link} from 'react-router-dom';

function OurTeam() {
  return( 
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto" style={{ maxWidth : 500 }}>
                    <h1 className="display-6 mb-5">Meet Our Professional Team Members</h1>
                </div>
                <div className="row justify-content-center">

                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div className="team-item rounded">
                            <img className="img-fluid" src="img/team-4.jpg" alt=""/>
                            <div className="text-center p-4">
                                <h5>Sudheer Kumar Prajapat</h5>
                                <span>Frontend Head</span>
                            </div>
                            <div className="team-text text-center bg-white p-4">
                                <h5>Sudheer Kumar Prajapat</h5>
                                <p>Frontend Head</p>
                                <div className="d-flex justify-content-center">
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-twitter"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-facebook-f"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-youtube"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-linkedin-in"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="team-item rounded">
                            <img className="img-fluid" src="img/team-2.jpg" alt=""/>
                            <div className="text-center p-4">
                                <h5>Om Prakash Bairwa</h5>
                                <span>Backend Head</span>
                            </div>
                            <div className="team-text text-center bg-white p-4">
                                <h5>Om Prakash Bairwa</h5>
                                <p>Backend Head</p>
                                <div className="d-flex justify-content-center">
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-twitter"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-facebook-f"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-youtube"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-linkedin-in"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="team-item rounded">
                            <img className="img-fluid" src="img/team-3.jpg" alt=""/>
                            <div className="text-center p-4">
                                <h5>Devansh Gaur</h5>
                                <span>Design Head</span>
                            </div>
                            <div className="team-text text-center bg-white p-4">
                                <h5>Devansh Gaur</h5>
                                <p>Design Head</p>
                                <div className="d-flex justify-content-center">
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-twitter"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-facebook-f"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-youtube"></i></Link>
                                    <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-linkedin-in"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
}
export default OurTeam
