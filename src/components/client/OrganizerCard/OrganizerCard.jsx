import React from 'react';
import styles from "./OrganizerCard.module.css";
import { Link } from 'react-router-dom';
import { SearchableText } from '../../common';

function OrganizerCard({organizer}) {
    return (
        <Link to={`/organizerS/${organizer.id}`}>
            <div className={styles.card}>
                <div className={styles.image_container}>
                    <img src={organizer.logo} alt={organizer.name} className={styles.image}/>
                </div>
                <h2 className={styles.text}><SearchableText text={organizer.name} /></h2>
                <p className={styles.bagde}>{organizer.festivals.length}</p>
            </div>
        </Link>
    );
}

export default OrganizerCard;