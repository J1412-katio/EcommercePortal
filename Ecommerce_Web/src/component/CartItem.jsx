import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center
                 border rounded-3 shadow-sm p-3 mb-3 bg-white"
    >
      <div style={{ width: "30%" }} className="fw-semibold text-primary">
        {item.product_name}
      </div>

      <div style={{ width: "15%" }}>
        ${item.unit_price}
      </div>

      <div style={{ width: "20%" }}>
        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onDecrease(item)}>
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <strong>{item.quantity}</strong>

        <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => onIncrease(item)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div style={{ width: "15%" }} className="fw-bold">
        ${(item.unit_price * item.quantity).toFixed(2)}
      </div>

      <div style={{ width: "20%" }}>
        <button className="btn btn-sm btn-danger" onClick={() => onRemove(item.id, item.quantity)}>
          <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
          Remove
        </button>
      </div>
    </div>
  );
}