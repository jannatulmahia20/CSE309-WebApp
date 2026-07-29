import { useEffect, useMemo, useState } from "react";
import "./App.css";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import { getTransactions } from "./services/api";
import type { Transaction } from "./types/transaction";

type Theme = "light" | "dark";

const THEME_KEY = "ledger-theme";

function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const formatAmount = (n: number) =>
  `৳ ${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  return (
    <div className="App">
      <header className="app-header">
        <div className="brand">
        <span className="brand-mark">💰 Expense Tracker</span>
        <span className="brand-sub">Track your income and expenses</span>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          aria-label="Toggle color theme"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <section className="summary" aria-label="Account summary">
        <div className="hero-card">
          <span className="hero-label">Net Balance</span>
          <span className="hero-figure">{formatAmount(balance)}</span>
          <span className="hero-rule" aria-hidden="true" />
        </div>

        <div className="stat-stack">
          <div className="stat-card income">
            <span className="stat-label">
              <span className="stat-dot" aria-hidden="true" />
              Income
            </span>
            <span className="stat-figure">{formatAmount(totalIncome)}</span>
          </div>

          <div className="stat-card expense">
            <span className="stat-label">
              <span className="stat-dot" aria-hidden="true" />
              Expense
            </span>
            <span className="stat-figure">{formatAmount(totalExpense)}</span>
          </div>
        </div>
      </section>

      <h2 className="section-title">New Entry</h2>
      <TransactionForm onTransactionAdded={loadTransactions} />

      <h2 className="section-title">Transaction Ledger</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
