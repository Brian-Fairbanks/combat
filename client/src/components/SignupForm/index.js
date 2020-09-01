import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function SignupForm() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [missingField, setMissingField] = useState(false);
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);

    function handleSignup(e) {
        e.preventDefault();
        setPasswordNotMatch(false);
        setMissingField(false);
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (username && password && confirmPassword) {
            if (password === confirmPassword) {
                // Create user
                // Login user (take user to profile page or main page)
                API.signupUser({
                    username: username,
                    password: password
                }).then(() => {
                    console.log("User is signed up and logged in...");
                    window.location.replace("/game");
                }).catch(err => {
                    console.log("Something went wrong while signing up...", err);
                })
            } else {
                // Password doesn't match
                // Set passwordNotMatch to true
                setPasswordNotMatch(true);
                // Throw an alert
                console.log("Password doesn't match...please try again.")
            }
        } else {
            // Missing fields
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
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    ref={passwordRef}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="******************"
                    ref={confirmPasswordRef}
                />
                {
                    passwordNotMatch ?
                        <p className="text-red-500 text-xs italic">Password doesn't match.</p> :
                        ""
                }
                {
                    missingField ?
                        <p className="text-red-500 text-xs italic">Please fill in all fields.</p> :
                        ""
                }
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/login">
                    Log in here.
                </Link>
            </div>
        </form>
    );
}

export default SignupForm;