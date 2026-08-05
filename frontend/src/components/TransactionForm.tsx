import { useEffect, useState } from "react";
import {
  createTransaction,
  updateTransaction,
} from "../services/api";
import type { Transaction } from "../types/transaction";

interface Props {
  onTransactionAdded: () => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
  onNotify: (type: "success" | "error", message: string) => void;
}

const emptyTransaction: Transaction = {
  title: "",
  amount: 0,
  category: "",
  type: "Income",
};

function TransactionForm({
  onTransactionAdded,
  editingTransaction,
  setEditingTransaction,
  onNotify,
}: Props) {
  const [transaction, setTransaction] =
    useState<Transaction>(emptyTransaction);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setTransaction(editingTransaction);
    } else {
      setTransaction(emptyTransaction);
    }
  }, [editingTransaction]);

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
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editingTransaction && editingTransaction.id) {
        await updateTransaction(editingTransaction.id, transaction);
        onNotify("success", "Transaction updated.");
      } else {
        await createTransaction(transaction);
        onNotify("success", "Transaction added.");
      }

      setTransaction(emptyTransaction);
      setEditingTransaction(null);
      onTransactionAdded();
    } catch (err) {
      onNotify(
        "error",
        err instanceof Error ? err.message : "Failed to save transaction."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTransaction(emptyTransaction);
    setEditingTransaction(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title form-title">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </h2>

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
          <button id="submit-transaction" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : editingTransaction
              ? "Update"
              : "Add Entry"}
          </button>

          {editingTransaction && (
            <button
              type="button"
              className="button-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
