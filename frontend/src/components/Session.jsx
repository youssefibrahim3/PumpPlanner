import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExerciseEntry from "../components/ExerciseEntry";
import AddExerciseForm from "../components/AddExerciseForm";
import { API_BASE } from "../api";

export default function Session()
{
    const { id } = useParams()
    const navigate = useNavigate()

    const [session, setSession] = useState(null) // data for this session
    const [exercises, setExercises] = useState([]) // all exercises in the session currently
    const [addForm, showAddForm] = useState(false)
    
    const token = localStorage.getItem("token")

    async function handleGetSession() {
        fetch(`${API_BASE}/sessions/${id}`, {
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
                throw new Error(data.detail || `Failed to load session ${id}`)
            }
            return data
        })
        .then(data => {
            setSession(data)
            setExercises(data.exercises)
        })
        .catch(error => {
            console.error(error)
        })
    }

    async function handleAddExercise() {

    }

    async function handleDeleteExercise() {

    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        if (token) {
            handleGetSession()
        }
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
        setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
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
                    <AddExerciseForm
                    onSubmit={(e) => {
                        addExercise(e)
                        showAddForm(false)
                    }}
                    onCancel={() => showAddForm(false)}
                    />
                </div>
                }
            </div>
            <Footer/>
        </div>
    );

}