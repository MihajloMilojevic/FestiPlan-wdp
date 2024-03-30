import React from 'react';
import styles from "./OrganizerList.module.css";
import { useAppContext } from '../../../context/contextProvider';
import OrganizerCard from '../OrganizerCard/OrganizerCard';

function OrganizerList({organizers}) {
    return (
        <div className={styles.list}>
            {
                organizers.map((organizer) => (
                    <OrganizerCard key={organizer.id} organizer={organizer} />
                ))
            }
        </div>
    );
}

export default OrganizerList;