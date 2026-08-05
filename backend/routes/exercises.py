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

@router.get("/sessions/{id}", response_model=schemas.SessionRead)
def get_session_by_id(id : int, db : DBSession = Depends(get_db)):
    read_session : models.Session = db.query(models.Session).get(id)
    if read_session:
        return read_session
    else:
        raise HTTPException(status_code=404, detail=f"Session {id} not found")

@router.delete("/sessions/{id}", status_code=204)
def delete_session_by_id(id : int, db : DBSession = Depends(get_db)):
    read_session : models.Session = db.query(models.Session).get(id)
    if read_session:
        db.delete(read_session)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail=f"Session {id} not found")