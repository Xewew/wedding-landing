# Инструкция по подключению Telegram бота к свадебному лендингу

## Что уже настроено

Токен бота: `8868304668:AAE0ajl3mM5KdRZfYGAJWXnHjAUwYOZJJVE`
Chat ID: `1453758150`

## Шаг 1: Запуск webhook-сервера

Установите библиотеку:
```bash
pip install python-telegram-bot
```

Запустите сервер:
```bash
python webhook.py
```

Сервер запустится на порту 8080.

## Шаг 2: Доступ из интернета

Вариант A — ngrok (для тестирования):
```bash
ngrok http 8080
```
Получите URL вида `https://abc123.ngrok.io`

Вариант B — PythonAnywhere (для постоянной работы):
1. Зарегистрируйтесь на pythonanywhere.com
2. Загрузите webhook.py
3. Установите библиотеку в консоли
4. Настройте Web App

## Шаг 3: Обновите URL в script.js

Откройте файл `script.js` и замените строку 142:

```javascript
const WEBHOOK_URL = 'https://your-server.com/webhook';
```

На ваш реальный URL, например:
```javascript
const WEBHOOK_URL = 'https://abc123.ngrok.io/webhook';
```

## Проверка работы

1. Откройте лендинг в браузере
2. Заполните анкету и нажмите "Отправить"
3. В Telegram должно прийти сообщение с данными гостя

## Команды бота

- `/start` — Приветствие
- `/help` — Список команд
- `/stats` — Статистика ответов
