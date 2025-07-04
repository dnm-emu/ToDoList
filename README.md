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
git clone https://github.com/dnm-emu/ToDoList

cd ToDoList

cd my-frontend-project

npm install

npm run dev

cd todo_app

docker-compose up --build

Откройте frontend http://localhost:5173

# или
source venv/bin/activate  # Linux/Mac

Установите зависимости:
pip install -r requirements.txt

Запустите сервер:
uvicorn app.main:app --reload
Документация API: Откройте http://localhost:8000
Запуск через Docker
docker build -t todo_back .
docker run -p 8000:8000 todo_app


## Для мобильного приложения
cd mobile

npm install @capacitor/core @capacitor/cli

npx cap init

npx cap add android

npx cap sync andriod

npx cap open android

Ссылка на видео youtube (как работает мобилка)
**https://youtu.be/5ZMpDGFijl4**
