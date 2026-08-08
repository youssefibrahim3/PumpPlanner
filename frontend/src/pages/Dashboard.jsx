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
    const [makingSession, setMakingSession] = useState(false)

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
        setMakingSession(false)
        setFetching(true)
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
        .finally(() => {
            setFetching(false)
        })
    }

    async function handleDeleteSession(e, sessionId) {
        e.stopPropagation()
        setFetching(true)
        fetch(`${API_BASE}/sessions/${sessionId}`, {
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
        .finally(() => {
            setFetching(false)
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

                    <div className="flex items-center gap-3">

                        {makingSession && (
                        <input 
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                        type="text"
                        onChange={(e) => setSessionName(e.target.value)} 
                        value={sessionName}
                        placeholder="Enter session name..."/>
                        )}

                        {makingSession ? (
                        <button onClick={handleCreateSession} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                            Create Session
                        </button>
                        ) : (
                        <button onClick={() => setMakingSession(true)} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                            + New Session
                        </button>
                        )}

                    </div>
                </div>

                {fetching ? (
                    <h1 className="text-white font-bold text-4xl">Loading...</h1>
                ) : (
                <div className="grid grid-cols-3 gap-5">
                    {sessions.map(session => (
                        <Card key={session.id} onClick={() => navigate(`/dashboard/session/${session.id}`)}>
                            <h2 className="text-xl font-bold">{session.name}</h2>
                            <p className="text-md text-gray-600">{session.date}</p>
                            <p className="text-md text-gray-600">{session.exercises.length} exercises</p>
                            <button title="Delete session" className="cursor-pointer bg-transparent border-none p-0" onClick={(e) => handleDeleteSession(e, session.id)}>
                                <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </button>
                        </Card>
                    ))}
                </div>
                )}

            </div>
            <Footer/>
        </div>
    );
}