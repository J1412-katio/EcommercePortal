from typing import Optional

from pydantic import BaseModel
from decimal import Decimal

class CartItemCreate(BaseModel):
    product_id: int
    session_id: str
    quantity: int

class CartItemRead(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: Optional[Decimal] = None

    class Config:
        orm_mode = True
