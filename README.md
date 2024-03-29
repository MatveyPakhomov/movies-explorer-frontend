# **movies-explorer-frontend**

## О проекте:
Cервис для регистрации/авторизации пользователя с возможностью поиска фильмов и добавления их в избранное.<br>
Включает в себя фронтенд часть приложения.<br>
Стек: HTML, CSS, JS (React).

## Макет:
https://www.figma.com/file/PCw6lcX38eXNqxy2H2bHas/?node-id=891%3A3857

## Используемые инструменты:
- React
- JSX
- HOOKS
- API
- React Developer Tools
- Create React App
- react-router-dom {Routes, Route, Navigate, useNavigate}

## Основной функционал:
- Регистрация/Авторизация пользователя, использование cookie.
- Поиск фильмов.
- Добавление фильмов в избранное.
- Динамически изменение меню элементов в зависимости от статуса авторизации.
- Выход из профиля, удаление cookie.

## Инструкция по запуску:
Необходимы обе части приложения: frontend и backend (https://github.com/MatveyPakhomov/movies-explorer-api)<br>
1. Backend:
- Скачать или склонировать репозиторий
- Установить зависимости при помощи npm - `npm i`
- Запустить локальный сервер в режиме разработчика через nodemon - `npm run dev`
- Или запустить сборку в обычном режиме - `npm run start`<br>

2. Frontend:
- Установить зависимости при помощи npm - `npm i`
- Собрать билд - `npm run build`
- Запустить локальный сервер - `npm start`
