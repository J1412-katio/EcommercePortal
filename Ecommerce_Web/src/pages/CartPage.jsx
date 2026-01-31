import { useEffect, useState } from "react";
import { api } from "../api/client.jsx";
import CartItem from "../component/CartItem.jsx";
import { successAlert, errorAlert } from "../component/alert.jsx";

export default function CartPage() {
  const [cart, setCart] = useState([]); // list directly

  const loadCart = () => {
    api
      .getCart()
      .then(setCart) // setCart is a list
      .catch(() => errorAlert("Failed to load cart"));
  };

  const handleRemove = async (id) => {
    try {
      await api.removeFromCart(id);
      loadCart();
    } catch {
      errorAlert("Failed to remove item");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await api.placeOrder();
      successAlert("Order placed");
      loadCart();
    } catch {
      errorAlert("Failed to place order");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
      <button
        className="button"
        onClick={handlePlaceOrder}
        disabled={cart.length === 0}
      >
        Place Order
      </button>
    </div>
  );
}
