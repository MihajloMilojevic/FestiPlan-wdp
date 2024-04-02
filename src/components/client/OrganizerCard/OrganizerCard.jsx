import React from 'react';
import styles from "./OrganizerCard.module.css";
import { Link } from 'react-router-dom';
import { SearchableText } from '../../common';

function OrganizerCard({item: organizer}) {
    return (
        <Link to={`/organizers/${organizer.id}`}>
            <div className={styles.card}>
                <div className={styles.image_container}>
                    <img src={organizer.logo} alt={organizer.name} className={styles.image}/>
                </div>
                <h2 className={styles.text}><SearchableText text={organizer.name} /></h2>
                <p title="Number of active festivals" className={styles.bagde}><SearchableText text={organizer.festivals.length.toString()}/></p>
            </div>
        </Link>
    );
}

export default OrganizerCard;