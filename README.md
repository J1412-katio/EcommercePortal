Ecommerce Portal – Full Stack Application
=========================================

This project is a simple ecommerce portal built as a technical assignment.
It demonstrates a clean layered architecture using FastAPI for backend
and React (Vite) for frontend.

--------------------------------------------------
TECH STACK
--------------------------------------------------
Backend:
- Python 3.11
- FastAPI
- SQLAlchemy
- MySQL

Frontend:
- React
- Vite
- Axios
- React Router

Containerization:
- Docker
- Docker Compose

--------------------------------------------------
FEATURES
--------------------------------------------------
- Product listing
- Add/remove items from cart
- Session-based cart (no login)
- Place orders
- Track order status

--------------------------------------------------
RUN LOCALLY (DOCKER)
--------------------------------------------------
Prerequisites:
- Docker
- Docker Compose

Steps:
1. Clone the repository
2. Navigate to project root
3. Run:

   docker-compose up --build

--------------------------------------------------
APPLICATION URLS
--------------------------------------------------
Frontend:
http://localhost:5173

Backend API:
http://localhost:8000

Swagger API Docs:
http://localhost:8000/docs

--------------------------------------------------
DATABASE
--------------------------------------------------
- MySQL 8.0
- Database name: ecommerce_db
- Tables are created using DDL script:
  backend/db_schema.sql

--------------------------------------------------
NOTES
--------------------------------------------------
- No authentication (guest checkout)
- Clean architecture: Controller → Service → Repository
- Designed for simplicity and clarity

--------------------------------------------------
AUTHOR
--------------------------------------------------
Submitted as part of a technical assignment
