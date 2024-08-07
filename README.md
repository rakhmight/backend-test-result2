# backend-test-result

### Сборка и запуск
- в .env указать переменные:
```js
SERVER_PORT // порт сервера
DB_USER, DB_PASSWORD, DB_NAME, DB_HOST // имя БД, хост сервера MySQL, пользователь и его пароль
REDIS_DB_HOST, REDIS_DB_PORT, REDIS_DB_PASSWORD, REDIS_DB_INDEX // Праметры для подключения к Redis
JWT_PRIVATE_KEY, JWT_PUBLIC_KEY // ключи для шифрования jwt (RS256)
```

- устанавливаем зависимости:
```bash
npm i
```

- компилириуем код:
```bash
npm run build
```

- запускаем сервер:
```bash
npm run start
```

> P.S. Конечно всё можно было сделать и лучше: документация api, полные схемы к эндпоинтам, логирование, сбор и визуализация метрик. Извиняюсь ⌚