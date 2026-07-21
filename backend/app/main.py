from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Smart Personal Finance Tracker API",
    version="1.0.0"
)

# Allow React frontend to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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