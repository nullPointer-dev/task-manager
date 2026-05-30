from sqlalchemy.orm import Session
from app.schemas import UserCreate
from app.models import User 
from fastapi import HTTPException, status
from app.security import hash_password, verify_password, create_access_token

def create_user(user_data: UserCreate, db: Session) -> User:
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    if not user_data.username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username is required")
    if not user_data.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password is required")
    new_user = User(username=user_data.username, password=hash_password(user_data.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user(username: str, db: Session) -> User:
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

def authenticate_user(username: str, password: str, db: Session) -> dict:
    user = db.query(User).filter(User.username == username).first()
    if (not user) or (verify_password(password, user.password) == False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(username=user.username)
    return {
        "access_token": token,
        "token_type": "bearer"
    }
