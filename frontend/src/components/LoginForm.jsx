import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")


    async function handleLogin(e)
    {
        e.preventDefault();
        
        // Put API call here using 'fetch' and then chaining. DO NOT use localstorage for login data once this works
        localStorage.setItem("logged_in", true)
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        navigate('/dashboard')
    }

    return (
        <div 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/10 border border-black/20 rounded-xl px-4 py-4 transition"/>
                </div>

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