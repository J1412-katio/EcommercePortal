import { useEffect, useState } from "react";
import { api } from "../api/client.jsx";
import ProductCard from "../component/ProductCard.jsx";
import { successAlert, errorAlert } from "../component/alert.jsx";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => errorAlert("Failed to load products"));
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await api.addToCart(productId);
      successAlert("Added to cart!");
    } catch {
      errorAlert("Failed to add to cart");
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "15px" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={() => handleAddToCart(p.id)} />
        ))}
      </div>
    </div>
  );
}
