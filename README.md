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

------------------------------------------------
 Project Structure
------------------------------------------------

```
EcommercePortal/

Ecommerce_API/                 # FastAPI backend
├─ app/
│  ├─ api/
│  │  ├─ controllers/      # Handles HTTP requests
│  │  │  ├─ cart_controller.py
│  │  │  ├─ orders_controller.py
│  │  │  └─ product_controller.py
│  │  └─ deps.py           # Dependency injections
│  ├─ core/                # Configuration & settings
│  │  ├─ config.py
│  │  └─ settings.py       # Optional, for Pydantic settings
│  ├─ db/                  # Database setup
│  │  ├─ base.py           # Base declarative class
│  │  └─ session.py        # DB session/engine
│  ├─ models/              # SQLAlchemy models
│  │  ├─ cart.py
│  │  ├─ order.py
│  │  ├─ product.py
|  |  ├─ order_item.py
|  |  ├─ cart_item.py
|  |  └─ order_status_history.py
│  ├─ repositories/        # CRUD operations
│  │  ├─ cart_repo.py
│  │  ├─ order_repo.py
│  │  └─ product_repo.py
│  ├─ schemas/             # Pydantic DTOs / validations
│  │  ├─ cart_schema.py
│  │  ├─ order_schema.py
│  │  └─ product_schema.py
│  ├─ services/            # Business logic
│  │  ├─ cart_service.py
│  │  ├─ order_service.py
│  │  └─ product_service.py
│  └─ main.py              # FastAPI app entry point
├─ db_setup.sql                  # Initial database DDL script
├─ requirements.txt
└─ README.txt               # Backend README

Ecommerce_Web/                  # React frontend
├─ src/
│  ├─ api/                 # Axios API calls
│  │  ├─ cart_api.js
│  │  ├─ order_api.js
│  │  └─ product_api.js
│  ├─ components/          # UI components
│  │  ├─ CartItem.jsx
│  │  ├─ ProductCard.jsx
│  │  └─ Navbar.jsx
│  ├─ layout/              # Layout components
│  │  └─ Layout.jsx
│  ├─ pages/               # React pages
│  │  ├─ CartPage.jsx
│  │  ├─ HomePage.jsx
│  │  └─ OrderPage.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ package.json
└─ README.txt               # Frontend README

docker-compose.yml
README.md                   # Root README

```

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

    ````
       docker-compose up --build
    ````
--------------------------------------------------
RUN LOCALLY (WITHOUT DOCKER)
--------------------------------------------------
### Prerequisites
- Python 3.11+
- Node.js & npm
- MySQL 8.0

### Backend Setup
1. Navigate to backend folder:
    ````
       cd EcommercePortal/Ecommerce_API
    ````

2. Create virtual environment:
    ````
       python -m venv venv
    ````

3. Activate virtual environment:

- Windows: 
    ````
     venv\Scripts\activate
    ````
- Mac/Linux:
    ````
    source venv/bin/activate
     ````
4. Install dependencies:
     ````
   pip install -r requirements.txt
     ````
5. Create a `.env` file in `Ecommerce_API/app/core/` with contents:
     ````
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=ecommerce_db
     ````
6. Create the MySQL database if not exists:
     ````
   CREATE DATABASE ecommerce_db;
     ````
   
7. Run database DDL script:
     ````
   mysql -u root -p ecommerce_db < ddl.sql
     ````
8. Start FastAPI server:
     ````
   uvicorn app.main:app --reload
     ````
Backend API will run at: http://localhost:8000

### Frontend Setup
1. Navigate to frontend folder:
   cd EcommercePortal/Ecommerce_Web

2. Install dependencies:
     ````
   npm install
    ````

3. Start development server:
     ````
      npm run dev
     ````
Frontend will run at: http://localhost:5173

--------------------------------------------------
APPLICATION URLS
--------------------------------------------------
Frontend: http://localhost:5173
Backend API: http://localhost:8000
Swagger API Docs: http://localhost:8000/docs

--------------------------------------------------
DATABASE
--------------------------------------------------
- MySQL 8.0
- Database name: ecommerce_db
- Tables are created using DDL script: Ecommerce_API/db_setup.sql

--------------------------------------------------
NOTES
--------------------------------------------------
- No authentication (guest checkout)
- Clean architecture: Controller → Service → Repository
- Designed for simplicity and clarity

--------------------------------------------------
AUTHOR
--------------------------------------------------
Joyce Junapudi
Submitted as part of a technical assignment

