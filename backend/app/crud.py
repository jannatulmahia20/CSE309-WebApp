from sqlalchemy.orm import Session
from . import models, schemas


def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def get_transactions(db: Session):
    return db.query(models.Transaction).all()


def update_transaction(db: Session, transaction_id: int, transaction: schemas.TransactionCreate):
    db_transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )

    if db_transaction is None:
        return None

    db_transaction.title = transaction.title
    db_transaction.amount = transaction.amount
    db_transaction.category = transaction.category
    db_transaction.type = transaction.type

    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def delete_transaction(db: Session, transaction_id: int):
    db_transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )

    if db_transaction is None:
        return None

    db.delete(db_transaction)
    db.commit()
    return db_transaction