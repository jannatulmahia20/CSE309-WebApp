import type { Transaction } from "../types/transaction";

const API_URL = "http://127.0.0.1:8000";

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  let response: Response;

  const token = localStorage.getItem("access_token");

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Could not reach the server. Please check your internet connection."
    );
  }

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");

    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const body = await response.json();

      if (body?.message) {
        message = body.message;
      } else if (body?.detail) {
        message = body.detail;
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  try {
    return (await response.json()) as T;
  } catch {
    return null as T;
  }
}


// =========================
// Transactions
// =========================

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


export async function deleteTransaction(
  id: number
): Promise<void> {
  await request<void>(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
}

// =========================
// Authentication
// =========================

export interface LoginResponse {
  access_token: string;
  token_type: string;
  username: string;
}

export interface SignupResponse {
  message: string;
  user_id: number;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const params = new URLSearchParams({
    username,
    password,
  });

  return request<LoginResponse>(
    `${API_URL}/auth/login?${params.toString()}`,
    {
      method: "POST",
    }
  );
}

export async function signup(
  username: string,
  email: string,
  password: string
): Promise<SignupResponse> {
  const params = new URLSearchParams({
    username,
    email,
    password,
  });

  return request<SignupResponse>(
    `${API_URL}/auth/signup?${params.toString()}`,
    {
      method: "POST",
    }
  );
}