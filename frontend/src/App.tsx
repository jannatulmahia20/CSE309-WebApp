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

  return (
    <div className="App">
      <h1>Smart Personal Finance Tracker</h1>

      <TransactionForm onTransactionAdded={loadTransactions} />

      <hr />

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;