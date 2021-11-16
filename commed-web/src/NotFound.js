import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

function NotFound(props) {
    return (
        <div className="notFoundDiv d-flex justify-content-center align-items-center">
            <div className="contentDivNotFound">
                <h1 className="notFoundTitle">404</h1>
                <h2>Not Found!</h2>
                <h4>The resource requested could not be found on the server.</h4>
                <a href="/" class="buttonGoHome mt-auto btn btn-primary">
                    Go Home
                </a>
            </div>
        </div>
    );
}

export default NotFound;