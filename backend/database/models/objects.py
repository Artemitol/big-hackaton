from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import ForeignKey, String, Integer
from .base import Base
from sqlalchemy.orm import Mapped

class Object(Base):
    __tablename__ = "objects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)  # Аннотация типа для id
    name: Mapped[str] = mapped_column(String)  # Аннотация типа для name

    product_id = mapped_column(ForeignKey("insurance_products.id"))
    insurance_product = relationship(
        "InsuranceProduct", back_populates="insurance_objects", uselist=False
    )
    object_risks = relationship("Risk", back_populates="insurance_object", uselist=True)
