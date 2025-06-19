from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.auth import get_current_user

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[schemas.Category])
def get_categories(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Category).all()

@router.post("/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_category = db.query(models.Category).filter(models.Category.name == category.name).first()
    if db_category:
        raise HTTPException(status_code=400, detail="Категория с таким названием уже существует")
    if category.name.strip().lower() == "все задачи":
        raise HTTPException(status_code=400, detail="Эта категория создаётся автоматически и не может быть добавлена вручную")

    new_category = models.Category(**category.dict())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    if category.name.strip().lower() == "все задачи":
        raise HTTPException(status_code=403, detail="Эту категорию нельзя удалить")
    db.delete(category)
    db.commit()
    return {"detail": "Категория удалена"}

@router.put("/{category_id}")
def update_category(category_id: int, updated: schemas.CategoryCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    if category.name.lower() == "все задачи":
        raise HTTPException(status_code=403, detail="Эту категорию нельзя изменить")

    category.name = updated.name
    category.color = updated.color
    db.commit()
    db.refresh(category)
    return category