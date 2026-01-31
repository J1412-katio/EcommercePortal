import { useEffect, useState } from "react";
import { api } from "../api/client.jsx";
import { errorAlert } from "../component/alert.jsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.getOrders().then(setOrders).catch(() => errorAlert("Failed to load orders"));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 && <p>No orders yet</p>}
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${parseFloat(order.total_amount).toFixed(2)}</p>
          {order.items && (
            <ul>
              {order.items.map(item => (
                <li key={item.product_id}>
                  {item.product_name || `Product #${item.product_id}`} x {item.quantity} @ ${parseFloat(item.unit_price).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
