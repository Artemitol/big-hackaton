from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.connection import create_session
from backend.database.db_requests import *

create_router = APIRouter()

@create_router.post("/insurance_products")
def create_insurance_product(name: str, db: Session = Depends(create_session)):
    return create_insurance_product(name, db)

@create_router.post("/insurance_products/{product_id}/parameters")
def create_product_parameter(product_id: int, parameter_name: str, db: Session = Depends(create_session)):
    return create_product_parameter(product_id, parameter_name, db)

@create_router.post("/sale_channels")
def create_sale_channel(name: str, db: Session = Depends(create_session)):
    return create_sale_channel(name, db)

@create_router.post("/insurance_products/{product_id}/sale_channels/{sale_channel_id}")
def create_product_sale_channel(product_id: int, sale_channel_id: int, db: Session = Depends(create_session)):
    return create_product_sale_channel(product_id, sale_channel_id, db)

@create_router.post("/objects")
def create_object(name: str, db: Session = Depends(create_session)):
    return create_object(name, db)

@create_router.post("/objects/{object_id}/risks")
def create_risk(object_id: int, name: str, db: Session = Depends(create_session)):
    return create_risk(object_id, name, db)

@create_router.post("/risks/{risk_id}/properties")
def create_property(risk_id: int, name: str, property_type: str, db: Session = Depends(create_session)):
    return create_property(risk_id, name, property_type, db)

@create_router.post("/properties/{property_id}/insurance_sellers/{seller_id}")
def create_property_saller(property_id: int, seller_id: int, db: Session = Depends(create_session)):
    return create_property_saller(property_id, seller_id, db)

@create_router.post("/properties/{property_id}/property_values")
def create_property_value(property_id: int, value: str, db: Session = Depends(create_session)):
    return create_property_value(property_id, value, db)
