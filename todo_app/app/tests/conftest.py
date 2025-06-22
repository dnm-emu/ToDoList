# app/tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
USER = {
    "username": "testuser",
    "password": "qwerty123",
    "first_name": "Тест",
    "last_name": "Юзер"
}


@pytest.fixture(scope="session")
def auth_header():
    # Пробуем зарегистрировать (если уже есть — игнорируем)
    client.post("/register", json=USER)

    # Логинимся
    resp = client.post("/login", json={
        "username": USER["username"],
        "password": USER["password"]
    })

    # ✅ Обработка если всё прошло успешно
    if resp.status_code == 200:
        token = resp.json()["access_token"]
        return {"Authorization": f"Bearer {token}"}

    # ❌ Ошибка — прерываем тесты
    pytest.fail("Не удалось получить access_token")