import { useEffect, useMemo, useState } from "react";
import "./App.css";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";

import { getTransactions } from "./services/api";
import type { Transaction } from "./types/transaction";

type Theme = "light" | "dark";
type Notice = { type: "success" | "error"; message: string };

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
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const notify = (type: Notice["type"], message: string) => {
    setNotice({ type, message });
  };

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      notify(
        "error",
        err instanceof Error ? err.message : "Failed to load transactions."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Auto-dismiss the notice banner after a few seconds.
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

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
    <span className="brand-mark">💰 Smart Personal Finance Tracker</span>
    <span className="brand-sub">
      Track your income and expenses effortlessly
    </span>
  </div>

  <button
    type="button"
    className="theme-toggle"
    onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
    aria-label="Toggle color theme"
    aria-pressed={theme === "dark"}
  >
    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
  </button>
</header>

      {notice && (
        <div
          className={`banner banner-${notice.type}`}
          role="status"
          aria-live="polite"
        >
          {notice.message}
          <button
            type="button"
            className="banner-dismiss"
            aria-label="Dismiss notification"
            onClick={() => setNotice(null)}
          >
            ✕
          </button>
        </div>
      )}

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

      <ExpenseChart transactions={transactions} />

      <TransactionForm
        onTransactionAdded={loadTransactions}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
        onNotify={notify}
      />

      <h2 className="section-title">Transaction Ledger</h2>
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        onEdit={setEditingTransaction}
        onRefresh={loadTransactions}
        onNotify={notify}
      />
      
     
    </div>
  );
}

export default App;
