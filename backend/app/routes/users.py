from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core import get_db
from app.schemas import UserCreate, UserLogin, UserPassword, UserResponse
from app.services import create_user, get_user, authenticate_user

router_users = APIRouter(prefix="/users", tags=["users"])

@router_users.post("/", response_model=UserResponse)
def create_user_route(user_data: UserCreate, db: Session = Depends(get_db)):
    return create_user(user_data, db)

@router_users.get("/{username}", response_model=UserResponse)
def get_user_route(username: str, db: Session = Depends(get_db)):
    return get_user(username, db)

@router_users.post("/login", response_model=UserResponse)
def authenticate_user_route(user_data: UserLogin, db: Session = Depends(get_db)):
    return authenticate_user(user_data.username, user_data.password, db)
