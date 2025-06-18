from pydantic import BaseModel
from typing import Optional




class CategoryBase(BaseModel):
    name: str
    color: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True
# -------------------- Пользователи --------------------

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


# -------------------- Токены --------------------

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    refresh_token: str


# -------------------- Задачи --------------------

class TaskBase(BaseModel):
    text: str
    time: Optional[str] = None
    status: bool = False
    type: Optional[str] = None
    color: Optional[str] = None
    priority: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True