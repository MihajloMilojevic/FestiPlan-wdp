import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useTitle from "../../hooks/useTitle";

const ErrorPage = () => {
    const [params] = useSearchParams();
    useTitle(`Error ${params.get("id") ?? 500} | FestiPlan`)
    return (
        <div>
            <h1>Error {params.get("id") ?? 500}</h1>
            <p>{params.get("msg") ?? "There was on error"}</p>
            <Link to="/">Go back to the homepage</Link>
        </div>
    );
};

export default ErrorPage;