import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCartShopping, faStore } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ElectroMart</div>

      <div className="navbar-links">
        <Link to="/products">
          <FontAwesomeIcon icon={faStore} /> Products
        </Link>

        <Link to="/cart">
          <FontAwesomeIcon icon={faCartShopping} /> Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        <Link to="/orders">
          <FontAwesomeIcon icon={faBox} /> Orders
        </Link>
      </div>
    </nav>
  );
}