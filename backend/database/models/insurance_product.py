from sqlalchemy.orm import mapped_column, relationship
from .base import Base
from sqlalchemy import ForeignKey, String
from datetime import datetime, timezone


from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from backend.database.models.objects import Object
from backend.database.models.sales import SaleChannel
class InsuranceProduct(Base):
    __tablename__ = "insurance_products"

    # Указываем явные типы данных и используем Column для столбцов
    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)
    description: Mapped[str] = Column(String)

    # Связи с другими таблицами
    insurance_objects: Mapped[list["Object"]] = relationship(
        "Object", back_populates="insurance_product", uselist=True
    )
    product_parameters: Mapped[list["ProductParameters"]] = relationship(
        "ProductParameters", back_populates="product", uselist=True
    )
    sale_channels: Mapped[list["SaleChannel"]] = relationship(
        "SaleChannel",
        secondary="product_sale_channels",
        back_populates="products",
        uselist=True,
    )



class ProductParameters(Base):
    __tablename__ = "product_parameters"

    id = mapped_column(primary_key=True, autoincrement=True)
    name = mapped_column(String)
    value_type = mapped_column(String)
    default_value = mapped_column(String, nullable=True)
    related_table = mapped_column(String, nullable=True)
    product_id = mapped_column(ForeignKey("insurance_products.id"))
    created_at = mapped_column(default=datetime.now(timezone.utc))
    updated_at = mapped_column(
        default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc)
    )

    product = relationship(
        "InsuranceProduct", back_populates="product_parameters", uselist=False
    )
