import React from 'react';
import useTitle from "../../hooks/useTitle";
import data from "../../organizatori_festivala_srpski.json"
import { SearchableText } from '../../components/common';

function Homepage() {
    useTitle(`FestiPlan`)
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