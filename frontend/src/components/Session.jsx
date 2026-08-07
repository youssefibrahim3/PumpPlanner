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

    async function handleAddExercise(exerciseData) {
        fetch(`${API_BASE}/sessions/${id}/exercises`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(exerciseData)
        })
        .then(async (response) => {
            const data = await response.json()
            if (response.status === 401) {
                localStorage.removeItem("token")
                navigate('/login')
                return
            }
            if (!response.ok) {
                throw new Error("Failed to create exercise")
            }
            return data
        })
        .then(data => {
            if (!data) return
            setExercises(
                [
                    ...exercises,
                    data
                ]
            )
        })
        .catch(error => {
            console.error(error)
        })
    }

    async function handleDeleteExercise(exerciseId) {
        fetch(`${API_BASE}/sessions/${id}/exercises/${exerciseId}`, {
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
                throw new Error(data.detail || "Exercise not found")
            }
            if (!response.ok) {
                throw new Error("Failed to delete exercise")
            }
        })
        .then(() => {
            setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
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
            handleGetSession()
        }
    }, [id])


    return (
        <div className="min-h-screen" style={{background:"linear-gradient(to bottom, #d16d54, #9a280b, #d16d54)"}}>
            <Header/>
            <div className="justify-center mx-auto py-24">

                {exercises.map(exercise => (
                    <ExerciseEntry key={exercise.id} exerciseData={exercise} onDelete={handleDeleteExercise} />
                ))}

                <button onClick={() => showAddForm(true)} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    + Add Exercise
                </button>
                {addForm && 
                <div>
                    <AddExerciseForm
                    onSubmit={(e) => {
                        handleAddExercise(e)
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