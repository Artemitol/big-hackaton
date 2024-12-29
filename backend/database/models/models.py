from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from datetime import datetime, timezone
from backend.database.models.base import Base


class Dimension(Base):
    __tablename__ = "dimensions"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)

    dimension_values: Mapped[list["DimensionValue"]] = relationship(
        "DimensionValue", back_populates="dimension", uselist=True
    )


class DimensionValue(Base):
    __tablename__ = "dimension_values"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    value: Mapped[str] = Column(String)
    dimension_id: Mapped[int] = Column(ForeignKey("dimensions.id"))

    dimension: Mapped["Dimension"] = relationship(
        "Dimension", back_populates="dimension_values", uselist=False
    )


class DimensionCombination(Base):
    __tablename__ = "dimension_combinations"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)

    combination_values: Mapped[list["CombinationValues"]] = relationship(
        "CombinationValues", back_populates="dimension_combination", uselist=True
    )


class CombinationValues(Base):
    __tablename__ = "combination_values"

    dimension_combination_id: Mapped[int] = Column(
        ForeignKey("dimension_combinations.id"), primary_key=True
    )
    dimension_value_id: Mapped[int] = Column(
        ForeignKey("dimension_values.id"), primary_key=True
    )

    dimension_combination: Mapped["DimensionCombination"] = relationship(
        "DimensionCombination", back_populates="combination_values", uselist=False
    )
    dimension_value: Mapped["DimensionValue"] = relationship("DimensionValue", uselist=False)


class InsuranceProduct(Base):
    __tablename__ = "insurance_products"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)
    description: Mapped[str] = Column(String)

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

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)
    value_type: Mapped[str] = Column(String)
    default_value: Mapped[str | None] = Column(String, nullable=True)
    related_table: Mapped[str | None] = Column(String, nullable=True)
    product_id: Mapped[int] = Column(ForeignKey("insurance_products.id"))
    created_at: Mapped[datetime] = Column(default=datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = Column(
        default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc)
    )

    product: Mapped["InsuranceProduct"] = relationship(
        "InsuranceProduct", back_populates="product_parameters", uselist=False
    )


class Object(Base):
    __tablename__ = "objects"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)

    product_id: Mapped[int] = Column(ForeignKey("insurance_products.id"))
    insurance_product: Mapped["InsuranceProduct"] = relationship(
        "InsuranceProduct", back_populates="insurance_objects", uselist=False
    )
    object_risks: Mapped[list["Risk"]] = relationship(
        "Risk", back_populates="insurance_object", uselist=True
    )


class Property(Base):
    __tablename__ = "properties"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)
    property_type: Mapped[str] = Column(String)

    property_value: Mapped[list["PropertyValue"]] = relationship(
        "PropertyValue", back_populates="property", uselist=True
    )
    risk_id: Mapped[int] = Column(ForeignKey("risks.id"))
    risk: Mapped["Risk"] = relationship("Risk", back_populates="risk_properties", uselist=False)
    sellers: Mapped[list["SaleChannel"]] = relationship(
        "InsuranceSeller",
        back_populates="insurance_properties",
        uselist=True,
        secondary="property_sallers",
    )


class PropertyValue(Base):
    __tablename__ = "property_values"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    value: Mapped[str] = Column(String)
    property_id: Mapped[int] = Column(ForeignKey("properties.id"))
    property: Mapped["Property"] = relationship("Property", back_populates="property_value", uselist=False)
    dimension_combination_id: Mapped[int | None] = Column(
        ForeignKey("dimension_combinations.id"), nullable=True
    )


class PropertySaller(Base):
    __tablename__ = "property_sallers"

    seller_id: Mapped[int] = Column(ForeignKey("insurance_sellers.id"), primary_key=True)
    property_id: Mapped[int] = Column(ForeignKey("properties.id"), primary_key=True)


class Risk(Base):
    __tablename__ = "risks"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)

    object_id: Mapped[int] = Column(ForeignKey("objects.id"))
    insurance_object: Mapped["Object"] = relationship(
        "Object", back_populates="object_risks", uselist=False
    )
    risk_properties: Mapped[list["Property"]] = relationship("Property", back_populates="risk", uselist=True)


class SaleChannel(Base):
    __tablename__ = "sale_channels"

    id: Mapped[int] = Column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = Column(String)

    products: Mapped[list["InsuranceProduct"]] = relationship(
        "InsuranceProduct",
        secondary="product_sale_channels",
        back_populates="sale_channels",
    )


class ProductSaleChannel(Base):
    __tablename__ = "product_sale_channels"

    product_id: Mapped[int] = Column(ForeignKey("insurance_products.id"), primary_key=True)
    sale_channel_id: Mapped[int] = Column(ForeignKey("sale_channels.id"), primary_key=True)
