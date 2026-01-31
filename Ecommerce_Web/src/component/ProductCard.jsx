export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <img
        src={product.image_url || "https://via.placeholder.com/150"}
        alt={product.product_name}
      />
      <h3>{product.product_name}</h3>
      <p>${parseFloat(product.price).toFixed(2)}</p>
      <button className="button" onClick={onAdd}>Add to Cart</button>
    </div>
  );
}
