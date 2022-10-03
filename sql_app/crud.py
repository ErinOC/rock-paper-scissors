# Python functions to interact with the database.
# https://fastapi.tiangolo.com/tutorial/sql-databases/

from sqlalchemy.orm import Session

from . import models, schemas

def get_user(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: schemas.UserUpdate):
    # Find the user.
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    # Update the user's score.
    db_user.user_score = user.user_score
    db_user.opponent_score = user.opponent_score
    # Commit changes to the DB.
    db.commit()
    db.refresh(db_user)
    return db_user