from sqlalchemy.orm import Session
# from backend.schemas.models import PostModel, UserReg, UserDtoLogin
# from backend.schemas.db_models import User, Post
from backend.database.models.models import *
from passlib.hash import pbkdf2_sha256


def passhash(password: str) -> pbkdf2_sha256.hash:
    return pbkdf2_sha256.hash(password)
#
#
# def create_new_user(user: UserReg, db: Session):
#     if db.query(User).filter(User.login == user.login).first():
#         raise HTTPException(status_code=400, detail="Login claimed")
#
#     new_user = User(name=user.name, surname=user.surname,
#                     login=user.login, email=user.email,
#                     password_hash=passhash(user.password))
#
#     db.add(new_user)
#     db.commit()
#     return new_user
#
#
# def user_login(user: UserDtoLogin, db: Session):
#     our_user = db.query(User).filter(User.login == user.login).first()
#     if not our_user:
#         raise HTTPException(status_code=404, detail="Пользователя не существует!")
#     if not pbkdf2_sha256.verify(user.password, our_user.password_hash):
#         return {"error": "wrong pass"}
#     return our_user.id

def all_objects(db: Session):
    return db.query(Object).all()

def all_risks(id: int, db: Session):
    return db.query(Risk).filter(Risk.object_id == id).all()

def all_properties(id: int, db: Session):
    return db.query(Property).filter(Property.risk_id == id).all()

def one_property(id: int, db: Session):
    return db.query(Property).filter(Property.id == id).first()

def insurance_products(db: Session):
    return db.query(InsuranceProduct).all()

def parameters(id: int, db: Session):
    return db.query(ProductParameters).filter(ProductParameters.id == id).all()

def sale_channels(id: int, db: Session):
    ids = db.query(ProductSaleChannel.sale_channel_id).filter(ProductSaleChannel.product_id == id).all()
    sale_channel_ids = [sale_channel_id[0] for sale_channel_id in ids]
    return db.query(SaleChannel).filter(SaleChannel.id.in_(sale_channel_ids)).all()

def objects(id: int, db: Session):
    return db.query(Object).filter(Object.id == id).all()

def all_sale_channels(db: Session):
    return db.query(ProductSaleChannel).all()

def risks(id: int, db: Session):
    return db.query(Risk).filter(Risk.id == id).all()

def props(id: int, db: Session):
    return db.query(Property).filter(Property.id == id).all()

def property_sellers(property_id: int, db: Session):
    sellers_ids = db.query(PropertySaller.seller_id).filter(PropertySaller.property_id == property_id).all()
    seller_ids = [seller_id[0] for seller_id in sellers_ids]
    return db.query(SaleChannel).filter(SaleChannel.id.in_(seller_ids)).all()

def prop_values(id: int, db: Session):
    return db.query(PropertyValue).filter(PropertyValue.id == id).all()

# Создание InsuranceProduct
def create_insurance_product(name: str, db: Session):
    new_product = InsuranceProduct(name=name)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Создание ProductParameters для определенного InsuranceProduct
def create_product_parameter(product_id: int, parameter_name: str, db: Session):
    product = db.query(InsuranceProduct).filter(InsuranceProduct.id == product_id).first()
    new_parameter = ProductParameters(parameter_name=parameter_name, product=product)
    db.add(new_parameter)
    db.commit()
    db.refresh(new_parameter)
    return new_parameter

# Создание SaleChannel
def create_sale_channel(name: str, db: Session):
    new_channel = SaleChannel(name=name)
    db.add(new_channel)
    db.commit()
    db.refresh(new_channel)
    return new_channel

# Создание ProductSaleChannel для определенного InsuranceProduct и SaleChannel
def create_product_sale_channel(product_id: int, sale_channel_id: int, db: Session):
    product = db.query(InsuranceProduct).filter(InsuranceProduct.id == product_id).first()
    sale_channel = db.query(SaleChannel).filter(SaleChannel.id == sale_channel_id).first()
    new_product_sale_channel = ProductSaleChannel(product=product, sale_channel=sale_channel)
    db.add(new_product_sale_channel)
    db.commit()
    db.refresh(new_product_sale_channel)
    return new_product_sale_channel

# Создание Object
def create_object(name: str, db: Session):
    new_object = Object(name=name)
    db.add(new_object)
    db.commit()
    db.refresh(new_object)
    return new_object

# Создание Risk для определенного Object
def create_risk(object_id: int, name: str, db: Session):
    obj = db.query(Object).filter(Object.id == object_id).first()
    new_risk = Risk(name=name, object=obj)
    db.add(new_risk)
    db.commit()
    db.refresh(new_risk)
    return new_risk

# Создание Property для определенного Risk
def create_property(risk_id: int, name: str, property_type: str, db: Session):
    risk = db.query(Risk).filter(Risk.id == risk_id).first()
    new_property = Property(name=name, property_type=property_type, risk=risk)
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property

# Создание PropertySaller для определенного Property и InsuranceSeller
def create_property_saller(property_id: int, seller_id: int, db: Session):
    property_ = db.query(Property).filter(Property.id == property_id).first()
    seller = db.query(SaleChannel).filter(SaleChannel.id == seller_id).first()
    new_property_saller = PropertySaller(property=property_, seller=seller)
    db.add(new_property_saller)
    db.commit()
    db.refresh(new_property_saller)
    return new_property_saller

# Создание PropertyValue для определенного Property
def create_property_value(property_id: int, value: str, db: Session):
    property_ = db.query(Property).filter(Property.id == property_id).first()
    new_property_value = PropertyValue(value=value, property=property_)
    db.add(new_property_value)
    db.commit()
    db.refresh(new_property_value)
    return new_property_value



