from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routers import transactions

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Personal Finance Tracker API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Smart Personal Finance Tracker API"
    }


@app.get("/api/test")
def test():
    return {
        "status": "success",
        "message": "Backend is connected successfully!"
    }