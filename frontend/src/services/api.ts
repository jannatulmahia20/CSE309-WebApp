import type { Transaction } from "../types/transaction";

const API_URL = "http://127.0.0.1:8000";

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions/`);
  return response.json();
}

export async function createTransaction(transaction: Transaction) {
  const response = await fetch(`${API_URL}/transactions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  return response.json();
}

export async function updateTransaction(
  id: number,
  transaction: Transaction
) {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  return response.json();
}

export async function deleteTransaction(id: number) {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  return response.json();
}