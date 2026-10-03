# TDWA02-02 — сборка и размещение на NGINX

## Разработка (локально)

```bash
cd lab2-react
npm run dev
```

Откройте http://localhost:5173 — приложение работает с API на порту 20000 (должны быть запущены Node.js и NGINX).

## Сборка для прокси-сервера

```bash
npm run build
```

В папке `dist/` появятся:
- `index.html`
- `assets/` (JS и CSS)

## Размещение на NGINX (порт 20000)

Чтобы открывать SPA по адресу **http://localhost:20000/TDWA02-02.html**:

1. Скопируйте `dist/index.html` в папку `lab2` как **TDWA02-02.html**.
2. Скопируйте содержимое `dist/assets/` в папку **lab2/assets/** (создайте папку, если её нет).

Итоговая структура в `lab2`:
- `TDWA02-01.html`, `TDWA02-01.js`, `TDWA02-01.css`
- `TDWA02-02.html`  ← собранная SPA
- `assets/`        ← файлы из dist/assets (index-xxx.js, index-xxx.css)

Текущий конфиг NGINX с `root lab2` уже раздаёт файлы из этой папки, поэтому:
- http://localhost:20000/TDWA02-01.html — HTML-версия
- http://localhost:20000/TDWA02-02.html — SPA (React)

## Важно

- Перед сборкой убедитесь, что в коде используется URL API:  
  `http://localhost:20000/api/Save-JSON:20000`
- Node.js (TDWA01-01) должен работать на порту 40000, NGINX — на 20000.
