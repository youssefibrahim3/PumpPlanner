import { useState } from "react";
import Card from "./Card";

export default function ExerciseEntry({data, onDelete})
{
    return (
        <div className="block rounded-lg drop-shadow-red-900 bg-gray-300 border-black">
            <h1>{data.exerciseName}</h1>
            
        </div>
    );

}