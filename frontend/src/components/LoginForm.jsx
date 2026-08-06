import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function LoginForm() {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    async function handleLogin(e)
    {
        e.preventDefault();
        
        // Put API call here using 'fetch' and then chaining. DO NOT use localstorage for login data once this works
        //localStorage.setItem("logged_in", true)
        //localStorage.setItem("username", username)
        //localStorage.setItem("password", password)
        //navigate('/dashboard')

        fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("token", data.access_token)
            navigate('/dashboard')
        })
        .catch(error => {
            setError("Could not reach the server")
            console.error(error)
        })
    }

    return (
        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl px-8 py-12">

        <div className="justify-center text-center gap-3 items-center"></div>
        
            <h1 className="text-white text-4xl backdrop-blur-md px-8 py-10">Login</h1>

            <form id="login_form" className="space-y-5 my-5">
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
                    <label htmlFor="password" className="text-white">Password</label>
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
                
                {error && <p className="text-white text-sm font-bold">{error}</p>}

                <button 
                className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"  
                type="submit" 
                onClick={handleLogin} 
                disabled={!(username.length > 0 && password.length > 0)}>
                Login
                </button>
            </form>
        </div >

    )
}