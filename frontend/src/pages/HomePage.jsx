import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
        
        <div className = "container mx-auto px-16 relative z-10 space-y-8">
            <h1 className="text-white font-bold text-6xl mb-4">
                Pump Planner
            </h1>

            <p className="text-xl text-gray-300 mb-8">
                Begin tracking your workouts today and double your progress.
            </p>

            <div className="container mx-auto align-middle"></div>
            <button onClick={() => navigate('/login')} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold">
                Get Started
            </button>
        </div>
        <p></p>

        </div>
    )
}