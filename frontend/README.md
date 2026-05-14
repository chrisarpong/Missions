# Ghana High Commission - Ottawa

This project contains the frontend and backend for the Ghana High Commission (Ottawa) web portal and CRM dashboard.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Environment**: Docker & Docker Compose

## Quick Start

1. Start the Docker environment from the project root:
   ```bash
   docker-compose up --build
   ```

2. Run migrations:
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

3. Create a superuser:
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

## Development

The frontend is proxied through Vite to the Django backend (`/api` and `/media`).

- **Frontend**: `http://localhost:5173`
- **Django Admin**: `http://localhost:8000/admin`
- **CRM Dashboard**: `http://localhost:5173/crm`
