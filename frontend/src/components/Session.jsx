import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Session()
{
    const sessionId = useParams()
    const navigate = useNavigate()

    const [session, setSession] = useState(null) // data for this session
    const [exercises, setExercises] = useState([]) // all exercises in the session currently
    
    useEffect(() => {
        setSession({
            id: 1,
            name: "Session1",
            date: "2026-07-30"
        })
        setExercises("Squat", "Bench", "Deadlift")
    })

    return (
        <div className="min-h-screen" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>
            <div className="justify-center mx-auto">

            </div>
            <Footer/>
        </div>
    );

}