# The schema classes allow us to define what the API returns to the user.
# Pydantic's BaseModel provides validation errors.
# Adapted from https://fastapi.tiangolo.com/tutorial/sql-databases/

from typing import List, Union

from pydantic import BaseModel

# class GameCreate(BaseModel):
#     owner_id: int

# class Game(BaseModel):
#     id: int
#     owner_id: int
#     user_score = int
#     opponent_score = int

#     # Tells Pydantic to read the data regardless of whether it is a dict
#     # or an ORM object.
#     class Config: 
#         orm_mode = True

class UserCreate(BaseModel):
    email: str
    name: str

class User(BaseModel):
    id: int
    email: str
    name: str
    user_score: int
    opponent_score: int
    # games: List[Game] = []

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    email: str
    user_score: int
    opponent_score: int

    class Config:
        orm_mode = True
