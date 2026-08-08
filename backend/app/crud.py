from sqlalchemy.orm import Session

from . import models, schemas


def create_transaction(
    db: Session,
    transaction: schemas.TransactionCreate,
    user_id: int
):
    db_transaction = models.Transaction(
        **transaction.model_dump(),
        user_id=user_id
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


def get_transactions(
    db: Session,
    user_id: int
):
    return (
        db.query(models.Transaction)
        .filter(models.Transaction.user_id == user_id)
        .all()
    )


def update_transaction(
    db: Session,
    transaction_id: int,
    transaction: schemas.TransactionCreate,
    user_id: int
):
    db_transaction = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.id == transaction_id,
            models.Transaction.user_id == user_id
        )
        .first()
    )

    if db_transaction is None:
        return None

    db_transaction.title = transaction.title
    db_transaction.amount = transaction.amount
    db_transaction.category = transaction.category
    db_transaction.type = transaction.type
    db_transaction.date = transaction.date

    db.commit()
    db.refresh(db_transaction)

    return db_transaction


def delete_transaction(
    db: Session,
    transaction_id: int,
    user_id: int
):
    db_transaction = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.id == transaction_id,
            models.Transaction.user_id == user_id
        )
        .first()
    )

    if db_transaction is None:
        return None

    db.delete(db_transaction)
    db.commit()

    return db_transaction