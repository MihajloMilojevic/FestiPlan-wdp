import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";
import { useAppContext } from '../../context/contextProvider';
import NotFound from './404';
import { CardList, FestivalCard, HeroSection } from '../../components/client';
import styles from "../../styles/client/organizer.module.css"

function OrganizerPage() {
    const {data} = useAppContext();
    const {organizerId} = useParams();
    const organizer = useMemo(() => data.organizers.find(o => o.id === organizerId), [data, organizerId]);
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
                <h2 className={styles.h2}>Basic information:</h2>
                <p className={styles.p}><span>Address:</span> <div /> <span>{organizer.address}</span></p>
                <p className={styles.p}><span>Email:</span> <div /> <a href={`mailto:${organizer.email}`}>{organizer.email}</a></p>
                <p className={styles.p}><span>Phone:</span> <div /> <a href={`tel:${organizer.contactPhone}`}>{organizer.contactPhone}</a></p>
                <p className={styles.p}><span>Year of Establishment:</span> <div /> <span>{organizer.yearOfEstablishment}</span></p>
                <h2 className={styles.h2}>Festivals:</h2>
                <CardList data={organizer.festivals.map(f => ({...f, organizerId}))} CardComponent={FestivalCard} />
            </div>
        </div>
    );
}

export default OrganizerPage;