# app/services/cart_service.py
from app.repositories.cart_repository import CartRepository
from sqlalchemy.orm import Session

class CartService:
    def __init__(self, db: Session):
        self.repo = CartRepository(db)

    def get_cart_items(self, session_id: str):
        cart = self.repo.get_or_create_cart(session_id)
        return self.repo.get_cart_items(cart.id)

    def add_to_cart(self, session_id: str, product_id: int, quantity: int):
        cart = self.repo.get_or_create_cart(session_id)
        return self.repo.add_item(cart.id, product_id, quantity)

    def update_quantity(self, item_id: int, quantity: int):
        return self.repo.update_quantity(item_id, quantity)

    def remove_item(self, item_id: int):
        return self.repo.remove_item(item_id)
