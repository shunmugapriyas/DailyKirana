export type Language = 'ta' | 'en';

export type CategoryKey =
  | 'food'
  | 'rent'
  | 'travel'
  | 'beauty'
  | 'medical'
  | 'kids'
  | 'groceries'
  | 'goldSavings'
  | 'chitFund'
  | 'sip'
  | 'other';

export type PaymentMode = 'cash' | 'upi' | 'card';

export type Expense = {
  id: string;
  amount: number;
  category: CategoryKey;
  paymentMode: PaymentMode;
  note: string;
  date: string;
  createdAt: string;
};

export type AppSettings = {
  language: Language;
  monthlyIncome: number;
  monthlyBudget: number;
  monthlySavingsGoal: number;
  pinLockEnabled: boolean;
  hasCompletedOnboarding: boolean;
};

export type AuthUser = {
  id: string;
  identifier: string;
  channel: 'phone' | 'email' | string;
};
