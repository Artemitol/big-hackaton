from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import ForeignKey, String
from .base import Base


class SaleChannel(Base):
    __tablename__ = "sale_channels"

    id = mapped_column(primary_key=True, autoincrement=True)
    name = mapped_column(String)

    products = relationship(
        "InsuranceProduct",
        secondary="product_sale_channels",
        back_populates="sale_channels",
    )


class ProductSaleChannel(Base):
    __tablename__ = "product_sale_channels"

    product_id = mapped_column(ForeignKey("insurance_products.id"), primary_key=True)
    sale_channel_id = mapped_column(ForeignKey("sale_channels.id"), primary_key=True)
