# Task Manager

Task Manager app built with React, FastAPI, PostgreSQL, and SQLAlchemy.
[Visit Here](https://task-manager-frontend-tawny-delta.vercel.app/)
[Backend Swagger Docs](https://task-manager-backend-cndl.onrender.com/docs)

---

## Features

- User Registration & Login (JWT auth)
- Create, View, Edit, Delete Tasks
- Mark Tasks as Complete/Incomplete
- Filter Tasks (All / Pending / Completed)

---

## Tech Stack

### Frontend
- React 19, React Router DOM 7, Axios
- Vite (build tool), CSS

### Backend
- FastAPI, SQLAlchemy ORM, Pydantic
- JWT + bcrypt for auth, python-dotenv

### Database
- PostgreSQL

---

## Database Schema

### Users

| Column     | Type    |
|------------|---------|
| id         | Integer |
| username   | String (unique) |
| password   | String (hashed) |
| created_at | DateTime (with tz) |

### Tasks

| Column      | Type    |
|-------------|---------|
| id          | Integer |
| title       | String  |
| description | String  |
| completed   | Boolean |
| created_at  | DateTime|
| owner_id    | Integer (FK - users.id) |

### Relationship

- One User has many Tasks (cascade delete)

---

## API Endpoints

### User Routes

| Method | Endpoint     | Description       |
|--------|-------------|-------------------|
| POST   | /register   | Register user     |
| POST   | /login      | Login (returns JWT) |
| GET    | /{username} | Get user by username |

### Task Routes (all require `Authorization: Bearer <token>`)

| Method | Endpoint        | Description    |
|--------|-----------------|----------------|
| POST   | /tasks/         | Create task    |
| GET    | /tasks/         | Get all tasks  |
| GET    | /tasks/{id}     | Get single task |
| PUT    | /tasks/{id}     | Update task    |
| DELETE | /tasks/{id}     | Delete task    |

### Other

| Method | Endpoint | Description       |
|--------|----------|-------------------|
| GET    | /        | API welcome message |

---

## Workflow

1. Register an account.
2. Login — JWT token is stored in the frontend.
3. Dashboard fetches tasks via authenticated API calls.
4. CRUD operations go through the REST API.
5. Tasks are persisted in PostgreSQL.
