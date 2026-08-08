from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auth, sessions, exercises
from fastapi.responses import JSONResponse
import traceback

import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.exception_handler(Exception)
async def debug_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": str(exc), "traceback": traceback.format_exc()},
    )

origins = [
    "https://pump-planner-frontend.vercel.app",
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