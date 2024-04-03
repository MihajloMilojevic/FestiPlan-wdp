import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";
import { useAppContext } from '../../context/contextProvider';
import NotFound from './404';
import { CardList, FestivalCard, HeroSection } from '../../components/client';
import styles from "../../styles/client/organizer.module.css"
import { Info, SearchableText } from '../../components/common';

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
                <h1><SearchableText text={organizer.name} /></h1>
            </HeroSection>
            <div className={styles.page}>
                <h2 className={styles.h2}><SearchableText text="Basic information:" /></h2>
                <div className={styles.info}>
                    <Info 
                        left={<SearchableText text="Address:" />}
                        breakLeft={false}
                        right={<SearchableText text={organizer.address} />}
                        breakRight={true}
                    />
                    <Info 
                        left={<SearchableText text="Email: " />}
                        breakLeft={false}
                        right={<a href={`mailto:${organizer.email}`}>{<SearchableText text={organizer.email}/>}</a>}
                        breakRight={true}
                    />
                    <Info 
                        left={<SearchableText text="Phone: " />}
                        breakLeft={false}
                        right={<a href={`tel:${organizer.contactPhone}`}>{<SearchableText text={organizer.contactPhone} />}</a>}
                        breakRight={true}
                    />
                    <Info 
                        left={<SearchableText text="Year of Establishment: " />}
                        breakLeft={true}
                        right={<SearchableText text={organizer.yearOfEstablishment} />}
                        breakRight={true}
                    />
                </div>
                <h2 className={styles.h2}><SearchableText text="Festivals:" /></h2>
                <CardList data={organizer.festivals.map(f => ({...f, organizerId}))} CardComponent={FestivalCard} />
            </div>
        </div>
    );
}

export default OrganizerPage;