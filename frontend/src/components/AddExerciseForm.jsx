import { useState } from "react";

export default function AddExerciseForm({onSubmit, onCancel})
{
    const [exerciseName, setExerciseName] = useState("")
    const [sets, setSets] = useState([{reps: "", weight: ""}])
    
    function addSet() 
    {
        setSets(
            [
                ...sets,
                {reps: "", weight: ""}
            ]
        )
    }

    function updateSet(index, field, value) {
        setSets(sets.map((s, i) => i === index ? { ...s, [field]: value } : s))
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
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Exercise Name"></input>

            <button type="button" onClick={addSet} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                + Add Set
            </button>

            {sets.map((set, i) => {
                <div className="rounded-lg bg-red-300 my-3 py-3">
                    <h1>Set {i + 1}</h1>
                    <input type="number" placeholder="Reps" value={set.reps} required onChange={(e) => updateSet(i, "reps", e.target.value)}></input>
                    <input type="number" placeholder="Weight" value={set.weight} required onChange={(e) => updateSet(i, "reps", e.target.value)}></input>
                </div>
            })}

            <button type="submit" className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                Add
            </button>
        </form>
    )
}