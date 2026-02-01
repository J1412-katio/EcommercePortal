import { useEffect, useState } from "react";
import { api } from "../api/client.jsx";
import { errorAlert, successAlert } from "../component/alert.jsx";
import ProductCard from "../component/ProductCard.jsx";

export default function ProductsPage({ setCartCount }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch(() => errorAlert("Failed to load products"));
  }, []);

  const handleAddToCart = async (product, quantity) => {
    try {
      await api.addToCart(product.id, quantity);
      setCartCount(c => c + quantity);
      successAlert("Added to cart!");
    } catch {
      errorAlert("Failed to add to cart");
    }
  };

  const handleBuyNow = async (product, quantity) => {
    try {
      await api.addToCart(product.id, quantity);
      setCartCount(c => c + quantity);
      window.location.href = "/cart";
    } catch {
      errorAlert("Failed to process Buy Now");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary fw-bold mb-4">
        Products
      </h2>

      <div className="row g-4">
        {products.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard
              product={p}
              onAdd={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        ))}
      </div>
    </div>
  );
}