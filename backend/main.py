from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auth, sessions, exercises

import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://placeholder.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(sessions.router)
app.include_router(exercises.router)
app.include_router(auth.router)

# to run server: uvicorn main:app --reload

@app.get("/")
def root():
    return {"Hello" : "World"}