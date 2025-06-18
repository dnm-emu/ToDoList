from app.database import SessionLocal
from app import models

PRESET = [
    {"name": "Все задачи", "color": "gray"},
    {"name": "Семья", "color": "purple"},
    {"name": "Работа", "color": "green"},
]

db = SessionLocal()

for item in PRESET:
    exists = db.query(models.Category).filter_by(name=item["name"]).first()
    if not exists:
        db.add(models.Category(**item))

db.commit()
db.close()