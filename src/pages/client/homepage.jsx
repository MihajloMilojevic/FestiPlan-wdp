import React from 'react';
import useTitle from "../../hooks/useTitle";
import { SearchableText } from '../../components/common';
import { useAppContext } from '../../context/contextProvider';

function Homepage() {
    useTitle(`FestiPlan`)
    const { data } = useAppContext();
    return (
        <div>
            <h1>Welcome to the Homepage!</h1>
            <img src="/Logo.png" width={300}/>
            <pre>
                <SearchableText text={JSON.stringify(data, null, 2)} />
            </pre>
        </div>
    );
}

export default Homepage;