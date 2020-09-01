import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div className="w-full h-full min-h-screen bg-gray-200 p-8">
            <h1 className="text-5xl text-center mb-8">Login</h1>
            <LoginForm />
        </div>
    );
}

export default Login;