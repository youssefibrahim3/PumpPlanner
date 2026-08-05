from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession  # Renamed
from database import get_db
import models
import schemas

router = APIRouter() # basically just allows writing routes in diff file

@router.post("/sessions/{session_id}/exercises", response_model=schemas.ExerciseRead)
def create_exercise(session_id : int, exercise : schemas.ExerciseCreate, db : DBSession = Depends(get_db)):
    new_exercise : models.Exercise = models.Exercise(exerciseName = exercise.exerciseName, unit = exercise.unit, session_id = session_id)
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    
    for set in exercise.sets:
        new_set : models.Set = models.Set(reps = set.reps, weight = set.weight, exercise_id = new_exercise.id)
        db.add(new_set)

    db.commit()
    db.refresh(new_exercise)
    return new_exercise

@router.get("/sessions/{session_id}/exercises", response_model=list[schemas.ExerciseRead])
def get_exercises(session_id : int, db : DBSession = Depends(get_db)):
    read_exercises : list[models.Exercise] = db.query(models.Exercise).filter(models.Exercise.session_id == session_id).all()
    return read_exercises

@router.get("/sessions/{session_id}/exercises/{id}", response_model=schemas.ExerciseRead)
def get_exercise_by_id(session_id : int, id : int, db : DBSession = Depends(get_db)):
    read_exercise : models.Exercise = db.query(models.Exercise).filter(models.Exercise.session_id == session_id, models.Exercise.id == id).first()
    if read_exercise:
        return read_exercise
    else:
        raise HTTPException(status_code=404, detail=f"Exercise {id} in session {session_id} not found")
    
@router.delete("/sessions/{session_id}/exercises/{id}", status_code=204)
def delete_exercise_by_id(session_id : int, id : int, db : DBSession = Depends(get_db)):
    read_exercise : models.Exercise = db.query(models.Exercise).filter(models.Exercise.session_id == session_id, models.Exercise.id == id).first()
    if read_exercise:
        db.delete(read_exercise)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail=f"Exercise {id} in session {session_id} not found")