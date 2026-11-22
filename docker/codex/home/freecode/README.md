# Home Freecode Academy

Отдельный профиль чата сайта: google/gemini-3.1-flash-lite-preview через OpenRouter Responses API. Ключ передаётся контейнеру через CHAT_API_KEY.

Инструкции строятся в server/chat/systemMessage.ts, инструменты берутся из server/chat/tools/registry.ts и передаются через dynamicTools. Вызовы исполняет сервер сайта с авторизацией текущего пользователя; без неё GraphQL читает только доступные анонимному посетителю данные. Навык site-data объясняет чтение статьи по URL текущей страницы через detailPage(kind: resource, uri: …); база знаний читается через concept(where: { uri }). Полный текст навыка доступен через read_skill.

Сервер сохраняет сообщения и вызовы инструментов в штатное хранилище чата. Модель для get_system_info берётся из ответа app-server. Встроенные shell, файловые инструменты и навыки хоста отключены.

В docker/.env выбран CODEX_HOME_PATH=./codex/home/freecode. В корневом .env пути CODEX_TRANSPORT_TOKEN_FILE и CODEX_SESSION_DIRECTORY указывают на этот же home. Приложение на хосте подключается к ws://127.0.0.1:14520; внутри Compose используется полный адрес freecode-academy-codex-1:4500.

transport-token — отдельный секрет с правами 0600; website-sessions, sessions, базы и логи игнорируются Git. История и авторизация прежнего home не копируются. При переключении браузер получает новый токен диалога: старые токены подписаны другим секретом. Прежний home сохранён.

## Проверка запуска

23 ноября 2026 контейнер freecode-academy-codex-1 пересоздан с этим home. Приложение на хосте использует новый транспортный токен. Через серверный обработчик с MemoryStorage и настоящим GraphQL API приложения проверены пересказ статьи по контексту страницы, read_skill, graphql_request, продолжение диалога и get_system_info. Оба ответа OpenRouter успешны; модель сообщила google/gemini-3.1-flash-lite-preview. MemoryStorage использовался только в проверке, чтобы не отправлять тестовые уведомления администраторам. Обычный обработчик сайта использует ChatStorage. Ручная проверка в браузере не проводилась.
