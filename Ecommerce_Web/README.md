E-commerce Frontend (React + Vite)

This is the frontend application for a simple guest-based e-commerce portal.
It connects to a FastAPI backend and allows users to browse products, manage
a cart, and place orders without authentication.

--------------------------------------------------
Requirements
--------------------------------------------------

- Node.js 18 or higher
- npm or yarn
- Backend API running (FastAPI)

--------------------------------------------------
Project Structure
--------------------------------------------------
````
src/
├─ api/            -> API client (Axios / fetch)
├─ components/     -> Reusable UI components
├─ pages/          -> Pages (Products, Cart, Orders)
├─ layout/         -> Layout and Navbar
├─ App.jsx
└─ main.jsx
````
--------------------------------------------------
Setup Instructions
--------------------------------------------------

1. Clone the repository

````
   git clone <repository_url>
   cd Ecommerece_Web
````
2. Install dependencies

 ````
   npm install
 ````
   OR
````
   yarn install
````

3. Configure API URL

   Open the file:
   ````
   src/api/client.jsx
   ````

   Ensure the backend URL is correct:

   ````
   const API_BASE = "http://localhost:8000";
   ````

5. Start the development server

````
   npm run dev
````
   OR
````   
   yarn dev
````

5. Open the application in the browser

   http://localhost:5173

--------------------------------------------------
How It Works
--------------------------------------------------

- The application uses a guest-based shopping flow.
- A session_id is generated in the browser and stored in localStorage.
- The same session_id is sent with all cart and order API requests.
- This allows cart persistence without user login.

--------------------------------------------------
Features
--------------------------------------------------

- View product list
- Add products to cart
- Update or remove cart items
- Place an order
- View all placed orders
- Track order status

--------------------------------------------------
Important Notes
--------------------------------------------------

- Backend must be running before starting the frontend.
- Cart and orders depend on session_id stored in localStorage.
- Clearing browser storage will reset the cart.
- This project is for learning/demo purposes and does not include authentication.
