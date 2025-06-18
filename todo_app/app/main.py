from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.auth import router as auth_router
from app.categories import router as categories_router

from app.tasks import router as tasks_router
app = FastAPI()
app.include_router(tasks_router)
app.include_router(categories_router)
app.include_router(auth_router)
# Создание таблиц в базе
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "FastAPI To-Do App стартанул!"}