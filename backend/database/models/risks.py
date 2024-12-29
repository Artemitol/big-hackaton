from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy import ForeignKey, String, Integer
from .base import Base
from sqlalchemy.orm import Mapped

class Risk(Base):
    __tablename__ = "risks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String)

    object_id: Mapped[int] = mapped_column(ForeignKey("objects.id"))
    insurance_object = relationship(
        "Object", back_populates="object_risks", uselist=False
    )
    risk_properties = relationship("Property", back_populates="risk", uselist=True)

