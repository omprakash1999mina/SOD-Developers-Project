import React from 'react'
import style from "./NotFound.module.css";
// import  './NotFound.css'
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        //     <h2>404</h2>
        //     <h1>Page Not Found</h1>
        //     <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
        //     <h3>Why am I seeing this?</h3>
        //     <p> Please the check the endpoint you searched .</p>
        <div className={style.mainContainer}>
            <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container text-center">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
                            <h1 class="display-1">404</h1>
                            <h1 class="mb-4">Page Not Found</h1>
                            <p class="mb-4">We're sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                            <Link to={"/"} class="btn btn-primary py-3 px-4" >Go Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;