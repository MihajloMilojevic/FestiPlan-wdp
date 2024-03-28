import React from 'react';
import { useParams } from 'react-router-dom';

function FestivalPage() {
    const params = useParams();
    return (
        <div>
            <h1 >Welcome to the Festival!</h1>
            {params.id && <h2>Festival ID: {params.id}</h2>}
        </div>
    );
}

export default FestivalPage;