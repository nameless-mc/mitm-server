# companies API

## 企業一覧取得 API

```
GET /api/companies
```

### レスポンス

#### 成功時

| param    | type   | description |
| -------- | ------ | ----------- |
| id       | number | 企業 ID     |
| name     | string | 企業名      |
| industry | string | 業種        |
| status   | string | 選考の状態  |
| url      | string | URL         |
| note     | string | メモ        |

```javascript
{
    companies:[
        {
            "id": number,
            "name": string,
            "industry": string,
            "status": string,
            "url": string,
            "note": string,
        },
        ...
    ]
}
```

## 企業取得 API

### リクエスト

```
GET /api/companies/{company_id}
```

### レスポンス

#### 成功時

| param    | type   | description |
| -------- | ------ | ----------- |
| id       | number | 企業 ID     |
| name     | string | 企業名      |
| industry | string | 業種        |
| status   | string | 選考の状態  |
| url      | string | URL         |
| note     | string | メモ        |

```javascript
{
    "id": number,
    "name": string,
    "industry": string,
    "status": string,
    "url": string,
    "note": string,
},
```

## 企業のスケジュール一覧取得 API

### リクエスト

```
GET /api/companies/{company_id}/schedules
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
| schedule[].start        | Date   | 日程（ISO 8601 形式) |
| schedule[].end          | Date   | 日程（ISO 8601 形式) |

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
            "start": Date,
            "end": Date,
        },
        ...
    ]
}
```

## 企業追加 API

### リクエスト

```
POST /api/companies/
```

| param    | type   | description |
| -------- | ------ | ----------- |
| name     | string | 企業名      |
| industry | string | 業種        |
| status   | string | 選考の状態  |
| url      | string | URL         |
| note     | string | メモ        |

```javascript
{
    "name": string,
    "industry": string,
    "status": string,
    "url": string,
    "note": string,
}
```

### レスポンス

#### 成功時

| param    | type   | description |
| -------- | ------ | ----------- |
| id       | number | 企業 ID     |
| name     | string | 企業名      |
| industry | string | 業種        |
| status   | string | 選考の状態  |
| url      | string | URL         |
| note     | string | メモ        |

```javascript
{
    "id": number,
    "name": string,
    "industry": string,
    "status": string,
    "url": string,
    "note": string,
},
```

## 企業編集 API

### リクエスト

```
PUT /api/companies/{company_id}
```

| param    | type   | description |
| -------- | ------ | ----------- |
| name     | string | 企業名      |
| industry | string | 業種        |
| status   | string | 選考の状態  |
| url      | string | URL         |
| note     | string | メモ        |

```javascript
{
    "name": string,
    "industry": string,
    "status": string,
    "url": string,
    "note": string,
},
```

### レスポンス

#### 成功時

| param    | type   | description |
| -------- | ------ | ----------- |
| id       | number | 企業 ID     |
| name     | string | 企業名      |
| industry | string | 業種        |
| status   | string | 選考の状態  |
| url      | string | URL         |
| note     | string | メモ        |

```javascript
{
    "id": number,
    "name": string,
    "industry": string,
    "status": string,
    "url": string
    "note": string,
},
```

## 企業削除 API

### リクエスト

```
DELETE /api/companies/{company_id}
```

### レスポンス

204 No Content
