import { useState } from "react";

export default function ProductCard({ product, onAdd, onBuyNow }) {
  const [quantity, setQuantity] = useState(0);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="card shadow-sm border-0 rounded-4 bg-light h-100">
  <div className="card-body d-flex flex-column">

    {/* Product Name + Price */}
    <div className="text-center mb-3">
      <h5 className="card-title text-primary fw-bold mb-1">
        {product.product_name}
      </h5>

      <p className="card-text text-success fs-5 fw-semibold mb-0">
        ${Number(product.price).toFixed(2)}
      </p>
    </div>

    {/* Quantity Controls */}
    <div className="d-flex align-items-center justify-content-center mb-4">
      <button className="btn btn-sm btn-outline-danger" onClick={decrease}>−</button>
      <span className="mx-3 fw-bold fs-5">{quantity}</span>
      <button className="btn btn-sm btn-outline-success" onClick={increase}>+</button>
    </div>

    {/* Action Buttons */}
    <div className="mt-auto d-flex gap-2">
      <button className="btn btn-outline-primary w-50" onClick={() => onAdd(product, quantity)}>
        Add to Cart
      </button>
      <button className="btn btn-warning w-50 text-white fw-semibold" onClick={() => onBuyNow(product, quantity)}>
        Buy Now
      </button>
    </div>

  </div>
</div>
  );
}