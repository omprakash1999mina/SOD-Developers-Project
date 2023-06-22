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
                                    <a href="https://github.com/sudheerkrp" className="btn btn-square btn-light m-1" ><i className="fab fa-github"></i></a>
                                    {/* <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-facebook-f"></i></Link> */}
                                    <a href="mailto:omprakash.bairwa.eee20@iitbhu.ac.in" className="btn btn-square btn-light m-1" ><i className="fas fa-envelope"></i></a>
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
                                    <a href="https://github.com/omprakash1999mina" className="btn btn-square btn-light m-1" ><i className="fab fa-github"></i></a>
                                    {/* <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-facebook-f"></i></Link> */}
                                    <a href="mailto:omprakash.bairwa.eee20@iitbhu.ac.in" className="btn btn-square btn-light m-1" ><i className="fas fa-envelope"></i></a>
                                    <a href="https://in.linkedin.com/in/om-prakash-bairwa-a82a2b203?trk=people-guest_people_search-card" className="btn btn-square btn-light m-1" ><i className="fab fa-linkedin-in"></i></a>
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
                                    <a href="https://github.com/Devansh-gaur-1611" className="btn btn-square btn-light m-1" ><i className="fab fa-github"></i></a>
                                    {/* <Link to="#" className="btn btn-square btn-light m-1" ><i className="fab fa-facebook-f"></i></Link> */}
                                    <a href="mailto:omprakash.bairwa.eee20@iitbhu.ac.in" className="btn btn-square btn-light m-1" ><i className="fas fa-envelope"></i></a>
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
