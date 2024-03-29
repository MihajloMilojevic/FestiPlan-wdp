import React from 'react';
import useTitle from "../../hooks/useTitle";

function Homepage() {
    useTitle(`FestiPlan`)
    return (
        <div>
            <h1 >Welcome to the Homepage!</h1>
        </div>
    );
}

export default Homepage;