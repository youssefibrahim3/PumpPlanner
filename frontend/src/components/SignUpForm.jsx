import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const navigate = useNavigate()
    const { username, setUsername } = useState("")
    const { password, setPassword } = useState("")
    const { loggingIn, setLoggingIn } = useState(false)

    function handleLogin(e)
    {

    }

    return (
        <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            
        
        </div>

    )
}