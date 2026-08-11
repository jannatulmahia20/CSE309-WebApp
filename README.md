# Smart Personal Finance Tracker

A full-stack web application built with **React**, **FastAPI**, and **SQLite** for managing personal finances.

The application allows users to create accounts, securely log in, manage their personal financial transactions, and view a dashboard containing income, expenses, net balance, and expense breakdowns.

---

## 🌐 Live Application

### Frontend

**Vercel:**  
https://cse-309-web-app.vercel.app/

### Backend API

**Render:**  
https://cse309-webapp.onrender.com/

### Swagger API Documentation

**Production Swagger:**  
https://cse309-webapp.onrender.com/docs

---

## 📚 Documentation

All project documentation is available in the **`docs/`** folder.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- User logout
- JWT-based authentication
- Protected transaction endpoints
- User-specific transaction data
- Authentication token stored securely in browser local storage
- Session expiration handling
- Login and signup validation
- Error and success notifications

### 💰 Transaction Management

- Create transactions
- View transactions
- Update transactions
- Delete transactions
- Add transaction date
- Track income and expenses
- Categorize transactions
- Filter transactions by type
- User-specific transaction records

### 📊 Dashboard

- Net Balance
- Total Income
- Total Expense
- Expense breakdown by category
- Transaction history
- Automatic data refresh after CRUD operations

### 🎨 User Interface

- Modern and responsive interface
- Professional login and signup pages
- Dark/Light theme support
- Loading states
- Success and error notifications
- User-friendly forms
- Responsive design for different screen sizes

### 🔌 API

- RESTful API built with FastAPI
- Interactive Swagger UI documentation
- SQLAlchemy ORM
- Protected API endpoints
- JWT authentication

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
- JWT Authentication

### Database

- SQLite

### Deployment

- Vercel — Frontend
- Render — Backend

### Tools

- Git & GitHub
- Swagger UI
- VS Code

---

## 📁 Project Structure

```text
CSE309 Web App
│
├── backend
│   ├── app
│   │   ├── auth.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── __init__.py
│   │   └── routers
│   │       ├── auth.py
│   │       ├── transactions.py
│   │       └── __init__.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── ExpenseChart.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
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
