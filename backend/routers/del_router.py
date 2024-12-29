from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.models.models import *
from backend.database.connection import create_session

del_router = APIRouter()

# Удаление страхового продукта
@del_router.delete("/insurance_products/{product_id}", response_model=InsuranceProduct)
def delete_insurance_product(product_id: int, db: Session = Depends(create_session)):
    product = db.query(SaleChannel).filter(SaleChannel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="InsuranceProduct not found")
    db.delete(product)
    db.commit()
    return product

# Удаление параметра для страхового продукта
@del_router.delete("/insurance_products/{product_id}/parameters/{parameter_id}", response_model=ProductParameters)
def delete_product_parameter(product_id: int, parameter_id: int, db: Session = Depends(create_session)):
    parameter = db.query(ProductParameters).filter(ProductParameters.id == parameter_id, ProductParameters.product_id == product_id).first()
    if not parameter:
        raise HTTPException(status_code=404, detail="Parameter not found")
    db.delete(parameter)
    db.commit()
    return parameter

# Удаление канала продаж
@del_router.delete("/sale_channels/{sale_channel_id}", response_model=SaleChannel)
def delete_sale_channel(sale_channel_id: int, db: Session = Depends(create_session)):
    sale_channel = db.query(SaleChannel).filter(SaleChannel.id == sale_channel_id).first()
    if not sale_channel:
        raise HTTPException(status_code=404, detail="SaleChannel not found")
    db.delete(sale_channel)
    db.commit()
    return sale_channel

# Удаление связи продукта с каналом продаж
@del_router.delete("/insurance_products/{product_id}/sale_channels/{sale_channel_id}")
def delete_product_sale_channel(product_id: int, sale_channel_id: int, db: Session = Depends(create_session)):
    sale_channel = db.query(ProductSaleChannel).filter(ProductSaleChannel.product_id == product_id, ProductSaleChannel.sale_channel_id == sale_channel_id).first()
    if not sale_channel:
        raise HTTPException(status_code=404, detail="ProductSaleChannel not found")
    db.delete(sale_channel)
    db.commit()
    return {"message": "Sale channel deleted successfully"}

# Удаление объекта
@del_router.delete("/objects/{object_id}", response_model=Object)
def delete_object(object_id: int, db: Session = Depends(create_session)):
    object_to_delete = db.query(Object).filter(Object.id == object_id).first()
    if not object_to_delete:
        raise HTTPException(status_code=404, detail="Object not found")
    db.delete(object_to_delete)
    db.commit()
    return object_to_delete

# Удаление риска для объекта
@del_router.delete("/objects/{object_id}/risks/{risk_id}", response_model=Risk)
def delete_risk_for_object(object_id: int, risk_id: int, db: Session = Depends(create_session)):
    risk = db.query(Risk).filter(Risk.id == risk_id, Risk.object_id == object_id).first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risk not found")
    db.delete(risk)
    db.commit()
    return risk

# Удаление свойства для риска
@del_router.delete("/risks/{risk_id}/properties/{property_id}", response_model=Property)
def delete_property_for_risk(risk_id: int, property_id: int, db: Session = Depends(create_session)):
    property_to_delete = db.query(Property).filter(Property.id == property_id, Property.risk_id == risk_id).first()
    if not property_to_delete:
        raise HTTPException(status_code=404, detail="Property not found")
    db.delete(property_to_delete)
    db.commit()
    return property_to_delete

# Удаление продавца для свойства
@del_router.delete("/properties/{property_id}/insurance_sellers/{seller_id}")
def delete_property_seller(property_id: int, seller_id: int, db: Session = Depends(create_session)):
    seller = db.query(PropertySaller).filter(PropertySaller.property_id == property_id, PropertySaller.seller_id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    db.delete(seller)
    db.commit()
    return {"message": "Seller removed successfully"}

# Удаление значения для свойства
@del_router.delete("/properties/{property_id}/property_values/{value_id}", response_model=PropertyValue)
def delete_property_value(property_id: int, value_id: int, db: Session = Depends(create_session)):
    value = db.query(PropertyValue).filter(PropertyValue.id == value_id, PropertyValue.property_id == property_id).first()
    if not value:
        raise HTTPException(status_code=404, detail="Value not found")
    db.delete(value)
    db.commit()
    return value
