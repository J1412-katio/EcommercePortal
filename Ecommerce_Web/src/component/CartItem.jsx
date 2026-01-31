export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <p>Product #{item.product_id}</p>
      <p>Quantity: {item.quantity}</p>
      {onRemove && (
        <button className="button" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      )}
    </div>
  );
}