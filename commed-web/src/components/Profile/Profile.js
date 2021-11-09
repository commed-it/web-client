import React from 'react';
import { useParams } from 'react-router-dom'


function Profile(props) {

    const {userId} = useParams();

    return (
        <div>
            Hello From Profile {userId}!
        </div>
    );
}

export default Profile;