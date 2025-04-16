# Вказуємо базовий образ
FROM node:16

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли package.json і package-lock.json (або yarn.lock)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів проекту
COPY . .

# Порт, на якому буде працювати додаток
EXPOSE 3000

# Команда для запуску додатку
CMD ["npm", "start"]
