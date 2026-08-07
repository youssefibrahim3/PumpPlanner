import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function Dashboard()
{
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]); //Array of session objects
    const [sessionName, setSessionName] = useState("")
    const [fetching, setFetching] = useState(true)

    const token = localStorage.getItem("token")

    async function getSessions() {
        fetch(`${API_BASE}/sessions`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then(async (response) => {
            const data = await response.json()
            if (response.status === 401) {
                localStorage.removeItem("token")
                navigate('/login')
                return
            }
            if (!response.ok) {
                throw new Error(data.detail || "Failed to load sessions")
            }
            return data
        })
        .then(data => {
            setSessions(data)
            setFetching(false)
        })
        .catch(error => {
            console.error(error)
        })
    }

    async function handleCreateSession() {
        fetch(`${API_BASE}/sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({name : sessionName || "New Session", date : new Date().toDateString()})
        })
        .then(async (response) => {
            const data = await response.json()
            if (response.status === 401) {
                localStorage.removeItem("token")
                navigate('/login')
                return
            }
            if (!response.ok) {
                throw new Error("Failed to create session")
            }
            return data
        })
        .catch(error => {
            console.error(error)
        })
        window.location.reload()
    }


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        if (token) {
            getSessions()
        }
    }, []);

    return (
        <div className="min-h-screen" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>

            <div className="container mx-auto px-16 pt-24 pb-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-white font-bold text-4xl">Your Sessions</h1>
                    <input 
                    className="justify- bg-white/10 border border-black/20 rounded-xl px-4 py-4 transition"
                    type="text"
                    onChange={(e) => setSessionName(e.target.value)} 
                    placeholder="Enter session name..."/>
                    <button onClick={handleCreateSession} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                        + New Session
                    </button>
                </div>

                {fetching && <h1 className="text-white font-bold text-4xl">Fetching...</h1>}
                
                <div className="grid grid-cols-3 gap-5">
                    {sessions.map(session => (
                        <Card key={session.id} onClick={() => navigate(`/dashboard/session/${session.id}`)}>
                            <h2 className="text-xl font-bold">{session.name}</h2>
                            <p className="text-md text-gray-600">{session.date}</p>
                            <p className="text-md text-gray-600">{session.exercises.length} exercises</p>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
}