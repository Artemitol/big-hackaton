from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import ForeignKey, String, Integer
from .base import Base
from sqlalchemy.orm import Mapped

class Property(Base):
    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String)
    property_type: Mapped[str] = mapped_column(String)

    property_value = relationship(
        "PropertyValue", back_populates="property", uselist=True
    )
    risk_id: Mapped[int] = mapped_column(ForeignKey("risks.id"))
    risk = relationship("Risk", back_populates="risk_properties", uselist=False)
    sellers = relationship(
        "InsuranceSeller",
        back_populates="insurance_properties",
        uselist=True,
        secondary="property_sallers",
    )


class PropertyValue(Base):
    __tablename__ = "property_values"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    value: Mapped[str] = mapped_column(String)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id"))
    property = relationship("Property", back_populates="property_value", uselist=False)
    dimension_combination_id: Mapped[int | None] = mapped_column(
        ForeignKey("dimension_combinations.id"), nullable=True
    )


class PropertySaller(Base):
    __tablename__ = "property_sallers"

    seller_id: Mapped[int] = mapped_column(ForeignKey("insurance_sellers.id"), primary_key=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id"), primary_key=True)
