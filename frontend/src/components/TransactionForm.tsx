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
        e.target.name === "amount"
          ? Number(e.target.value)
          : e.target.value,
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
      <h2>Add Transaction</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={transaction.title}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={transaction.amount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={transaction.category}
        onChange={handleChange}
        required
      />

      <select
        name="type"
        value={transaction.type}
        onChange={handleChange}
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <br />
      <br />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;