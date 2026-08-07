import { useMemo, useState } from "react";
import { deleteTransaction } from "../services/api";
import type { Transaction, TransactionType } from "../types/transaction";

interface Props {
  transactions: Transaction[];
  isLoading: boolean;
  onEdit: (transaction: Transaction) => void;
  onRefresh: () => void;
  onNotify: (type: "success" | "error", message: string) => void;
}

type TypeFilter = "All" | TransactionType;

const formatDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function TransactionList({
  transactions,
  isLoading,
  onEdit,
  onRefresh,
  onNotify,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");

  const visibleTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();

    return [...transactions]
      .filter((t) => (typeFilter === "All" ? true : t.type === typeFilter))
      .filter((t) =>
        q
          ? t.title.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
          : true
      )
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }, [transactions, search, typeFilter]);

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

  const isFiltered = search.trim() !== "" || typeFilter !== "All";

  return (
    <div className="table-wrap">
      <div className="table-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search by title or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search transactions"
        />

        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          aria-label="Filter by type"
        >
          <option value="All">All types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <table>
        <caption className="sr-only">Transaction history</caption>

        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th className="col-amount">Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="empty-state">
                Loading transactions…
              </td>
            </tr>
          ) : visibleTransactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                {isFiltered
                  ? "No transactions match your search."
                  : "No transactions yet."}
              </td>
            </tr>
          ) : (
            visibleTransactions.map((transaction) => {
              const isDeleting = deletingId === transaction.id;
              return (
                <tr key={transaction.id}>
                  <td className="col-date">{formatDate(transaction.date)}</td>
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
                        onClick={() => handleDelete(transaction.id)}
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
