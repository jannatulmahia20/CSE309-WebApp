import { useState } from "react";
import { createTransaction } from "../services/api";
import type { Transaction } from "../types/transaction";

interface Props {
  onTransactionAdded: () => void;
}

function TransactionForm({ onTransactionAdded }: Props) {
  const [transaction, setTransaction] = useState<Transaction>({
    title: "",
    amount: 0,
    category: "",
    type: "Income",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTransaction({
      ...transaction,
      [e.target.name]:
        e.target.name === "amount" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTransaction(transaction);

    setTransaction({
      title: "",
      amount: 0,
      category: "",
      type: "Income",
    });

    onTransactionAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g. Salary, Groceries"
            value={transaction.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="e.g. Food, Rent"
            value={transaction.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="amount">Amount (৳)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={transaction.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={transaction.type}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="submit-transaction">
            Add transaction
          </label>
          <button id="submit-transaction" type="submit">
            Add Entry
          </button>
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
