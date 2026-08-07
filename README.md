# 💰 Smart Personal Finance Tracker

A full-stack web application built with **React**, **FastAPI**, and **SQLite** for managing personal finances. The application allows users to create, view, update, and delete transactions while providing a real-time summary of income, expenses, and balance through a modern dashboard.

---

## 📚 Documentation

All project documentation is available in the **`docs/`** folder.

---

## ✨ Features

- ✅ Create, Read, Update, and Delete (CRUD) transactions
- ✅ Add transaction date
- ✅ Track income and expenses
- ✅ Dashboard with Total Income, Total Expense, and Net Balance
- ✅ Expense Breakdown by category
- ✅ Filter transactions by type (Income / Expense)
- ✅ Edit and Delete transactions
- ✅ Dark/Light theme support
- ✅ Responsive and modern user interface
- ✅ RESTful API built with FastAPI
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
│   │   │   ├── ExpenseChart.tsx
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
│   ├── package-lock.json
│   └── vite.config.ts
│
├── docs
└── README.md
```

---

# 🚀 Backend Setup

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

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm run dev
```

Open the URL shown in the terminal (usually):

```
http://localhost:3000
```

or

```
http://localhost:5173
```

depending on your Vite configuration.

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

### Transaction Model

| Field | Type |
|-------|------|
| id | Integer |
| title | String |
| amount | Float |
| category | String |
| type | String (Income / Expense) |
| date | Date |

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

## 📸 Application Features

- Dashboard displaying:
  - Net Balance
  - Total Income
  - Total Expense
- Expense Breakdown by category
- Add Transaction form
- Transaction history table
- Edit and Delete transactions
- Filter by transaction type
- Dark/Light mode
- Automatic data refresh after CRUD operations
- Interactive Swagger API documentation

---

## 🌱 Future Improvements

- User authentication (Login & Registration)
- Monthly budget planning
- Search transactions
- Filter by category
- Export transaction history (CSV/PDF)
- PostgreSQL support
- Cloud deployment (Render + Vercel)

---

## 👩‍💻 Developer

**Jannatul Mahia**

Department of Computer Science & Engineering

Independent University, Bangladesh (IUB)

GitHub: https://github.com/jannatulmahia20

---

## 📄 License

This project was developed for educational purposes as part of the **CSE309 Web Application Development** course.
