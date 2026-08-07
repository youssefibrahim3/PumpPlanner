import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
    const navigate = useNavigate()

    const [ loggingIn, setLoggingIn ] = useState(true)

    return (
        <div 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>
            
            { loggingIn ? (
                <LoginForm/>
            ) : (
                <SignUpForm/>
            )}

            <button
            className="bg-red-300 hover:bg-red-700 px-6 py-3 my-5 rounded-lg font-bold cursor-pointer" 
            onClick={() => setLoggingIn(!loggingIn)}
            >
            {loggingIn ? 'Not a user? Sign Up' : 'Already a user? Log In'}
            </button>

            <Footer/>
        </div>

    )
}