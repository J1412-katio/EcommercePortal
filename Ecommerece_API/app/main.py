from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.controllers import orders_controller, product_controller, cart_controller
from app.models import (
    product,
    cart,
    cart_item,
    order,
    order_item,
    order_status_history,
)
from app.db.session import engine
from app.db.base import Base
# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ecommerce API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_controller.router)
print("Loading product controller...")
app.include_router(cart_controller.router)
app.include_router(orders_controller.router)


@app.get("/")
def root():
    return {"message": "Ecommerce API running"}