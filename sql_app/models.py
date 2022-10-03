# Classes that the SQLALchemy ORM will convert into database tables.
# Adapted from https://fastapi.tiangolo.com/tutorial/sql-databases/

from typing import Set
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


# TODO_REFACTOR: Scores are in the user table to time constraints.
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    user_score = Column(Integer, default=0)
    opponent_score = Column(Integer, default=0)
    # games = relationship("Game", back_populates="owner")


# class Game(Base):
#     __tablename__ = "games"

#     id = Column(Integer, primary_key=True, index=True)
#     user_score = Column(Integer)
#     opponent_score = Column(Integer)
#     owner_id = Column(Integer, ForeignKey("users.id"))
#     owner = relationship("User", back_populates="games")