import { useState } from "react";
import Card from "./Card";

export default function ExerciseEntry({exerciseData, onDelete})
{
    return (
        <div className="block rounded-lg drop-shadow-red-900 bg-gray-300 border-black">
            <h1>{exerciseData.id} : {exerciseData.exerciseName}</h1>
            <h1>{exerciseData.sets.setamt} sets done of {exerciseData.sets.reps} reps of {exerciseData.sets.weight} lbs</h1>
        </div>
    );

}