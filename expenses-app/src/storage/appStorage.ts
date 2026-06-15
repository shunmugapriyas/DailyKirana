import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSettings, AuthUser, Expense } from '../types/expense';

const EXPENSES_KEY = 'penn-selavu:expenses';
const SETTINGS_KEY = 'penn-selavu:settings';
const AUTH_TOKEN_KEY = 'penn-selavu:auth-token';
const AUTH_USER_KEY = 'penn-selavu:auth-user';

export const defaultSettings: AppSettings = {
  language: 'ta',
  monthlyIncome: 0,
  monthlyBudget: 0,
  monthlySavingsGoal: 0,
  pinLockEnabled: false,
  hasCompletedOnboarding: false,
};

export async function loadExpenses() {
  const raw = await AsyncStorage.getItem(EXPENSES_KEY);
  return raw ? (JSON.parse(raw) as Expense[]) : [];
}

export async function saveExpenses(expenses: Expense[]) {
  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
}

export async function loadSettings() {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  return raw ? { ...defaultSettings, ...(JSON.parse(raw) as AppSettings) } : defaultSettings;
}

export async function saveSettings(settings: AppSettings) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadAuthSession() {
  const [token, rawUser] = await Promise.all([AsyncStorage.getItem(AUTH_TOKEN_KEY), AsyncStorage.getItem(AUTH_USER_KEY)]);
  return {
    token,
    user: rawUser ? (JSON.parse(rawUser) as AuthUser) : null,
  };
}

export async function saveAuthSession(token: string, user: AuthUser) {
  await Promise.all([AsyncStorage.setItem(AUTH_TOKEN_KEY, token), AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))]);
}

export async function clearAuthSession() {
  await Promise.all([AsyncStorage.removeItem(AUTH_TOKEN_KEY), AsyncStorage.removeItem(AUTH_USER_KEY)]);
}
