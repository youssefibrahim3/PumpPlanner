import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate()
    const { username, setUsername } = useState("")
    const { password, setPassword } = useState("")
    const { isLogin, setIsLogin } = useState(false)


    async function handleLogin(e)
    {
        e.preventDefault();
        
        // Put API call here using 'fetch' and then chaining
        localStorage.setItem("logged_in", true)
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        navigate('/dashboard')
    }

    return (
        <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
        
        <div className="justify-center text-center gap-3 items-center"></div>
        
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>

            <form id="login_form">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" onClick={handleLogin} disabled={!(username.length() > 0 && password.length > 0)}>Login</button>
            </form>
        </div>

    )
}