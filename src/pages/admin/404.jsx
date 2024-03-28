import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/admin">Go back to the homepage</Link>
        </div>
    );
};

export default NotFound;