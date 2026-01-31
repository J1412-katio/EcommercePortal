from typing import List
from pydantic import BaseModel

class OrderItemResponse(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

    class Config:
        orm_mode = True

class OrderResponse(BaseModel):
    id: int
    status: str
    total_amount: float
    items: List[OrderItemResponse]

    class Config:
        orm_mode = True
