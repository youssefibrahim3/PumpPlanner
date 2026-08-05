from fastapi import FastAPI
import bcrypt
import json

app = FastAPI()

# to run server: uvicorn main:app --reload
#path definition
@app.get('/')
def root():
    return {"Hello" : "World"}