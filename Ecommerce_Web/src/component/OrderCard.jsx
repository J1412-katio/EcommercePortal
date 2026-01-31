export default function OrderCard({ order }) {
  return (
    <div className="order-card">
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total_amount}</p>
      {order.items && (
        <ul>
          {order.items.map(item => (
            <li key={item.product_id}>
              Product #{item.product_id} x {item.quantity} @ ${item.unit_price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
