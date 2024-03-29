import React from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

function SingleOrganizerPage() {
    const params = useParams();
    useTitle(`${params.id} | FestiPlan`)
    return (
        <div>
            <h1>Look at this Organizer!</h1>
            {params.id && <h2>Organizer ID: {params.id}</h2>}
        </div>
    );
}

export default SingleOrganizerPage;