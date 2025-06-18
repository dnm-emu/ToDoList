from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Путь к базе SQLite (файл будет создан в корне проекта)
SQLALCHEMY_DATABASE_URL = "sqlite:///./todo.db"

# Движок подключения
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Сессия — объект, через который мы делаем запросы
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для всех моделей
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()