# schedules API

## スケジュール一覧取得 API

### リクエスト

```
GET /api/schedules
```

### レスポンス

#### 成功時

| param                   | type   | description          |
| ----------------------- | ------ | -------------------- |
| schedule[].id           | number | スケジュール ID      |
| schedule[].title        | string | タイトル             |
| schedule[].company_id   | string | 会社 ID              |
| schedule[].company_name | string | 会社名               |
| schedule[].url          | array  | url                  |
| schedule[].note         | string | メモ                 |
| schedule[].date         | Date   | 日程（ISO 8601 形式) |

```javascript
{
    "schedule": [
        {
            "id": number,
            "title": string,
            "company_id": number,
            "company_name": string,
            "url":string,
            "note": string,
            "date": Date
        },
        ...
    ]
}
```

## スケジュール取得 API

### リクエスト

```
GET /api/schedules/{schedule_id}
```

### レスポンス

#### 成功時

| param        | type   | description          |
| ------------ | ------ | -------------------- |
| id           | number | スケジュール ID      |
| title        | string | タイトル             |
| company_id   | string | 会社 ID              |
| company_name | string | 会社名               |
| url          | array  | url                  |
| note         | string | メモ                 |
| date         | Date   | 日程（ISO 8601 形式) |

```javascript
{
    "id": number,
    "title": string,
    "company_id": number,
    "company_name": string,
    "url":string,
    "note": string,
    "date": Date
}
```

## スケジュール追加 API

### リクエスト

```
POST /api/schedules
```

| param        | type   | description          |
| ------------ | ------ | -------------------- |
| title        | string | タイトル             |
| company_id   | string | 会社 ID              |
| company_name | string | 会社名               |
| url          | array  | url                  |
| note         | string | メモ                 |
| date         | Date   | 日程（ISO 8601 形式) |

```javascript
{
    "title": string,
    "company_id": number,
    "company_name": string,
    "url":string,
    "note": string,
    "date": Date
}
```

### レスポンス

| param        | type   | description          |
| ------------ | ------ | -------------------- |
| id           | number | スケジュール ID      |
| title        | string | タイトル             |
| company_id   | string | 会社 ID              |
| company_name | string | 会社名               |
| url          | array  | url                  |
| note         | string | メモ                 |
| date         | Date   | 日程（ISO 8601 形式) |

```javascript
{
    "id": number,
    "title": string,
    "company_id": number,
    "company_name": string,
    "url":string,
    "note": string,
    "date": Date
}
```

## スケジュール編集 API

### リクエスト

```
POST /api/schedules/{schedule_id}
```

| param        | type   | description          |
| ------------ | ------ | -------------------- |
| title        | string | タイトル             |
| company_id   | string | 会社 ID              |
| company_name | string | 会社名               |
| url          | array  | url                  |
| note         | string | メモ                 |
| date         | Date   | 日程（ISO 8601 形式) |

```javascript
{
    "title": string,
    "company_id": number,
    "company_name": string,
    "url":string,
    "note": string,
    "date": Date
}
```

### レスポンス

| param        | type   | description          |
| ------------ | ------ | -------------------- |
| id           | number | スケジュール ID      |
| title        | string | タイトル             |
| company_id   | string | 会社 ID              |
| company_name | string | 会社名               |
| url          | array  | url                  |
| note         | string | メモ                 |
| date         | Date   | 日程（ISO 8601 形式) |

```javascript
{
    "id": number,
    "title": string,
    "company_id": number,
    "company_name": string,
    "url":string,
    "note": string,
    "date": Date
}
```

## スケジュール削除 API

### リクエスト

```
DELETE /api/schedules/{schedule_id}
```

### レスポンス

204 No Content
