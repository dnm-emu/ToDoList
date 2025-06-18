from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[schemas.Category])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

@router.post("/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = db.query(models.Category).filter(models.Category.name == category.name).first()
    if db_category:
        raise HTTPException(status_code=400, detail="Категория с таким названием уже существует")

    new_category = models.Category(**category.dict())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category