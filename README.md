# КАК ЗАПУСТИТЬ АПИ И РАЗВЕРНУТЬ РЕДИС?????? 
## Это вопрос, который интересует каждого
### Шаг 1 - загрузите докер, не используйте сторонние сервера!
### Шог 2 - склонируйте репозиторий, перейдите в склонированную директорию и напишите в терминале 
```bash
  docker compose up --build
```
или 
```bash
   docker-compose up --build
```

Зависит от вашей версии докера

### Шаг 3 - перейдите в папку api и выполните следующую команду
```bash
npm/pnpm/yarn/bun start:dev
```

Выбор менеджера пакетов исключительно ваше дело

## Swagger (API UI) - localhost:3000/api