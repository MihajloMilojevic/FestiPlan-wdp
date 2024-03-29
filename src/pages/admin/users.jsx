import React from 'react';
import useTitle from "../../hooks/useTitle";

function UsersPage() {
    useTitle(`Users | FestiPlan`)
    return (
        <div>
            <h1>Look at those users!</h1>
        </div>
    );
}

export default UsersPage;