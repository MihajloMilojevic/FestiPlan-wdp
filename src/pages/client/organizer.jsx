import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";
import { useAppContext } from '../../context/contextProvider';
import NotFound from './404';
import { CardList, FestivalCard, HeroSection } from '../../components/client';
import styles from "../../styles/client/organizer.module.css"

function OrganizerPage() {
    const {data} = useAppContext();
    const params = useParams();
    const organizer = useMemo(() => data.organizers.find(o => o.id === params.id), [data, params.id]);
    useTitle(`${organizer?.name ?? "Not Found"} | FestiPlan`)
    // console.log(organizer)
    if (!organizer) 
        return <NotFound />
    return (
        <div>
            <HeroSection imageSrc={organizer.logo}>
                <h1>{organizer.name}</h1>
            </HeroSection>
            <div className={styles.page}>
                <h2>Basic information:</h2>
                <p>Address: {organizer.address}</p>
                <p>Email: {organizer.email}</p>
                <p>Phone: {organizer.contactPhone}</p>
                <p>Year of Establishment: {organizer.yearOfEstablishment}</p>
                <h2>Festivals:</h2>
                <CardList data={organizer.festivals} CardComponent={FestivalCard} />
            </div>
        </div>
    );
}

export default OrganizerPage;