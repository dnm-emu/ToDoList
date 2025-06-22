from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user():
    response = client.post(
        "/register",
        json={
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "password": "secret"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "johndoe"
    assert "id" in data

def test_login_user():
    response = client.post(
        "/login",
        json={
            "username": "johndoe",
            "password": "secret"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"