# API Document

## ログイン API

### リクエスト

```
POST /api/signin
```

```javascript
{
    "id": number,
    "pass": string
}
```

### レスポンス

#### 成功時

302 Found

※cokkie にログイン情報を埋め込み

#### 失敗時

400 BadRequest
| param | type | description |
| -- | -- | -- |
| code | string | エラーコード |

```javascript
{
    "code": InvalidParameter,
}
```

## [schedules API](./schedules.md)

## [companies API](./companies.md)