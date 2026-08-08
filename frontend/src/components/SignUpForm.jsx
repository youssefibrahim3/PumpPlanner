import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function SignUpForm( {onLogin} ) {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ error, setError ] = useState("")

    const minPassLength = 6
    
    async function handleSignup(e)
    {
        e.preventDefault();

        // Checks
        if (password.length < minPassLength) {
            setError(`Password must be at least ${minPassLength} characters long`)
            return
        }
        if (password !== confirmPassword) {
            setError("Confirmed password must match password")
            return
        }

        fetch(`${API_BASE}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(async (response) => {
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.detail || "Signup failed")
            }
            onLogin()
        })
        .catch(error => {
            setError(error.message)
            console.error(error)
        })
    }

    return (
        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl px-8 py-12">
        
            <h1 className="text-white text-4xl backdrop-blur-md px-8 py-10">Sign Up</h1>

            <form id="signup_form" className="space-y-5 my-5" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="username" className="text-white">Username</label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/10 border border-black/20 rounded-xl px-4 py-4 transition"/>
                </div>
                
                <div>
                    <label htmlFor="password" className="text-white">Password (min. 6 characters)</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/10 border border-black/20 rounded-xl px-4 py-4 transition"/>
                </div>

                <div>
                    <label htmlFor="confirmpassword" className="text-white">Confirm Password</label>
                    <input 
                    type="password" 
                    id="confirmpassword" 
                    name="confirmpassword" 
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/10 border border-black/20 rounded-xl px-4 py-4 transition"/>
                </div>

                {error && <p className="text-white text-sm font-bold">{error}</p>}
                
                <button 
                className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"  
                type="submit"  
                disabled={!(username.length > 0 && password.length >= minPassLength && password === confirmPassword)}>
                Sign Up
                </button>
            </form>
        </div >

    )
}