# app/repositories/cart_repository.py
from sqlalchemy.orm import Session
from app.models.cart import Cart
from app.models.cart_item import CartItem

class CartRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_or_create_cart(self, session_id: str):
        # Check if a cart exists for this session_id
        cart = self.db.query(Cart).filter(Cart.session_id == session_id, Cart.is_active == True).first()
        if not cart:
            cart = Cart(session_id=session_id)
            self.db.add(cart)
            self.db.commit()
            self.db.refresh(cart)
        return cart

    def get_cart_items(self, cart_id: int):
        return self.db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.is_active == True).all()

    def get_items(self, cart_id: int):
        """Alias for get_cart_items (used by OrderService)"""
        return self.get_cart_items(cart_id)

    def add_item(self, cart_id: int, product_id: int, quantity: int):
        item = CartItem(cart_id=cart_id, product_id=product_id, quantity=quantity, is_active=True)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def update_quantity(self, item_id: int, quantity: int):
        item = self.db.query(CartItem).filter(CartItem.id == item_id).first()
        if item:
            item.quantity = quantity
            self.db.commit()
            self.db.refresh(item)
        return item

    def remove_item(self, item_id: int):
        item = self.db.query(CartItem).filter(CartItem.id == item_id).first()
        if item:
            item.is_active = False
            self.db.commit()
        return item

    def clear_all(self, cart_id: int):
        """Deactivate all items in cart after checkout"""
        items = self.db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.is_active == True).all()
        for item in items:
            item.is_active = False
        self.db.commit()
