import os
from dotenv import load_dotenv
from jose import jwt, JWTError
import bcrypt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session as DBSession
from database import get_db
import models

load_dotenv

SECRET_KEY = os.environ.get("JWT_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def hash_password(password : str) -> str:
    pass

def verify_password(password : str, hashed_password : str) -> bool:
    pass

def create_access_token(data : dict):
    pass

def get_current_user(token : str = Depends(oauth2_scheme), db : DBSession = Depends(get_db)):
    pass