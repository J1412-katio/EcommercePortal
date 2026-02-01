import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import { useState } from "react";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Layout cartCount={cartCount}>
        <Routes>
  <Route path="/products" element={<ProductsPage setCartCount={setCartCount} />} />
  <Route path="/cart" element={<CartPage setCartCount={setCartCount} />} />
  <Route path="/orders" element={<OrdersPage setCartCount={setCartCount} />} />
</Routes>
      </Layout>
    </Router>
  );
}