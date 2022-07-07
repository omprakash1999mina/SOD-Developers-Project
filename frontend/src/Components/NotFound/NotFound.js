import React from 'react'
import  './NotFound.css'

const NotFound = () => {
    return (
        <div id="message">
            <h2>404</h2>
            <h1>Page Not Found</h1>
            <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
            <h3>Why am I seeing this?</h3>
            <p> Please the check the endpoint you searched .</p>
        </div>
    )
}

export default NotFound;