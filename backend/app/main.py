from models import User, Task
from fastapi import FastAPI, HTTPException, Depends 
from core import engine, Base
from routes import router_users, router_tasks
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Task Manager API")
app.include_router(router_users)
app.include_router(router_tasks)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to the Task Manager API!"}

