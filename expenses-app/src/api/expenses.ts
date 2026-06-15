import type { Expense } from '../types/expense';
import { apiRequest } from './client';

export function fetchExpenses(token: string) {
  return apiRequest<Expense[]>('/expenses', { token });
}

export function createExpense(token: string, expense: Omit<Expense, 'id' | 'createdAt'>) {
  return apiRequest<Expense>('/expenses', {
    method: 'POST',
    token,
    body: expense,
  });
}

export function removeExpense(token: string, id: string) {
  return apiRequest<void>(`/expenses/${id}`, {
    method: 'DELETE',
    token,
  });
}
