import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createExpense, fetchExpenses, removeExpense } from '../api/expenses';
import { fetchSettings, saveRemoteSettings } from '../api/settings';
import {
  clearAuthSession,
  defaultSettings,
  loadAuthSession,
  loadExpenses,
  loadSettings,
  saveAuthSession,
  saveExpenses,
  saveSettings,
} from '../storage/appStorage';
import type { AppSettings, AuthUser, Expense } from '../types/expense';

type AppContextValue = {
  authToken: string | null;
  currentUser: AuthUser | null;
  expenses: Expense[];
  isAuthenticated: boolean;
  isReady: boolean;
  settings: AppSettings;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  login: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
  refreshRemoteData: (token?: string) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  const refreshRemoteData = useCallback(
    async (tokenOverride?: string) => {
      const token = tokenOverride ?? authToken;
      if (!token) {
        return;
      }

      const [remoteExpenses, remoteSettings] = await Promise.all([fetchExpenses(token), fetchSettings(token)]);
      setExpenses(remoteExpenses);
      setSettings(remoteSettings);
      await Promise.all([saveExpenses(remoteExpenses), saveSettings(remoteSettings)]);
    },
    [authToken],
  );

  useEffect(() => {
    async function hydrate() {
      try {
        const [storedExpenses, storedSettings, storedSession] = await Promise.all([loadExpenses(), loadSettings(), loadAuthSession()]);
        setExpenses(storedExpenses);
        setSettings(storedSettings);
        setAuthToken(storedSession.token);
        setCurrentUser(storedSession.user);

        if (storedSession.token) {
          await refreshRemoteData(storedSession.token);
        }
      } finally {
        setIsReady(true);
      }
    }

    hydrate();
  }, [refreshRemoteData]);

  const value = useMemo<AppContextValue>(
    () => ({
      authToken,
      currentUser,
      expenses,
      isAuthenticated: Boolean(authToken && currentUser),
      isReady,
      settings,
      addExpense: async (expense) => {
        if (!authToken) {
          return;
        }
        const created = await createExpense(authToken, expense);
        setExpenses((current) => [created, ...current]);
        await saveExpenses([created, ...expenses]);
      },
      deleteExpense: async (id) => {
        if (!authToken) {
          return;
        }
        await removeExpense(authToken, id);
        const nextExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(nextExpenses);
        await saveExpenses(nextExpenses);
      },
      login: async (token, user) => {
        setAuthToken(token);
        setCurrentUser(user);
        await saveAuthSession(token, user);
        await refreshRemoteData(token);
      },
      logout: async () => {
        setAuthToken(null);
        setCurrentUser(null);
        setExpenses([]);
        setSettings(defaultSettings);
        await clearAuthSession();
      },
      refreshRemoteData,
      updateSettings: async (nextSettings) => {
        const mergedSettings = { ...settings, ...nextSettings };
        setSettings(mergedSettings);
        await saveSettings(mergedSettings);

        if (authToken) {
          const remoteSettings = await saveRemoteSettings(authToken, mergedSettings);
          setSettings(remoteSettings);
          await saveSettings(remoteSettings);
        }
      },
    }),
    [authToken, currentUser, expenses, isReady, refreshRemoteData, settings],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}
