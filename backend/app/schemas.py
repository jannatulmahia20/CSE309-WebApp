from datetime import date as date_type
from pydantic import BaseModel


class TransactionBase(BaseModel):
    title: str
    amount: float
    category: str
    type: str
    date: date_type


class TransactionCreate(TransactionBase):
    pass


class Transaction(TransactionBase):
    id: int

    class Config:
        from_attributes = True