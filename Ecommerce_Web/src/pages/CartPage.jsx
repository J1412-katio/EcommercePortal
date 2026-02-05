import { useEffect, useState } from "react";
import { api } from "../api/client.jsx";
import { successAlert, errorAlert } from "../component/alert.jsx";
import CartItem from "../component/CartItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faDollarSign,
  faSortNumericUp,
  faCalculator,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

export default function CartPage({ setCartCount }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);


      const loadCart = async () => {
  try {
    const cartData = await api.getCart();
    const productData = await api.getProducts();

    setProducts(productData);

    let merged = cartData.map(item => {
      const product = productData.find(p => p.id === item.product_id);

      return {
        ...item,
        product_name: product?.product_name || "(Product Missing)",
        unit_price: product?.price || 0
      };
    });

    // FIX: sanitize invalid quantities
    merged = merged.map(i => ({ ...i, quantity: Math.max(1, i.quantity) }));

    setCart(merged);

    // FIX: update badge correctly
    const totalQty = merged.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQty);

  } catch {
    errorAlert("Failed to load cart");
  }
};


  useEffect(() => {
    loadCart();
  }, []);

  // ⭐ INSTANT quantity update — no duplicate boxes
  const increaseQty = async (item) => {
    try {
      // Update UI instantly
      setCart(prev =>
        prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );

      // Sync with backend
      await api.addToCart(item.product_id, 1);

      setCartCount(c => c + 1);
    } catch {
      errorAlert("Failed to increase quantity");
    }
  };

 const decreaseQty = async (item) => {
  try {
    if (item.quantity > 1) {
      // Update UI instantly
      setCart(prev =>
        prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );

      // Sync with backend
      await api.addToCart(item.product_id, -1);

      setCartCount(c => Math.max(0, c - 1));
    } else {
      // Quantity is 1 → remove item
      await api.removeFromCart(item.id);

      setCart(prev => prev.filter(i => i.id !== item.id));
      setCartCount(c => Math.max(0, c - 1));
    }
  } catch {
    errorAlert("Failed to decrease quantity");
  }
};
  const handleRemove = async (itemId, quantity) => {
    try {
      await api.removeFromCart(itemId);

      setCart(prev => prev.filter(i => i.id !== itemId));
      setCartCount(c => Math.max(0, c - quantity));

      successAlert("Item removed");
    } catch {
      errorAlert("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      for (const item of cart) {
        await api.removeFromCart(item.id);
      }

      setCart([]);
      setCartCount(0);

      successAlert("Cart cleared");
    } catch {
      errorAlert("Failed to clear cart");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await api.placeOrder();
      successAlert("Order placed");

      setCart([]);
      setCartCount(0);
    } catch {
      errorAlert("Failed to place order");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const grandTotal = subtotal + tax;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 text-primary">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          {/* Header */}
          <div
            className="d-flex justify-content-between align-items-center
                        bg-light p-3 rounded-3 fw-semibold border mb-3"
          >
            <div style={{ width: "30%" }}>
              <FontAwesomeIcon icon={faBoxOpen} className="me-2 text-primary" />
              Product
            </div>
            <div style={{ width: "15%" }}>
              <FontAwesomeIcon icon={faDollarSign} className="me-2 text-success" />
              Price
            </div>
            <div style={{ width: "20%" }}>
              <FontAwesomeIcon icon={faSortNumericUp} className="me-2 text-secondary" />
              Quantity
            </div>
            <div style={{ width: "15%" }}>
              <FontAwesomeIcon icon={faCalculator} className="me-2 text-warning" />
              Total
            </div>
            <div style={{ width: "20%" }}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-2 text-danger" />
              Actions
            </div>
          </div>

          {/* Items */}
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={handleRemove}
            />
          ))}

          {/* Totals */}
          <div className="border rounded-3 p-3 bg-white shadow-sm mb-5">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tax (7%):</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between fs-5 mt-3">
              <span>Grand Total:</span>
              <strong>${grandTotal.toFixed(2)}</strong>
            </div>

            <div className="text-end mt-3">
              <button className="btn btn-danger me-3" onClick={handleClearCart}>
                Cancel Order
              </button>
              <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>

          {/* Sticky Checkout Bar */}
          <div
            className="position-fixed bottom-0 start-0 end-0 bg-white shadow-lg p-3
                       d-flex justify-content-between align-items-center"
            style={{ zIndex: 1000 }}
          >
            <div className="fw-bold fs-5">
              Total: ${grandTotal.toFixed(2)}
            </div>
            <div>
              <button className="btn btn-danger me-3" onClick={handleClearCart}>
                Cancel Order
              </button>
              <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}