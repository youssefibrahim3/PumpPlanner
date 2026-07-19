import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Card from "../components/Card";

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
        <Header/>

        <div className = "container mx-auto px-16 relative z-10 space-y-8">
            <h1 className="text-white font-bold text-6xl mb-4">
                Pump Planner
            </h1>

            <p className="text-xl text-gray-300 mb-8">
                Begin tracking your workouts today and double your progress.
            </p>

            <div className="container mx-auto align-middle"></div>
            <button onClick={() => navigate('/login')} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold hover:cursor-pointer">
                Get Started
            </button>

            <div className="grid grid-cols-3 gap-5">
                <div className="block rounded-xl drop-shadow-red-900 bg-gray-300 py-20 drop-shadow-lg">
                    <h2 className="text-black py-5 text-3xl text-center drop-shadow-sm drop-shadow-red-600">Create workout sessions</h2>
                    <p className="text-center text-black leading-loose">
                        Create individual workout sessions to represent each time you go out and lift. Organize them as you please and create reusable routines
                    </p>
                </div>
                <div className="block rounded-xl drop-shadow-red-900 bg-gray-300 py-20 drop-shadow-lg">
                    <h2 className="text-black py-5 text-3xl text-center drop-shadow-sm drop-shadow-red-600">Log your lifts</h2>
                    <p className="text-center text-black leading-loose">
                        Log any type of workout into your sessions and track your sets, weight, and reps per set. Track break times and optimize your gains.
                    </p>
                </div>
                <div className="block rounded-xl drop-shadow-red-900 bg-gray-300 py-20 drop-shadow-lg">
                    <h2 className="text-black py-5 text-3xl text-center drop-shadow-sm drop-shadow-red-600">Gain more muscle</h2>
                    <p className="text-center text-black leading-loose">
                        Gym tracking is proven to be highly evffective for building muscle and encouraging progressive overload. Begin tracking today to ensure your muscles are consistently challenged, and your goals are consistently hit. 
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}