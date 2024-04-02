import React, {useMemo, useState} from 'react';
import useTitle from "../../hooks/useTitle";
import { useParams } from 'react-router-dom';
import {HeroSection, CardList, OrganizerCard} from '../../components/client';
import NotFound from './404';
import { useAppContext } from '../../context/contextProvider';
import styles from "../../styles/client/festival.module.css";
import { SearchableText } from '../../components/common';

function FestivalPage() {

    const [activeIndex, setActiveIndex] = useState(0);

    const {data} = useAppContext();
    const {organizerId, festivalId} = useParams();
    const organizer = useMemo(() => data.organizers.find(o => o.id === organizerId), [data, organizerId]);
    const festival = useMemo(() => {
        if (!organizer) return null;
        return organizer.festivals.find(f => f.id === festivalId);
    }, [organizerId, organizer, festivalId]);
    useTitle(`${festival?.name ?? "NotFound"} | FestiPlan`)
    if (!organizer || !festival) 
        return <NotFound />
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.gallery}>
                    {
                        festival.images.map((image, index) => (
                            <img className={`${styles.image} ${index === activeIndex ? styles.active : ""}`} key={index} src={image} alt={festival.name + (index+1)} />
                        ))
                    }
                </div>
                <div className={styles.content}>
                    <h1>{festival.name}</h1>
                    <p>{festival.description}</p>
                </div>
            </div>
            <button style={{margin: 20, padding: 10, fontSize: 30}} onClick={() => setActiveIndex(prev => (prev + 1) % festival.images.length)}>{"<"}</button>
            <button style={{margin: 20, padding: 10, fontSize: 30}} onClick={() => setActiveIndex(prev => (prev - 1 + festival.images.length) % festival.images.length)}>{">"}</button>
        </div>
    );
}

export default FestivalPage;