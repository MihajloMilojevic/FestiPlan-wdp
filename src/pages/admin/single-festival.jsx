import React from 'react';
import { useParams } from 'react-router-dom';

function SingleFestivalPage() {
    const params = useParams();
    return (
        <div>
            <h1>Look at this Festival!</h1>
            {params.id && <h2>Festival ID: {params.id}</h2>}
        </div>
    );
}

export default SingleFestivalPage;