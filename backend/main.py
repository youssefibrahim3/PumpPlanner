from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database import engine, Base
from routes import auth, sessions

import models
import schemas


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(sessions.router)


# to run server: uvicorn main:app --reload
# pass in props using query parameter
#response_model
# @app.get/post
#path definition

@app.get("/")
def root():
    return {"Hello" : "World"}

@app.get("/test-db")
def test_db():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return {"db_connected" : True, "result" : result.scalar()}