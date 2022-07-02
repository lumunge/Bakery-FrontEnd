import React from 'react';
import { Redirect } from 'react-router';


export default function User() {

    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <>
        {user ? (
        <div>
            <br /><br /><br /><br />
            <h1>Welcome User</h1>
        </div>
        ) : <Redirect to="/auth" /> }
        </>
    )
}
