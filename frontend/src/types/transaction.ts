export type TransactionType = "Income" | "Expense";

export interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
}

export interface Transaction extends TransactionInput {
  id: number;
  user_id?: number;
}