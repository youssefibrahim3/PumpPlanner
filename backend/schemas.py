from pydantic import BaseModel

class SessionCreate(BaseModel):
    name : str
    date : str

class SessionRead(BaseModel):
    pass

class ExerciseCreate(BaseModel):
    pass

class ExerciseRead(BaseModel):
    pass

class SetCreate(BaseModel):
    pass

class SetRead(BaseModel):
    pass

class UserCreate(BaseModel):
    username : str
    password : str

class UserRead(BaseModel):
    id : int
    username : str


