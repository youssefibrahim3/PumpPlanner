# Pump Planner 🏋️

A full-stack gym workout tracker built to practice designing and shipping a complete application end to end — from data modeling and a REST API through to a deployed, authenticated frontend.

**Live app:** https://pump-planner-frontend.vercel.app
**API docs:** https://pump-planner.vercel.app/docs

## What it does

Pump Planner lets a user create workout **Sessions**, log individual **Exercises** within each session, and record the **Sets** (reps + weight, in lbs or kg) performed for each exercise. Everything is scoped per-user behind authentication — one user can never see or modify another user's data.

- Create an account and log in
- Create, view, and delete workout sessions
- Add exercises to a session, each with an arbitrary number of sets
- Delete exercises and sessions (cascades to their nested data)
- All data persists in a real Postgres database, not local/mock state

## Tech stack

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS

**Backend**
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (request/response validation)
- JWT authentication (python-jose) with bcrypt hashing

**Database**
- PostgreSQL, hosted on Supabase

**Deployment**
- Frontend: Vercel
- Backend: Vercel (Python/FastAPI runtime)
- Database: Supabase (via a pooled connection, since the backend runs serverless)

## Data model

```
User
└── Session (many)
    └── Exercise (many)
        └── Set (many) — reps, weight, unit
```

Each `Session` belongs to one `User`. Each `Exercise` belongs to one `Session`. Each `Set` belongs to one `Exercise`. Ownership is enforced on every request — a user can only read or modify sessions (and everything nested under them) that belong to their own account.

## Running it locally

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1      # or source venv/bin/activate on macOS/Linux
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with:
```
DATABASE_URL=your_postgres_connection_string
SECRET_KEY=your_jwt_secret
```

Run the server:
```bash
uvicorn main:app --reload
```
API available at `http://localhost:8000`, interactive docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`. Update `API_BASE` in `src/api.js` to point at your local backend if needed.

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Create a new user |
| POST | `/auth/login` | Log in, returns a JWT |
| GET | `/sessions` | List the current user's sessions |
| POST | `/sessions` | Create a session |
| GET | `/sessions/{id}` | Get one session (with nested exercises) |
| DELETE | `/sessions/{id}` | Delete a session |
| GET | `/sessions/{session_id}/exercises` | List exercises in a session |
| POST | `/sessions/{session_id}/exercises` | Add an exercise (with sets) to a session |
| GET | `/sessions/{session_id}/exercises/{id}` | Get one exercise |
| DELETE | `/sessions/{session_id}/exercises/{id}` | Delete an exercise |

All routes except `/auth/signup` and `/auth/login` require a `Authorization: Bearer <token>` header.

## What I'd build next

- Editing sessions/exercises in place, rather than delete-and-recreate
- Alembic migrations instead of `create_all()`
- Aggregate stats (e.g. total volume lifted over time)
- Various UI/UX improvements to dashboard and session editing

## Author

Youssef Ibrahim
