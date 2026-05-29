from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, Integer, String
from datetime import datetime
from zoneinfo import ZoneInfo
from app.core import Base  

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(ZoneInfo("Asia/Kolkata"))
    )
    tasks = relationship("Task", back_populates="owner", cascade="all, delete-orphan")