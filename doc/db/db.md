# Database

## users

| param     | type   | option          |
| --------- | ------ | --------------- |
| id        | BIGINT | pk              |
| name      | string | NOT NULL        |
| signin_id | string | NOT NULL unique |
| pass      | string | NOT NULL        |

## schedules

| param      | type          | option   |
| ---------- | ------------- | -------- |
| id         | BIGINT        | pk       |
| user_id    | BIGINT        | fk       |
| title      | VARCHAR(20)   | NOT NULL |
| company_id | BIGINT        | fk       |
| url        | VARCHAR(2083) |
| note       | VARCHAR(1000) | NOT NULL |
| date       | DATE          | NOT NULL |
| update_at  | DATE          | NOT NULL |
| version    | INT           | NOT NULL |

## company

| param    | type          | option   |
| -------- | ------------- | -------- |
| id       | BIGINT        | pk       |
| user_id  | BIGINT        | fk       |
| name     | VARCHAR(20)   | NOT NULL |
| industry | VARCHAR(10)   |
| status   | VARCHAR(10)   |
| url      | VARCHAR(2083) |
