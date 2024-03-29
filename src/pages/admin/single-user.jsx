import React from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

function SingleUserPage() {
    const params = useParams();
    useTitle(`${params.id} | FestiPlan`)
    return (
        <div>
            <h1>Look at this User!</h1>
            {params.id && <h2>User ID: {params.id}</h2>}
        </div>
    );
}

export default SingleUserPage;