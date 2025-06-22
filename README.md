Приложение для управления задачами (To-Do App)

Описание: 
приложение, где пользователи могут создавать, редактировать и удалять задачи, а также сортировать их по категориям и статусу.

Основные возможности:
Регистрация и аутентификация пользователей
Cоздание, просмотр, изменение, удаление задач

JWT-токены для авторизации

Докеризация (Dockerfile и docker-compose)

Быстрый старт
Клонируйте репозиторий:
git clone https://github.com/Revmirych/todo_app.git
cd todo_app

Создайте и активируйте виртуальное окружение:
python -m venv venv
venv\Scripts\activate  # Windows

# или
source venv/bin/activate  # Linux/Mac

Установите зависимости:
pip install -r requirements.txt

Запустите сервер:
uvicorn app.main:app --reload
Документация API: Откройте http://localhost:8000/docs
Запуск через Docker
docker build -t todo_back .
docker run -p 8000:8000 todo_app
