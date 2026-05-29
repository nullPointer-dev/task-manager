from app.schemas import TaskCreate, TaskUpdate
from app.models import Task, User
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

def create_task(username: str, task_data: TaskCreate, db: Session) -> Task:
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not task_data.title:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Title is required")
    new_task = Task(title=task_data.title, description=task_data.description, owner_id=user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_tasks(username: str, db: Session) -> list[Task]:
    tasks = []
    user = db.query(User).filter(User.username == username).first()
    if user:
        tasks = db.query(Task).filter(Task.owner_id == user.id).all()
    return tasks

def get_task(task_id: int, db: Session) -> Task:
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

def update_task(task_id: int, task_data: TaskUpdate, db: Session) -> Task:
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.completed is not None:
        task.completed = task_data.completed
    db.commit()
    db.refresh(task)
    return task

def delete_task(task_id: int, db: Session) -> None:
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    db.delete(task)
    db.commit()
    return None 
