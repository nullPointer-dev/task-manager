# Task Manager

Task Manager application built using React, FastAPI, PostgreSQL, and SQLAlchemy.
---

## Features
((I used fake login sessions btw because didn't know JWT auth properly))
- User Registration
- User Login
- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Complete/Incomplete
- Filter Tasks (All / Pending / Completed)
- PostgreSQL Database Persistence

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- CSS

### Backend
- FastAPI
- SQLAlchemy ORM
- Pydantic

### Database
- PostgreSQL

---


## Database Schema

### Users

| Column | Type |
|----------|----------|
| id | Integer |
| username | String |
| password | String |
| created_at | DateTime |

### Tasks

| Column | Type |
|----------|----------|
| id | Integer |
| title | String |
| description | String |
| completed | Boolean |
| created_at | DateTime |
| owner_id | Integer (Foreign Key) |

### Relationship

- One User can have many Tasks
- One Task belongs to exactly one User

---

## API Endpoints

### User Routes

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /users | Register User |
| POST | /users/login | Login User |
| GET | /users/{username} | Get User |

### Task Routes

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /users/{username}/tasks | Create Task |
| GET | /users/{username}/tasks | Get All Tasks |
| GET | /users/{username}/tasks/{task_id} | Get Single Task |
| PUT | /users/{username}/tasks/{task_id} | Update Task |
| DELETE | /users/{username}/tasks/{task_id} | Delete Task |

---

## Application Workflow

1. User registers an account.
2. User logs in.
3. Frontend stores the username locally.
4. Dashboard fetches tasks from FastAPI.
5. CRUD operations are performed through REST APIs.
6. Tasks are persisted in PostgreSQL.
