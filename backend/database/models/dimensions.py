from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import ForeignKey, String
from .base import Base


class Dimension(Base):
    __tablename__ = "dimensions"

    id = mapped_column(primary_key=True, autoincrement=True)
    name = mapped_column(String)

    dimension_values = relationship("DimensionValue", back_populates="dimension", uselist=True)


class DimensionValue(Base):
    __tablename__ = "dimension_values"

    id = mapped_column(primary_key=True, autoincrement=True)
    value = mapped_column(String)
    dimension_id = mapped_column(ForeignKey("dimensions.id"))
    dimension = relationship("Dimension", back_populates="dimension_values", uselist=False)


class DimensionCombination(Base):
    __tablename__ = "dimension_combinations"

    id = mapped_column(primary_key=True, autoincrement=True)

    combination_values = relationship("CombinationValues", back_populates="dimension_combination", uselist=True)


class CombinationValues(Base):
    __tablename__ = "combination_values"

    dimension_combination_id = mapped_column(
        ForeignKey("dimension_combinations.id"), primary_key=True
    )
    dimension_value_id = mapped_column(ForeignKey("dimension_values.id"), primary_key=True)

    dimension_combination = relationship("DimensionCombination", back_populates="combination_values", uselist=False)
    dimension_value = relationship("DimensionValue", uselist=False)
