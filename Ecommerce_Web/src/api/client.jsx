import axios from "axios";

const API_BASE = "http://localhost:8000";

const getSessionId = () => {
  let session = localStorage.getItem("session_id");
  if (!session) {
    session = crypto.randomUUID();
    localStorage.setItem("session_id", session);
  }
  return session;
};

export const api = {
  getProducts: () =>
    axios.get(`${API_BASE}/products`).then(res => res.data),

  getCart: () =>
    axios.get(`${API_BASE}/cart`, { params: { session_id: getSessionId() } }).then(res => res.data),

  addToCart: async (productId, quantity = 1) => {
  const res = await axios.post(`${API_BASE}/cart/items`, {
    product_id: productId,
    quantity,
    session_id: getSessionId()
  });

  return res.data || { success: true };
},

removeFromCart: async (itemId) => {
  const res = await axios.delete(`${API_BASE}/cart/items/${itemId}`, {
    params: { session_id: getSessionId() }
  });

  return res.data || { success: true };
},
  placeOrder: () =>
    axios.post(`${API_BASE}/orders/checkout`, null, { params: { session_id: getSessionId() } }).then(res => res.data),

  getOrders: () =>
    axios.get(`${API_BASE}/orders`, { params: { session_id: getSessionId() } }).then(res => res.data),
};
