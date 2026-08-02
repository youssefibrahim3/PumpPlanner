import { useState } from "react";

export default function AddExerciseForm({onSubmit, onCancel})
{
    const [exerciseName, setExerciseName] = useState("")
    const [sets, setSets] = useState([{reps: "", weight: ""}])
    
    function addSet() 
    {

    }

    function handleSubmit(e) 
    {
        e.preventDefault()
        onSubmit({
            id: Date.now(),
            exerciseName,
            sets: sets.map(set => ({reps: Number(set.reps), weight: Number(set.weight)}) )
        })
    }
    return (
        <form>
            <input type="text"></input>
            <input type="time"></input>
        </form>
    )
}