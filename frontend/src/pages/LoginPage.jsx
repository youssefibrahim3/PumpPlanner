import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LoginPage() {
    const navigate = useNavigate()

    const [ loggingIn, setLoggingIn ] = useState(true)

    return (
        <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            
            
            { loggingIn ? (
                <LoginForm/>
            ) : (
                <SignUpForm/>
            )}

            <button
            className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer" 
            onClick={() => setLoggingIn(!loggingIn)}
            >
            Swap
            </button>
        </div>

    )
}