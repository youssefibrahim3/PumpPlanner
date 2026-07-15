import { useState, useEffect } from "react";

export default function HomePage() {

    return (
        <div 
        className="min-h-screen flex items-center justify-center text-white" 
        style={{background:"linear-gradient(to bottom, #5b5c5e, #9a280b, #5b5c5e)"}}>
        
        <div className = "container mx-auto px-16 relative z-10 space-y-8">
            <h1 className="text-white font-bold text-6xl mb-4">
                - Pump Planner -
            </h1>

            <p className="text-xl text-gray-300 mb-8">
                Begin tracking your workouts today and double your progress.
            </p>

            <button className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold">
                Get Started Now
            </button>
        </div>
        <p></p>

        </div>
    )
}