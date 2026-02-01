import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faTruck, faDollarSign, faClock } from "@fortawesome/free-solid-svg-icons";

export default function OrderCard({ order }) {
  const [showModal, setShowModal] = useState(false);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(order.total_amount);

  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString()
    : "N/A";

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "bg-warning text-dark";
      case "shipped":
        return "bg-info text-dark";
      case "delivered":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };


  return (
    <>
      {/* RECTANGULAR ROW */}
      <div className="d-flex justify-content-between align-items-center
                      border rounded-3 shadow-sm p-3 mb-3 bg-white"
           style={{ minHeight: "65px" }}>

        {/* Order No */}
        <div className="fw-semibold text-primary" style={{ width: "15%" }}>
          <FontAwesomeIcon icon={faReceipt} className="me-2" />
          #{order.id}
        </div>

        {/* Status */}
        <div style={{ width: "20%" }}>
          <span className={`badge rounded-pill px-3 py-2 ${getStatusColor(order.status)}`}>
            <FontAwesomeIcon icon={faTruck} className="me-2" />
            {order.status}
          </span>
        </div>

        {/* Date */}
        <div className="text-muted small" style={{ width: "20%" }}>
          <FontAwesomeIcon icon={faClock} className="me-2" />
          {formattedDate}
        </div>

        {/* Cancel / Update */}
        {/*<div style={{ width: "20%" }}>*/}
        {/*  <button className="btn btn-sm btn-outline-danger me-2">Cancel</button>*/}
        {/*  <button className="btn btn-sm btn-outline-warning">Update</button>*/}
        {/*</div>*/}

        {/* Total + Details */}
        <div style={{ width: "25%" }}>
          <div className="fw-bold text-dark">
            <FontAwesomeIcon icon={faDollarSign} className="me-1 text-warning" />
            {formattedAmount}
          </div>

          <button
            className="btn btn-sm btn-outline-primary mt-1"
            onClick={() => setShowModal(true)}
          >
            Details
          </button>
        </div>
      </div>

      {/* MODAL (unchanged) */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow">

              <div className="modal-header">
                <h5 className="modal-title">Order #{order.id} Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> {formattedAmount}</p>
                <p><strong>Placed on:</strong> {formattedDate}</p>

                <h6 className="mt-3">Items:</h6>

                <ul className="list-group">
                  {order.items?.map((item) => (
                    <li
                      key={item.product_id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>
                        {item.product_name}
                        <span className="ms-2 text-muted">× {item.quantity}</span>
                      </span>
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.unit_price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}