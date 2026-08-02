import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExerciseEntry from "../components/ExerciseEntry";

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
            //Exercise structure: id (num), name (string), sets {reps, weight , amt of sets} (all num)
            { id : 1, exerciseName: "Squat", sets: [{reps: 5, weight: 135, amt: 3}] }, 
            { id : 2, exerciseName: "Bench", sets: [{reps: 12, weight: 225, amt: 3}]}
        ])
    }, [id])

    function addExercise(data)
    {
        setExercises(
            [
                ...exercises,
                data
            ]
        );

    }

    function deleteExercise(exerciseId)
    {

    }
    return (
        <div className="min-h-screen" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>
            <div className="justify-center mx-auto py-24">

                {exercises.map(exercise => (
                    <ExerciseEntry key={exercise.id} exerciseData={exercise} onDelete={deleteExercise} />
                ))}

                <button onClick={() => showAddForm(true)} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    + Add Exercise
                </button>
                {addForm && 
                <div>
                    <form onSubmit={addExercise}>
                        <input type="text"></input>
                    </form>
                </div>
                }
            </div>
            <Footer/>
        </div>
    );

}