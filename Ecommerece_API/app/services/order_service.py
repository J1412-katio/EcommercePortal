from sqlalchemy.orm import Session
from app.repositories.order_repository import OrderRepository
from app.repositories.cart_repository import CartRepository
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
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

        orders = (
            self.db.query(Order)
            .filter(Order.cart_id == cart.id)
            .all()
        )

        result = []

        for order in orders:
            items = (
                self.db.query(OrderItem, Product)
                .join(Product, Product.id == OrderItem.product_id)
                .filter(OrderItem.order_id == order.id)
                .all()
            )

            item_list = [
                {
                    "product_id": oi.OrderItem.product_id,
                    "product_name": oi.Product.product_name,  # FIXED HERE
                    "quantity": oi.OrderItem.quantity,
                    "unit_price": oi.OrderItem.unit_price
                }
                for oi in items
            ]

            result.append({
                "id": order.id,
                "status": order.status,
                "total_amount": order.total_amount,
                "items": item_list
            })

        return result
    def get_order_status(self, order_id: int):
        return self.order_repo.get_status_history(order_id)

    def update_status(self, order_id: int, status: str):
        self.order_repo.add_status(order_id, status)