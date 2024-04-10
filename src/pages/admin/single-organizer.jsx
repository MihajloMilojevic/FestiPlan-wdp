import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";
import { useAppContext } from '../../context/contextProvider';
import NotFound from '../404';

function SingleOrganizerPage() {
    const {data} = useAppContext();
    const {organizerId} = useParams();
    const organizer = useMemo(() => data.organizers.find(o => o.id === organizerId), [data, organizerId]);
    useTitle(`${organizer?.name ?? "Not Found"} | FestiPlan`)

    if (!organizer) 
        return <NotFound url="/admin" />

    return (
        <div>
            {organizer.name}
        </div>
    );
}

export default SingleOrganizerPage;