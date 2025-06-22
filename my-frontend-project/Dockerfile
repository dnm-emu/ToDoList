# Базовый образ для Node.js
FROM node:18

# Рабочая директория внутри контейнера
WORKDIR /my-frontend-project

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной проект
COPY . .

# Открываем порт для Vite
EXPOSE 5173

# Запускаем dev-сервер
CMD ["npm", "run", "dev", "--", "--host"]