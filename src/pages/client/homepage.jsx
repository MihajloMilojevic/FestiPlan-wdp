import React from 'react';
import useTitle from "../../hooks/useTitle";
import {HeroSection, CardList, OrganizerCard} from '../../components/client';
import { useAppContext } from '../../context/contextProvider';
import styles from "../../styles/client/homepage.module.css";
import { SearchableText } from '../../components/common';

function Homepage() {
    const { data, modal } = useAppContext();
    useTitle(`FestiPlan`)
    return (
        <div>
            <HeroSection imageSrc="/hero-image.jpg" fireworks>
                <h1><SearchableText text="FestiPlan" /></h1>
                <p><SearchableText text="Bringing festivities to life, one plan at the time!" /></p>
            </HeroSection>
            
            <div className={styles.organizers_list_container}>
                <h2><SearchableText text={"Check out our organizers"} /></h2>
                <CardList data={data.organizers} CardComponent={OrganizerCard} />
            </div>
        </div>
    );
}

export default Homepage;