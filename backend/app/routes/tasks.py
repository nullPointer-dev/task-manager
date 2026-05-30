from app.services import create_task, get_tasks, get_task, update_task, delete_task, get_user
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core import get_db
from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.dependencies import get_current_user
from app.models import User

router_tasks = APIRouter(prefix="/tasks", tags=["tasks"])

@router_tasks.post("/", response_model=TaskResponse)
def create_task_route(
    task_data: TaskCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    return create_task(current_user.username, task_data, db)

@router_tasks.get("/", response_model=list[TaskResponse])
def get_tasks_route(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    return get_tasks(current_user.username, db)

@router_tasks.get("/{task_id}", response_model=TaskResponse)
def get_task_route(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = get_user(current_user.username, db)
    task = get_task(task_id, db)
    if not task or task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router_tasks.put("/{task_id}", response_model=TaskResponse)
def update_task_route(
    task_id: int, 
    task_data: TaskUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    user = get_user(current_user.username, db)
    task = get_task(task_id, db)
    if not task or task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_task(task_id, task_data, db)

@router_tasks.delete("/{task_id}")
def delete_task_route(
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    user = get_user(current_user.username, db)
    task = get_task(task_id, db)
    if not task or task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    delete_task(task_id, db)
    return {"message": "Task deleted successfully"}
