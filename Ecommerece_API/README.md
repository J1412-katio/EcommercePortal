Ecommerce API (Backend)

This is the backend of the e-commerce portal, built with FastAPI and MySQL.
It handles products, session-based carts, orders, and order status management.

---

## Project Structure:
````
app/
├─ api/
│  ├─ controllers/
│  └─ deps.py
├─ core/
│  └─ config.py
├─ db/
│  ├─ base.py
│  └─ session.py
├─ models/
├─ repositories/
├─ schemas/
├─ services/
└─ main.py
````
---

## Requirements:

- Python 3.10+
- MySQL 8+
- pip

---

## Setup:

1. Clone the repository
   git clone <repo-link>
   cd Ecommerece_API

2. Create virtual environment and activate
````
   python -m venv venv
 ````
````
   source venv/bin/activate   (Linux/macOS)
 ````
````
   venv\Scripts\activate      (Windows)
````
3. Install dependencies
````
   pip install -r requirements.txt
````
4. Configure database
   Update .env with your MySQL credentials:
   ````
   MYSQL_USER=user
   MYSQL_PASSWORD=RootPassword
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DB=ecommerce_db
   ````

6. Create database and tables
````
   mysql -u root -p < db_setup.sql
 ````

6. Run API server
````
   uvicorn app.main:app --reload
````

API available at: http://localhost:8000

Swagger docs: http://localhost:8000/docs

---

## API Endpoints:

### Products:
- GET /products

### Cart:
- GET /cart?session_id=<uuid>
- POST /cart/items
- PUT /cart/items/{item_id}
- DELETE /cart/items/{item_id}

### Orders:
- POST /orders/checkout?session_id=<uuid>
- GET /orders?session_id=<uuid>
- GET /orders/{order_id}/status
- PATCH /orders/{order_id}/status

---

## Notes:

- Carts are session-based and linked via session_id
- Orders are linked to carts
- Status workflow: PLACED → SHIPPED → DELIVERED (manual updates via API)
