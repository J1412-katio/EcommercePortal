from typing import Optional

from pydantic import BaseModel
from decimal import Decimal

class ProductRead(BaseModel):
    id: int
    product_name: str
    description: Optional[str]
    price: Decimal

    class Config:
        from_attributes = True
