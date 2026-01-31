from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.product_service import ProductService
from app.api.deps import get_db

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("")
def list_products(db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.list_products()
