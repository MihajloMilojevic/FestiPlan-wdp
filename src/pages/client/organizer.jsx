import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";
import { useAppContext } from '../../context/contextProvider';
import NotFound from './404';

function OrganizerPage() {
    const {data} = useAppContext();
    const params = useParams();
    const navigate = useNavigate();
    const organizer = useMemo(() => data.organizers.find(o => o.id === params.id), [data, params.id]);
    useTitle(`${organizer?.name ?? "Not Found"} | FestiPlan`)
    console.log(organizer)
    if (!organizer) 
        return <NotFound />
    return (
        <div>
            <h1 >Welcome to the OrganizerPage!</h1>
            {params.id && <h2>Orginizer ID: {params.id}</h2>}
        </div>
    );
}

export default OrganizerPage;