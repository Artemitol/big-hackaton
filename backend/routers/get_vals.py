from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.database.connection import create_session
from backend.database.db_requests import *

router = APIRouter(tags=['Get Values'])

@router.get("/objects")
def get_objects(db: Session = Depends(create_session)):
    return all_objects(db)

@router.get("/objects/{objectId}/risks")
def get_objects(objectId: int, db: Session = Depends(create_session)):
    return all_risks(objectId, db)

@router.get("/risks/{riskId}/properties")
def get_objects(riskId: int, db: Session = Depends(create_session)):
    return all_properties(riskId, db)

@router.get("/property/{propertyId}")
def get_objects(propertyId: int, db: Session = Depends(create_session)):
    return one_property(propertyId, db)

@router.get("/insurance_products")
def get_insurance_products(db: Session = Depends(create_session)):
    return insurance_products(db)

@router.get("/insurance_products/{id}/parameters")
def get_product_parameters(id: int, db: Session = Depends(create_session)):
    return parameters(id, db)

@router.get("/insurance_products/{id}/sale_channels")
def get_product_sale_channels(id: int, db: Session = Depends(create_session)):
    return sale_channels(id, db)

@router.get("/insurance_products/{id}/objects")
def get_product_objects(id: int, db: Session = Depends(create_session)):
    return objects(id, db)

@router.get("/sale_channels")
def get_all_sale_channels(db: Session = Depends(create_session)):
    return all_sale_channels(db)

@router.get("/objects/{id}/risks")
def get_object_risks(id: int, db: Session = Depends(create_session)):
    return risks(id, db)

@router.get("/risks/{id}/properties")
def get_risk_properties(id: int, db: Session = Depends(create_session)):
    return props(id, db)

@router.get("/properties/{id}/insurance_sellers")
def get_property_insurance_sellers(id: int, db: Session = Depends(create_session)):
    return property_sellers(id, db)

@router.get("/properties/{id}/property_values")
def get_property_values(id: int, db: Session = Depends(create_session)):
    return prop_values(id, db)