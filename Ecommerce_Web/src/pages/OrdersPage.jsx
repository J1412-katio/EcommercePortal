import { useEffect, useState } from "react";
import { api } from "../api/client";
import { errorAlert } from "../component/alert";
import OrderCard from "../component/OrderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch {
        errorAlert("Failed to load orders");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-primary">
        <FontAwesomeIcon icon={faReceipt} className="me-2" />
        Your Orders
      </h2>

      {/* HEADER ROW */}
      <div className="d-flex justify-content-between align-items-center
                      bg-light p-3 rounded-3 fw-semibold border mb-3"
           style={{ minHeight: "55px" }}>
        <div style={{ width: "15%" }}>Order No</div>
        <div style={{ width: "20%" }}>Status</div>
        <div style={{ width: "20%" }}>Placed On</div>
        <div style={{ width: "20%" }}>Cancel / Update</div>
        <div style={{ width: "25%" }}>Total </div>
      </div>

      {/* LIST OF RECTANGLES */}
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}

    </div>
  );
}