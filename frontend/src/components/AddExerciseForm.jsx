import { useState } from "react";

export default function AddExerciseForm({onSubmit, onCancel})
{
    const [exerciseName, setExerciseName] = useState("")
    const [sets, setSets] = useState([{reps: "", weight: ""}])
    const [unit, setUnit] = useState("lbs")

    function addSet(reps = "", weight = "") 
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
        <form onSubmit={handleSubmit} className="px-4 py-4 bg-red-100 rounded-xl mx-4 my-3">
            <input
            className="bg-red-300 px-3 py-3 rounded-lg" 
            type="text" 
            placeholder="Exercise Name" 
            value={exerciseName} 
            onChange={(e) => setExerciseName(e.target.value)} required/>

            <div className="flex-col gap-2">
                <select value={unit} onChange={(e) => setUnit(e.target.value)} required className="bg-red-300 my-3 px-4 py-2 rounded-lg">
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>

                {sets.map((set, i) => (
                    <div className="rounded-lg bg-red-300 my-3 py-3" key={i}>
                        
                        <h1 className="px-3 py-3 font-bold">Set {i + 1}</h1>
                        <input 
                        type="number" 
                        className="mx-3 px-3 bg-red-200 rounded-lg"
                        placeholder="Reps" 
                        value={set.reps} 
                        required 
                        onChange={(e) => updateSet(i, "reps", e.target.value)}/>

                        <input 
                        type="number" 
                        className="mx-3 px-3 bg-red-200 rounded-lg"
                        placeholder="Weight" 
                        value={set.weight} 
                        required 
                        onChange={(e) => updateSet(i, "weight", e.target.value)}/>

                        <button type="button" onClick={() => addSet(set.reps, set.weight)} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                            Duplicate
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addSet} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                    Add Set
                </button>
                
                <button type="submit" className="bg-red-300 hover:bg-red-700 px-6 mx-3 py-3 rounded-lg font-bold cursor-pointer">
                    + Create
                </button>

            </div>
        </form>
    )
}