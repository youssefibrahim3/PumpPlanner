from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession  # Renamed
from database import get_db
import models
import schemas

router = APIRouter() # basically just allows writing routes in diff file

@router.post("/sessions", response_model=schemas.SessionRead)
def create_session(session : schemas.SessionCreate, db : DBSession = Depends(get_db)):
    new_session : models.Session = models.Session(name=session.name, date=session.date)
    db.add(new_session) # stages for addition
    db.commit() # adds to postgres
    db.refresh(new_session) # updates new_session with new postgres database
    return new_session # Bcz of response_model, this is automatically converted to schemas.SessionRead

@router.get("/sessions", response_model=list[schemas.SessionRead])
def get_sessions(db : DBSession = Depends(get_db)):
    read_sessions : list[models.Session] = db.query(models.Session).all()
    return read_sessions

@router.get("/sessions/{id}", response_model=schemas.SessionRead)
def get_session_by_id(id : int, db : DBSession = Depends(get_db)):
    read_session : models.Session = db.query(models.Session).get(id)
    if read_session:
        return read_session
    else:
        raise HTTPException(status_code=404, detail=f"Session {id} not found")