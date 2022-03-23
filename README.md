# movies-explorer-api
graduation project (backend)

| Адреса      |
| ------------- |
| 'https://api.kino-domino.nomoredomains.rocks'     |
| 'https://kino-domino.nomoredomains.rocks'     |
| 51.250.3.195  |

* запрос на `GET /users/me` возвращает информацию о пользователе (email и имя);
* `PATCH /users/me` — обновляет информацию о пользователе;
* `GET /movies` все сохранённые пользователем фильмы;
* `POST /movies` создаёт фильм с переданными в теле данными;
* `DELETE /movies/_id` удаляет сохранённый фильм по _id;
* `POST /signup` создаёт пользователя с переданными в теле данными;
* `POST /signin` возвращает JWT, если в теле запроса переданы правильные почта и пароль.
* все роуты, кроме `/signin` и `/signup`, защищены авторизацией
* ошибки API обрабатываются
    * используются статус-коды ошибок: 400, 401, 403, 404, 409, 500;
    * сообщение об ошибке соответсвует ее типу;
    * асинхронные обработчики завершены блоком catch;
    * API не возвращает стандартных ошибок базы данных или Node.js.
* настроено логгирование
    * запросы и ответы записываются в файл request.log;
    * ошибки записываются в файл error.log;
    * файлы логов не добавляются в репозиторий.
* используется модуль Helmet для установки заголовков, связанных с безопасностью
* настроен rate limiter: число запросов с одного IP в единицу времени ограничено
