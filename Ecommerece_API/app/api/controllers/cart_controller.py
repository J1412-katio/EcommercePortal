from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.cart_service import CartService
from app.schemas.cart_schema import CartItemRead,CartItemCreate
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("/", response_model=List[CartItemRead])
def get_cart(session_id: str = Query(...), db: Session = Depends(get_db)):
    service = CartService(db)
    return service.get_cart_items(session_id)


@router.post("/items", response_model=CartItemRead)
def add_item(request: CartItemCreate, db: Session = Depends(get_db)):
    service = CartService(db)
    return service.add_to_cart(
        session_id=request.session_id,
        product_id=request.product_id,
        quantity=request.quantity
    )

@router.put("/items/{item_id}", response_model=CartItemRead)
def update_item(item_id: int, quantity: int, db: Session = Depends(get_db)):
    service = CartService(db)
    return service.update_quantity(item_id, quantity)

@router.delete("/items/{item_id}")
def remove_item(item_id: int, db: Session = Depends(get_db)):
    service = CartService(db)
    service.remove_item(item_id)
    return {"message": "Item removed from cart"}