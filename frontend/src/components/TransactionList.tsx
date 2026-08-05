import { useState } from "react";
import { deleteTransaction } from "../services/api";
import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onRefresh: () => void;
  onNotify: (type: "success" | "error", message: string) => void;
}

function TransactionList({
  transactions,
  onEdit,
  onRefresh,
  onNotify,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteTransaction(id);
      onNotify("success", "Transaction deleted.");
      onRefresh();
    } catch (err) {
      onNotify(
        "error",
        err instanceof Error ? err.message : "Failed to delete transaction."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">Transaction history</caption>

        <thead>
          <tr>
            <th>Title</th>
            <th className="col-amount">Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">
                No transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => {
              const isDeleting = deletingId === transaction.id;
              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>

                  <td
                    className={`col-amount ${
                      transaction.type === "Income"
                        ? "amount-income"
                        : "amount-expense"
                    }`}
                  >
                    {transaction.type === "Income" ? "+" : "-"}৳{" "}
                    {transaction.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td>{transaction.category}</td>

                  <td>
                    <span
                      className={`badge ${
                        transaction.type === "Income"
                          ? "badge-income"
                          : "badge-expense"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td className="col-actions">
                    <div className="row-actions">
                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => onEdit(transaction)}
                        disabled={isDeleting}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="icon-button danger"
                        onClick={() => handleDelete(transaction.id!)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "🗑 Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
