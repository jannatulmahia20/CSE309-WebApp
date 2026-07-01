from fastapi import FastAPI

app = FastAPI(
    title="Smart Personal Finance Tracker API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Smart Personal Finance Tracker API"
    }