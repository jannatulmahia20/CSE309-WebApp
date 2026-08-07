import type { Transaction } from "../types/transaction";

const API_URL = "https://cse309-webapp.onrender.com";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Could not reach the server. Is the backend running on port 8000?"
    );
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
      else if (body?.detail) message = body.detail;
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message);
  }

  // DELETE (and some PUT/POST) endpoints may return 204 No Content.
  if (response.status === 204) {
    return null as T;
  }

  try {
    return (await response.json()) as T;
  } catch {
    // Body was empty/non-JSON despite a 200 — treat as success with no data.
    return null as T;
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  return request<Transaction[]>(`${API_URL}/transactions/`);
}

export async function createTransaction(
  transaction: Transaction
): Promise<Transaction> {
  return request<Transaction>(`${API_URL}/transactions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
}

export async function updateTransaction(
  id: number,
  transaction: Transaction
): Promise<Transaction> {
  return request<Transaction>(`${API_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
}

export async function deleteTransaction(id: number): Promise<void> {
  await request<void>(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
}
