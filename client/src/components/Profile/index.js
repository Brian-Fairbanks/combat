import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import UserContext from "../../utils/userContext";

function Profile(props) {
    // Deconstruct
    const { user } = props;

    // Current User
    const { user: curUser } = useContext(UserContext);

    const [owner, setOwner] = useState(false);

    useEffect(() => {
        if (user && curUser){
            if (user._id === curUser._id){
                setOwner(true);
            }
        }
    }, [curUser])
    

    return (
        <div>
            {/* User Name and Icon */}
            <h1 className="text-center text-5xl bg-dark text-white">
                {user.username}
                {owner?"(you)":""}
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
                <div className="w-1/2">
                    <section className="max-w-sm rounded overflow-hidden shadow-lg bg-lblue m-auto">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">
                                Characters
                                <Link to="/Character">+</Link>
                            </div>
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