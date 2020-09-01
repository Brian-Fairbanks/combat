import React from "react";
import SignupForm from "../components/SignupForm";

function Signup() {
    return (
        <div className="w-full h-full min-h-screen bg-gray-200 p-8">
            <h1 className="text-5xl text-center mb-8">Signup</h1>
            <SignupForm />
        </div>
    );
}

export default Signup;