import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCartShopping, faStore } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ cartCount = 0 }) {
  return (
   <nav className="navbar navbar-expand-lg shadow-sm" style={{ background: "#1e3a8a" }}>
  <div className="container-fluid d-flex justify-content-between">

    {/* Brand */}
    <Link to="/products" className="navbar-brand text-white fw-bold fs-4 d-flex align-items-center gap-2" style={{ textDecoration: "none" }}>
      <i className="fas fa-bolt fs-3 text-warning"></i>
      ElectroMart
    </Link>

    {/* Nav Items */}
    <div className="d-flex gap-4">

      {/* Products */}
      <Link to="/products" className="nav-item text-center text-white nav-link-custom" style={{ textDecoration: "none" }}>
        <i className="fas fa-store fs-4"></i>
        <div className="small mt-1">Products</div>
      </Link>

      {/* Cart */}
      <Link to="/cart" className="nav-item text-center text-white position-relative nav-link-custom" style={{ textDecoration: "none" }}>
        <i className="fas fa-shopping-cart fs-4"></i>

        {cartCount > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.7rem" }}
          >
            {cartCount}
          </span>
        )}

        <div className="small mt-1">Cart</div>
      </Link>

      {/* Orders */}
      <Link to="/orders" className="nav-item text-center text-white nav-link-custom" style={{ textDecoration: "none" }}>
        <i className="fas fa-clipboard-list fs-4"></i>
        <div className="small mt-1">Orders</div>
      </Link>

    </div>
  </div>
</nav>

  );
}