import { useState } from "react";
import Card from "./Card";

export default function ExerciseEntry({exerciseData, onDelete})
{
    return (
        <div className="block rounded-lg drop-shadow-red-900 bg-gray-300 border-black">
            <h1>{exerciseData.id} : {exerciseData.exerciseName} - {exerciseData.sets.length} set{exerciseData.sets.length > 1 && s}</h1>
            {exerciseData.sets.map((set, i) => 
                <h1 key={i}>Set {i+1} : {set.reps} reps at {set.weight}lbs</h1>
            )}
        </div>
    );

}