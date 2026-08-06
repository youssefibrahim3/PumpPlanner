from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession  # Renamed
from database import get_db
import models
import schemas
import bcrypt
from security import create_access_token

router = APIRouter()

@router.post("/auth/signup", response_model=schemas.UserRead)
def create_user(user : schemas.UserCreate, db : DBSession = Depends(get_db)):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user : models.User = models.User(username = user.username, hashed_password = hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/auth/login")
def login_user(user : schemas.UserCreate, db : DBSession = Depends(get_db)):
    accessed_user : models.User = db.query(models.User).filter(models.User.username == user.username).first()

    if not accessed_user or not bcrypt.checkpw(user.password.encode('utf-8'), accessed_user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=404, detail=f"Incorrect username or password.")

    token = create_access_token({"user_id" : accessed_user.id})
    return {"access_token" : token, "token_type" : "bearer"}
