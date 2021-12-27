import React, {useContext, useEffect, useState} from 'react';
import db, {ContextGlobal} from "../../firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const  {aunty} = useContext(ContextGlobal)
    const {user} = useAuthState(aunty)

    return (
        <div>
            <img src={user.photoURL}/>
           <pre> Welcome, {user.displayName} its ur personal page </pre>
            {user.emailVerified}
           email: {user.email}
            {user.phoneNumber}
        </div>
    );
};

export default UserPage;