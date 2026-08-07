import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Header()
{
    const navigate = useNavigate()
    const [ loggedIn, setLoggedIn ] = useState(false)

    function handleSignOut() {
        localStorage.removeItem("token")
        navigate('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        setLoggedIn(!!token)
    }, [])

    return (
        <header className="w-screen top-0 fixed z-50 bg-white/95 backdrop-blur-md shadow-md">
            <nav className="flex max-w-6xl mx-auto items-center justify-between px-10 py-4">
                <button type="button" onClick={() => navigate('/')} className="text-2xl font-black text-red-700 tracking-tight cursor-pointer">
                    Pump Planner
                </button>
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => navigate('/')} className="text-gray-700 hover:text-red-700 font-bold cursor-pointer transition">
                        Home
                    </button>
                    {loggedIn ? (
                        <button type="button" onClick={handleSignOut} className="bg-red-300 hover:bg-red-700 px-6 py-2.5 rounded-lg font-bold cursor-pointer transition">
                            Sign out
                        </button>
                    ) : (
                        <button type="button" onClick={() => navigate('/login')} className="bg-red-300 hover:bg-red-700 px-6 py-2.5 rounded-lg font-bold cursor-pointer transition">
                            Login
                        </button>
                    )}
                </div>

            </nav>
        </header>
    )

}