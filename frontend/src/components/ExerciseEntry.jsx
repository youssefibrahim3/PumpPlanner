import { useState } from "react";
import Card from "./Card";

export default function ExerciseEntry({exerciseData, onDelete})
{
    return (
        <div className="block rounded-lg drop-shadow-red-900 bg-gray-300 border-black my-2 py-5 text-center">
            <h2>{exerciseData.id} : {exerciseData.exerciseName} - {exerciseData.sets.length} set{exerciseData.sets.length > 1 && 's'}</h2>
            {exerciseData.sets.map((set, i) => 
                <div className="rounded-lg bg-red-300 my-3 py-3" key={i}>
                <h2 className="py-1" >Set {i+1} : {set.reps} reps @ {set.weight}{exerciseData.unit}</h2>
                </div>
            )}
            <button onClick={() => onDelete(exerciseData.id)} className="bg-red-300 hover:bg-red-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                - Delete Exercise
             </button> 
        </div>
    );

}