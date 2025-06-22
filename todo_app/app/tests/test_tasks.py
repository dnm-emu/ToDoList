"""CRUD-тесты задач"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_get_update_delete_task(auth_header):
    # ── создание ─────────────────────────────────────
    resp = client.post("/tasks", headers=auth_header, json={
        "text": "Сделать тесты",
        "time": "12:00",
        "status": False,
        "type": "Учёба",
        "priority": 1,
        "color": "blue"
    })
    assert resp.status_code == 200
    task = resp.json()
    task_id = task["id"]

    # ── получение списка ─────────────────────────────
    resp_list = client.get("/tasks", headers=auth_header)
    assert resp_list.status_code == 200
    assert any(t["id"] == task_id for t in resp_list.json())

    # ── обновление ───────────────────────────────────
    resp_upd = client.put(f"/tasks/{task_id}", headers=auth_header, json={
        "text": "Сделать автотесты",
        "time": "13:00",
        "status": True,
        "type": "Учёба",
        "priority": 2,
        "color": "blue"
    })
    assert resp_upd.status_code == 200
    assert resp_upd.json()["status"] is True

    # ── удаление ─────────────────────────────────────
    resp_del = client.delete(f"/tasks/{task_id}", headers=auth_header)
    assert resp_del.status_code == 200