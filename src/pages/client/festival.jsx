import React from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

function FestivalPage() {
    const {organizerId, festivalId} = useParams();
    useTitle(`${festivalId} | FestiPlan`)
    return (
        <div>
            <h1>Welcome to the Festival!</h1>
            {festivalId && <h2>Festival ID: {festivalId}</h2>}
        </div>
    );
}

export default FestivalPage;