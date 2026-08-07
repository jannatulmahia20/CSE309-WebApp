import { useEffect, useState } from "react";
import {
  createTransaction,
  updateTransaction,
} from "../services/api";
import type { Transaction, TransactionInput } from "../types/transaction";

interface Props {
  onTransactionAdded: () => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
  onNotify: (type: "success" | "error", message: string) => void;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

const emptyTransaction = (): TransactionInput => ({
  title: "",
  amount: 0,
  category: "",
  type: "Income",
  date: todayISO(),
});

function validate(t: TransactionInput): string | null {
  if (!t.title.trim()) return "Title is required.";
  if (!t.category.trim()) return "Category is required.";
  if (!t.amount || t.amount <= 0) return "Amount must be greater than 0.";
  if (!t.date) return "Date is required.";
  return null;
}

function TransactionForm({
  onTransactionAdded,
  editingTransaction,
  setEditingTransaction,
  onNotify,
}: Props) {
  const [transaction, setTransaction] = useState<TransactionInput>(
    emptyTransaction()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTransaction) {
      setTransaction(editingTransaction);
    } else {
      setTransaction(emptyTransaction());
    }
    setFormError(null);
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

    const error = validate(transaction);
    if (error) {
      setFormError(error);
      return;
    }
    setFormError(null);

    setIsSubmitting(true);
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, transaction);
        onNotify("success", "Transaction updated.");
      } else {
        await createTransaction(transaction);
        onNotify("success", "Transaction added.");
      }

      setTransaction(emptyTransaction());
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
    setTransaction(emptyTransaction());
    setEditingTransaction(null);
    setFormError(null);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="section-title form-title">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </h2>

      {formError && (
        <p className="field-error" role="alert">
          {formError}
        </p>
      )}

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
          />
        </div>

        <div className="field">
          <label htmlFor="amount">Amount (৳)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={transaction.amount || ""}
            onChange={handleChange}
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
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="submit-transaction">
            Submit
          </label>
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
