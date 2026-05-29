from models import User, Task
from fastapi import FastAPI, HTTPException, Depends 
from core import engine, Base
from routes import router_users, router_tasks

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Task Manager API")
app.include_router(router_users)
app.include_router(router_tasks)

@app.get("/")
def root():
    return {"message": "Welcome to the Task Manager API!"}

