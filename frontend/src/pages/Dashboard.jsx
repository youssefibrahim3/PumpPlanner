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
        .then(data => {
            if (!data) return
            setSessions(prevSessions => [...prevSessions, data])
            setSessionName("")
        })
        .catch(error => {
            console.error(error)
        })
    }

    async function handleDeleteSession(sessionId) {
        fetch(`${API_BASE}/sessions/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(async (response) => {
            if (response.status === 401) {
                localStorage.removeItem("token")
                navigate('/login')
                return
            }
            if (response.status === 404) {
                const data = response.json()
                throw new Error(data.detail || `Session ${sessionId} not found`)
            }
            if (!response.ok) {
                throw new Error("Failed to delete session")
            }
        })
        .then(() => {
            setSessions(sessions.filter(session => session.id !== sessionId))
        })
        .catch(error => {
            console.error(error)
        })
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
                    value={sessionName}
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
                            <a onClick={() => handleDeleteSession(session.id)}>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </a>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
}