from sqlalchemy.orm import Session
from typing import List, Tuple
from app.models import Product
from app.models.order import Order
from app.models.cart_item import CartItem
from app.models.order_item import OrderItem
from app.models.order_status_history import OrderStatusHistory

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self, cart_id: int, cart_items: List[CartItem]) -> Tuple[Order, List[OrderItem]]:
        order = Order(cart_id=cart_id, status="PLACED", total_amount=0)
        self.db.add(order)
        self.db.commit()
        self.db.refresh(order)

        total = 0
        order_items: List[OrderItem] = []

        for item in cart_items:
            product = self.db.get(Product, item.product_id)
            if not product:
                continue
            order_item = OrderItem(
                order_id=order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=product.price
            )
            total += float(product.price) * item.quantity
            self.db.add(order_item)
            order_items.append(order_item)

        self.db.commit()

        order.total_amount = total
        self.db.commit()
        self.db.refresh(order)

        self.add_status(order.id, "PLACED")
        return order, order_items

    def add_status(self, order_id: int, status: str):
        history = OrderStatusHistory(order_id=order_id, status=status)
        self.db.add(history)
        self.db.commit()

    def list_orders_by_cart(self, cart_id: int):
        orders = (
            self.db.query(Order)
            .filter(Order.cart_id == cart_id, Order.is_active == True)
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
                    "product_id": row.OrderItem.product_id,
                    "product_name": row.Product.name,
                    "quantity": row.OrderItem.quantity,
                    "unit_price": row.OrderItem.unit_price
                }
                for row in items
            ]

            result.append({
                "id": order.id,
                "status": order.status,
                "total_amount": order.total_amount,
                "created_at" : order.created_at,
                "items": item_list
            })

        return result

    def get_status_history(self, order_id: int) -> List[OrderStatusHistory]:
        return (
            self.db.query(OrderStatusHistory)
            .filter(OrderStatusHistory.order_id == order_id)
            .order_by(OrderStatusHistory.created_at)
            .all()
        )
