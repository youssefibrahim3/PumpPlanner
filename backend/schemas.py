from pydantic import BaseModel, ConfigDict, field_validator

class SetCreate(BaseModel):
    reps : int
    weight : float

class SetRead(BaseModel):
    id : int
    reps : int
    weight : float

    model_config = ConfigDict(from_attributes=True)


class ExerciseCreate(BaseModel):
    exerciseName : str
    unit : str
    sets : list[SetCreate]

class ExerciseRead(BaseModel):
    id : int
    exerciseName : str
    unit : str
    sets : list[SetRead]

    model_config = ConfigDict(from_attributes=True)

class SessionCreate(BaseModel):
    name : str
    date : str

class SessionRead(BaseModel):
    id : int
    name : str
    date : str
    exercises : list[ExerciseRead]

    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    username : str
    password : str

    @field_validator('username')
    @classmethod
    def validate_username(cls, value : str):
        if ' ' in value:
            raise ValueError("Username cannot contain spaces")
        return value

    @field_validator('password')
    def validate_password(cls, value : str):
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters long")
        return value

class UserRead(BaseModel):
    id : int
    username : str

    model_config = ConfigDict(from_attributes=True)


