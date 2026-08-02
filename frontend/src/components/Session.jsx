import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Session()
{
    const { id } = useParams()
    const navigate = useNavigate()

    const [session, setSession] = useState(null) // data for this session
    const [exercises, setExercises] = useState([]) // all exercises in the session currently
    const [addForm, showAddForm] = useState(false)

    useEffect(() => {
        setSession({
            id: 1,
            name: "Session1",
            date: "2026-07-30"
        })
        setExercises([
            { id : 1, exerciseName: "Squat", sets: [{reps: 5, weight: 135}] }, //Exercise form: id (int), name (string), sets (array of objects)
            { id : 2, exerciseName: "Bench", sets: [{reps: 12, weight: 225}]}
        ])
    }, [id])

    return (
        <div className="min-h-screen" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>
            <div className="justify-center mx-auto">


                <button onClick={showAddForm(true)} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold">
                    + Add Exercise
                </button>
                {addForm && 
                <div>
                    <p>content goes here</p>
                </div>
                }
            </div>
            <Footer/>
        </div>
    );

}