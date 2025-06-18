from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.auth import get_current_user, get_db
from typing import List

router = APIRouter(prefix="/tasks", tags=["tasks"])

# Получить список задач пользователя
@router.get("/", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Task).filter(models.Task.owner_id == current_user.id).all()

# Создать новую задачу
@router.post("/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = models.Task(**task.dict(), owner_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# Обновить задачу по ID
@router.put("/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    for key, value in task.dict().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

# Удалить задачу
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    db.delete(task)
    db.commit()
    return {"detail": "Задача удалена"}