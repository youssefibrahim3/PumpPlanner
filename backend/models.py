from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    date = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    exercises = relationship("Exercise", back_populates="session", cascade="all, delete")

class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    exerciseName = Column(String, nullable=False)
    unit = Column(String, default="lbs")
    session_id = Column(Integer, ForeignKey("sessions.id"))

    session = relationship("Session", back_populates="exercises")
    sets = relationship("Set", back_populates="exercise", cascade="all, delete")

class Set(Base):
    __tablename__ = "sets"

    id = Column(Integer, primary_key=True, index=True)
    reps = Column(Integer, nullable=False)
    weight = Column(Float, nullable=False)
    exercise_id = Column(Integer, ForeignKey("exercises.id"))

    exercise = relationship("Exercise", back_populates="sets")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)