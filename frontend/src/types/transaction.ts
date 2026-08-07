export type TransactionType = "Income" | "Expense";

// Shape used when creating/editing a transaction — no id yet.
export interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string; // ISO date string, e.g. "2026-08-06"
}

// Shape returned by the API — always has an id.
export interface Transaction extends TransactionInput {
  id: number;
}
