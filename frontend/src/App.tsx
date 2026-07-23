import { useEffect, useState } from "react";
import "./App.css";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import { getTransactions } from "./services/api";
import type { Transaction } from "./types/transaction";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Calculate summary
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="App">
      <h1>💰 Smart Personal Finance Tracker</h1>

      <div className="summary">
        <div className="card income">
          <h3>Total Income</h3>
          <p>৳ {totalIncome}</p>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <p>৳ {totalExpense}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>৳ {balance}</p>
        </div>
      </div>

      <TransactionForm onTransactionAdded={loadTransactions} />

      <hr />

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;