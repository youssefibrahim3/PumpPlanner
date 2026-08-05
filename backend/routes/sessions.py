from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session as DBSession  # Renamed
from database import get_db
import models
import schemas

router = APIRouter() # basically just allows writing routes in diff file

@router.post("/sessions", response_model=schemas.SessionRead)
def create_session(session : schemas.SessionCreate, db : DBSession = Depends(get_db)):
    new_session = models.Session(name=session.name, date=session.date)
    db.add(new_session) # stages for addition
    db.commit() # adds to postgres
    db.refresh(new_session) # updates new_session with new postgres database
    return new_session # Bcz of response_model, this is automatically converted to schemas.SessionRead

@router.get("/sessions", response_model=schemas.SessionRead)
def get_session():
    pass