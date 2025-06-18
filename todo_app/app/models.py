from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Category(Base):
    
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    color = Column(String, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    tasks = relationship("Task", back_populates="owner")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    # — новое поле с текстом задачи
    text = Column(String, nullable=False)

    # — время в формате «HH:MM» (если нужно более строго, можно Time)
    time = Column(String)

    # — статус «выполнено/не выполнено»
    status = Column(Boolean, default=False)

    # — тип / категория (например: «Семья», «Работа» …)
    type = Column(String)

    # — цвет категории (hex-цвет или имя — как решишь на фронте)
    color = Column(String)

    # — приоритет (1 — высокий, 2 — средний, 3 — низкий и т.п.)
    priority = Column(Integer)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")