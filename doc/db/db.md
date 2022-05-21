# Database

## users

| param      | type        | option          |
| ---------- | ----------- | --------------- |
| id         | BIGINT      | pk              |
| name       | VARCHAR(45) | NOT NULL        |
| signin_id  | VARCHAR(45) | NOT NULL unique |
| pass       | VARCHAR(45) | NOT NULL        |
| updated_at | TIMESTAMP   | NOT NULL        |
| created_at | TIMESTAMP   | NOT NULL        |

## schedules

| param      | type          | option   |
| ---------- | ------------- | -------- |
| id         | BIGINT        | pk       |
| user_id    | BIGINT        | fk       |
| title      | VARCHAR(45)   | NOT NULL |
| company_id | BIGINT        | fk       |
| url        | VARCHAR(2083) |
| note       | VARCHAR(1000) |
| date       | DATETIME      | NOT NULL |
| updated_at | TIMESTAMP     | NOT NULL |
| created_at | TIMESTAMP     | NOT NULL |

## companies

| param      | type          | option   |
| ---------- | ------------- | -------- |
| id         | BIGINT        | pk       |
| user_id    | BIGINT        | fk       |
| name       | VARCHAR(45)   | NOT NULL |
| industry   | VARCHAR(45)   |
| status     | VARCHAR(45)   |
| url        | VARCHAR(2083) |
| note       | VARCHAR(1000) |
| updated_at | TIMESTAMP     | NOT NULL |
| created_at | TIMESTAMP     | NOT NULL |
