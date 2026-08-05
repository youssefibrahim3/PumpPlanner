import { useState } from "react";

export default function AddExerciseForm({onSubmit, onCancel})
{
    const [exerciseName, setExerciseName] = useState("")
    const [sets, setSets] = useState([{reps: "", weight: ""}])
    const [unit, setUnit] = useState("lbs")

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
            unit,
            sets: sets.map(set => ({reps: Number(set.reps), weight: Number(set.weight)}) )
        })
    }

    return (
        <form onSubmit={handleSubmit} className="px-4">
            <input 
            type="text" 
            placeholder="Exercise Name" 
            value={exerciseName} 
            onChange={(e) => setExerciseName(e.target.value)} required/>

            <button type="button" onClick={addSet} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                + Add Set
            </button>

            <div className="flex-col gap-2">
                <select value={unit} onChange={(e) => setUnit(e.target.value)} required className="bg-red-300">
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>

                {sets.map((set, i) => (
                    <div className="rounded-lg bg-red-300 my-3 py-3" key={i}>
                        
                        <h1>Set {i + 1}</h1>
                        <input 
                        type="number" 
                        placeholder="Reps" 
                        value={set.reps} 
                        required 
                        onChange={(e) => updateSet(i, "reps", e.target.value)}/>

                        <input 
                        type="number" 
                        placeholder="Weight" 
                        value={set.weight} 
                        required 
                        onChange={(e) => updateSet(i, "weight", e.target.value)}/>

                    </div>
                ))}

                <button type="submit" className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    Add
                </button>
            </div>
        </form>
    )
}