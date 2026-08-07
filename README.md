# CSE309 Web App 
# 💰 Smart Personal Finance Tracker

A full-stack web application built with **React**, **FastAPI**, and **SQLite** for managing personal finances. The application allows users to create, view, update, and delete transactions while providing a real-time summary of income, expenses, and balance through a modern dashboard.

---

## 📚 Documentation

All project documentation is available in the **`docs/`** folder.

---

## ✨ Features

- ✅ Create, Read, Update, and Delete (CRUD) transactions
- ✅ Track income and expenses
- ✅ Dashboard showing Total Income, Total Expense, and Current Balance
- ✅ Dark/Light theme support
- ✅ Responsive and modern user interface
- ✅ RESTful API integration with FastAPI
- ✅ SQLite database using SQLAlchemy ORM
- ✅ Interactive API documentation using Swagger UI

---

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database
- SQLite

### Tools
- Git & GitHub
- Swagger UI

---

## 📁 Project Structure

```text
CSE309 Web App
│
├── backend
│   ├── app
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── __init__.py
│   │   └── routers
│   │       ├── transactions.py
│   │       └── __init__.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components
│   │   │   ├── TransactionForm.tsx
│   │   │   └── TransactionList.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── types
│   │   │   └── transaction.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── docs
```

---



## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment (if needed):

```bash
python -m venv venv
```

Activate the virtual environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
python -m uvicorn app.main:app --reload
```

The backend will run at:

```
http://127.0.0.1:8000
```

Swagger API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React development server:

```bash
npm run dev
```

Open the URL shown in your terminal (usually):

```
http://localhost:3000
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions/` | Retrieve all transactions |
| POST | `/transactions/` | Create a new transaction |
| PUT | `/transactions/{id}` | Update an existing transaction |
| DELETE | `/transactions/{id}` | Delete a transaction |

---

## 🗄️ Database

The application uses **SQLite** as its database.

Transaction fields include:

| Field | Type |
|--------|------|
| id | Integer |
| title | String |
| amount | Float |
| category | String |
| type | Income / Expense |

---

## 🔄 Application Flow

```text
React Frontend
        │
        ▼
FastAPI REST API
        │
        ▼
SQLAlchemy ORM
        │
        ▼
SQLite Database
```

---



## 🌱 Future Improvements

- Search transactions
- Filter by category
- Charts and analytics
- Monthly reports
- User authentication
- Export transaction history

---

## 👩‍💻 Developer

**Jannatul Mahia**

Department of Computer Science & Engineering

Independent University, Bangladesh (IUB)

GitHub: https://github.com/jannatulmahia20

---

## 📄 License

This project was developed for educational purposes as part of the **CSE309 Web Application Development** course.
