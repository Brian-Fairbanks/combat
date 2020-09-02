import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function Profile(props) {
    // Deconstruct
    const { user } = props;

    console.log(user);

    return (
        <div>
            {/* User Name and Icon */}
            <h1 className="text-center text-5xl bg-dark text-white">
                {user.username}
            </h1>


            <div className="flex mb-4 pt-5">
                    
                {/* friends section */}
                <div className="w-1/2">
                    <section className="max-w-sm rounded overflow-hidden shadow-lg bg-lblue m-auto">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Friends</div>
                            <div className="text-gray-700 text-base">
                                {
                                    user.friends.map(friend => {
                                        return (
                                            <Link to={"/user/friend"} className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white">
                                                {friend}
                                            </Link>
                                        )
                                    }).join("")
                                }
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
                        </div>
                    </section>
                </div>

                {/* Characters section */}
                <div class="w-1/2">
                    <section className="max-w-sm rounded overflow-hidden shadow-lg bg-lblue m-auto">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Characters</div>
                            <div className="text-gray-700 text-base">
                                {
                                    user.friends.map(friend => {
                                        return (
                                            <Link to={"/user/friend"} className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white">
                                                {friend}
                                            </Link>
                                        )
                                    }).join("")
                                }
                            </div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                        </div>
                    </section>
                </div>
            </div>


            {/* Entire Object for Reference */}

            {/* {JSON.stringify(user, null, 2)} */}
        </div>
    );
}

export default Profile;