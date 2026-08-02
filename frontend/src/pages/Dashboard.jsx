import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Dashboard()
{
    const navigate = useNavigate();

    async function handleCreateSession() {
        navigate('/dashboard/session/new') // note to self: here the ID is 'new', ID is a string, use 'useparams()'
    }

    return (
        <div className="min-h-screen" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>

            <div className="container mx-auto px-16 pt-24 pb-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-white font-bold text-4xl">Your Sessions</h1>
                    <button onClick={handleCreateSession} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold">
                        + New Session
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {sessions.map(session => (
                        <Card key={session.id} onClick={() => navigate(`/dashboard/session/${session.id}`)}>
                            <h2 className="text-xl font-bold">{session.name}</h2>
                            <p className="text-sm text-gray-600">{session.date}</p>
                            <p className="text-sm text-gray-600">{session.exercises.length} exercises</p>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
}