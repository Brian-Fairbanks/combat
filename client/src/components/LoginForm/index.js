import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function LoginForm() {

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [missingField, setMissingField] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        setWrongCredentials(false);
        setMissingField(false);
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (username && password) {
            // Check if right credentials
            // Log user in
            API.loginUser({
                username: username,
                password: password
            }).then(() => {
                console.log("User is logged in...");
                window.location.replace("/game");
            }).catch(err => {
                console.log("Something went wrong while logging in...", err);
                // Else, set wrongCredentials to true
                setWrongCredentials(true);
                // Throw an alert
            })
        } else {
            // Set missingField to true
            setMissingField(true);
            // Throw an alert
            console.log("Missing field(s).")
        }

    }

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-2/4 my-0 mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    ref={usernameRef}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    ref={passwordRef}
                />
                {
                    missingField ?
                        <p className="text-red-500 text-xs italic">Please fill in all fields.</p> :
                        ""
                }
                {
                    wrongCredentials ?
                        <p className="text-red-500 text-xs italic">Wrong username or password.</p> :
                        ""
                }
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleLogin}
                >
                    Log In
                </button>
                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/signup">
                    Sign up here.
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;