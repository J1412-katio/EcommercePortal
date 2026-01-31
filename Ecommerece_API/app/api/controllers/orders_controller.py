from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.order_service import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/checkout")
def checkout(session_id: str = Query(...), db: Session = Depends(get_db)):
    service = OrderService(db)
    try:
        order = service.checkout(session_id)
        return {
            "message": "Order placed successfully",
            "order_id": order.id
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
def list_orders(session_id: str = Query(...), db: Session = Depends(get_db)):
    service = OrderService(db)
    return service.list_orders(session_id)

@router.get("/{order_id}/status")
def order_status(order_id: int, db: Session = Depends(get_db)):
    service = OrderService(db)
    return service.get_order_status(order_id)

@router.patch("/{order_id}/status")
def update_status(order_id: int, status: str, db: Session = Depends(get_db)):
    service = OrderService(db)
    service.update_status(order_id, status)
    return {"message": "Status updated"}
