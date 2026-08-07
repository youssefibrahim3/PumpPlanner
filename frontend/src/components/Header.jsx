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
        if (token) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
            if (loggedIn) {
                handleSignOut()
            }
        }

    }, [loggedIn])

    return (
        <header className=" w-screen top-0 fixed" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <nav className="items-center flex max-w-6xl justify-center px-10 py-4 w-full">

                <button type="button" onClick={() => navigate('/')} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    Home
                </button>
                {loggedIn ? 
                <button type="button" onClick={handleSignOut} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    Sign Out
                </button> :
                <button type="button" onClick={() => navigate('/login')} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    Login
                </button>
                }
            </nav>
        </header>
    )

}