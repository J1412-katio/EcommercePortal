from sqlalchemy.orm import Session
from app.repositories.order_repository import OrderRepository
from app.repositories.cart_repository import CartRepository
from app.models.cart_item import CartItem

class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.cart_repo = CartRepository(db)
        self.order_repo = OrderRepository(db)

    def checkout(self, session_id: str):
        cart = self.cart_repo.get_or_create_cart(session_id)
        cart_items: list[CartItem] = self.cart_repo.get_items(cart.id)
        if not cart_items:
            raise ValueError("Cart is empty")
        order, order_items = self.order_repo.create_order(cart.id, cart_items)
        self.cart_repo.clear_all(cart.id)
        return order

    def list_orders(self, session_id: str):
        cart = self.cart_repo.get_or_create_cart(session_id)
        return self.order_repo.list_orders_by_cart(cart.id)

    def get_order_status(self, order_id: int):
        return self.order_repo.get_status_history(order_id)

    def update_status(self, order_id: int, status: str):
        self.order_repo.add_status(order_id, status)
