import React from 'react';
import useTitle from "../../hooks/useTitle";
import {HeroSection, OrganizerList} from '../../components/client';
import { useAppContext } from '../../context/contextProvider';
import styles from "../../styles/client/homepage.module.css";
import { SearchableText } from '../../components/common';

function Homepage() {
    const { data } = useAppContext();
    useTitle(`FestiPlan`)
    return (
        <div>
            <HeroSection />
            <div className={styles.organizers_list_container}>
                <h2><SearchableText text={"Check out our organizers"} /></h2>
                <OrganizerList organizers={data.organizers}/>
            </div>
        </div>
    );
}

export default Homepage;