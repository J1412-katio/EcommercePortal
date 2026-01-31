from sqlalchemy.orm import Session
from app.models.product import Product

class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Product).filter(Product.is_active == True).all()

    def get_by_id(self, product_id: int):
        return self.db.get(Product, product_id)
