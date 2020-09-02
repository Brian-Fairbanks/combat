import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function Profile(props) {
    // Deconstruct
    const {user} = props;

    console.log(user);

    return (
        <div>
            <h1 className="text-center text-5xl">
                {user.username}
            </h1>
            {JSON.stringify(user, null, 2)}
        </div>
    );
}

export default Profile;