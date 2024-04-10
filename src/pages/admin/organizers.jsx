import React from 'react';
import useTitle from "../../hooks/useTitle";
import styles from "../../styles/admin/organizers.module.css";
import { useAppContext } from '../../context/contextProvider';
import { Link } from 'react-router-dom';
import { CardList } from '../../components/common';
import { OrganizerCard } from '../../components/admin';

function OrganizersPage() {
    useTitle("Organizers | FestiPlan")
    const {data} = useAppContext();
    return (
        <>
            <h1>Look at those organizers!</h1>  
            <CardList horizontal data={data.organizers} CardComponent={OrganizerCard} />
        </>
    );
}

export default OrganizersPage;