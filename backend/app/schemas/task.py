from pydantic import BaseModel
from datetime import datetime
from pydantic import ConfigDict

class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    created_at: datetime
    completed: bool
    owner_id: int
    model_config = ConfigDict(from_attributes=True)


