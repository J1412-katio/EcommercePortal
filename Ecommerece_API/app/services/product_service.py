from app.repositories.product_repository import ProductRepository
from sqlalchemy.orm import Session

class ProductService:
    def __init__(self, db: Session):
        self.repo = ProductRepository(db)

    def list_products(self):
        return self.repo.get_all()
