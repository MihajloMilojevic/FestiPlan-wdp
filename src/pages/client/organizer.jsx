import React from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

function OrganizerPage() {
    const params = useParams();
    useTitle(`${params.id} | FestiPlan`)
    return (
        <div>
            <h1 >Welcome to the OrganizerPage!</h1>
            {params.id && <h2>Orginizer ID: {params.id}</h2>}
        </div>
    );
}

export default OrganizerPage;