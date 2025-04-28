
<img src="./_docs/logo.png" alt="" align="center" width="225">

<h1 align="center">Lophius</h1>

Этот проект предназначен для автоматизации процесса сбора, обновления и упорядочивания метаданных о фильмах, сериалах, комиксах, книгах и музыке из надёжных источников.

Одним из ключевых аспектов функциональности является возможность создания и организации личных коллекций и списков медиа.

С помощью этого проекта пользователи получат удобный доступ к актуальной информации о контенте, включая описания, актёрский состав, даты выхода и другую важную информацию.

![Stars](https://img.shields.io/github/stars/zamelane/lophius
)
## Demo

Демо-версию можно просмотреть по адресу [lophius.zmln.ru](https://lophius.zmln.ru)
![Site status](https://img.shields.io/website?url=https%3A%2F%2Flophius.zmln.ru
)
## Run Locally

1. Клонируйте репозиторий

```bash
  git clone https://github.com/zamelane/lophius
```

2. Перейдите в директорию с проектом сервер

```bash
  cd lophius/apps/web-server
```

3. Установите зависимости

```bash
  bun i
```

4. Заполните конфигурационный файл `.env` (пример заполнения см. в файле `.env.example`)

5. Соберите и запустите сервер (production)

```bash
  bun run build
  bun start
```


## Authors

<<<<<<< HEAD:README.md
- [@zamelane](https://www.github.com/zamelane)


## Roadmap

Планы по разработке проекта (поэтапно):

- Реализовать ручные редакторы медиа

- Интегрировать внешние сервисы для извлечения метаданных

- Реализовать создание коллекций и списков

- Добавить возможность отслеживания медиа (получение уведомлений)

- Интегрировать календарь выхода медиа

- Рефакторинг


## Badges

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

![Code size](https://img.shields.io/github/languages/code-size/zamelane/lophius
)

![Contributors](https://img.shields.io/github/contributors/zamelane/lophius
)
=======
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ENV
```env
DB_URL=postgres://user:password@ip:port/databaseName
```

## session key
```env
SESSION_SECRET=your_secret_key # openssl rand -base64 32
```
>>>>>>> reinit:apps/web-server/README.md
