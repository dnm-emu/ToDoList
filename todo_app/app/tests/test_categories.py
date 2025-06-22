"""CRUD-тесты категорий"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_get_delete_category(auth_header):
    # создаём
    resp = client.post("/categories", headers=auth_header, json={
        "name": "Учёба",
        "color": "blue"
    })
    assert resp.status_code == 200
    category = resp.json()
    cat_id = category["id"]

    # получаем список
    resp = client.get("/categories", headers=auth_header)
    assert resp.status_code == 200
    cats = resp.json()
    assert any(c["id"] == cat_id for c in cats)

    # удаляем
    resp_del = client.delete(f"/categories/{cat_id}", headers=auth_header)
    assert resp_del.status_code == 200