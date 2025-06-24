from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.auth import router as auth_router
from app.categories import router as categories_router
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal
from app.models import Category



from app.tasks import router as tasks_router
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # ⬅️ какие домены можно
    allow_credentials=True,
    allow_methods=["*"],             # ⬅️ разрешаем все методы (GET, POST и т.д.)
    allow_headers=["*"],             # ⬅️ разрешаем все заголовки
)
app.include_router(tasks_router)
app.include_router(categories_router)
app.include_router(auth_router)
# Создание таблиц в базе
Base.metadata.create_all(bind=engine)

def seed_default_category():
    db = SessionLocal()
    if not db.query(Category).filter_by(name="Все задачи").first():
        db.add(Category(name="Все задачи", color="grey"))
        db.commit()
    db.close()

seed_default_category()

@app.get("/")
def read_root():
    return {"message": "FastAPI To-Do App стартанул!"}
