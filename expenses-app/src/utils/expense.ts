import { getCategory } from '../constants/categories';
import type { CategoryKey, Expense, Language } from '../types/expense';
import { getMonthKey, getTodayKey, isCurrentMonth } from './date';

export function sumExpenses(expenses: Expense[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function getTodayTotal(expenses: Expense[]) {
  const today = getTodayKey();
  return sumExpenses(expenses.filter((expense) => expense.date === today));
}

export function getMonthlyTotal(expenses: Expense[]) {
  return sumExpenses(expenses.filter((expense) => isCurrentMonth(expense.date)));
}

export function getCategoryTotals(expenses: Expense[]) {
  return expenses.reduce<Record<CategoryKey, number>>((totals, expense) => {
    totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;
    return totals;
  }, {} as Record<CategoryKey, number>);
}

export function groupByDate(expenses: Expense[]) {
  return expenses.reduce<Record<string, Expense[]>>((groups, expense) => {
    groups[expense.date] = [...(groups[expense.date] ?? []), expense];
    return groups;
  }, {});
}

export function getHighestCategory(expenses: Expense[], language: Language) {
  const totals = getCategoryTotals(expenses);
  const entries = Object.entries(totals) as [CategoryKey, number][];
  const highest = entries.sort((a, b) => b[1] - a[1])[0];

  if (!highest) {
    return null;
  }

  return {
    amount: highest[1],
    label: getCategory(highest[0]).labels[language],
    key: highest[0],
  };
}

export function getSavingTip(expenses: Expense[], language: Language) {
  const currentMonthExpenses = expenses.filter((expense) => getMonthKey(expense.date) === getMonthKey(getTodayKey()));
  const highest = getHighestCategory(currentMonthExpenses, language);

  if (!highest) {
    return language === 'ta'
      ? 'ஒவ்வொரு நாளும் சிறிய செலவுகளையும் பதிவு செய்யுங்கள்.'
      : 'Record even small daily expenses to see your real pattern.';
  }

  if (highest.key === 'food' || highest.key === 'groceries') {
    return language === 'ta'
      ? 'உணவு மற்றும் மளிகைக்கு வார திட்டம் வைத்தால் செலவு குறையும்.'
      : 'A weekly meal and grocery plan can reduce repeat spending.';
  }

  if (highest.key === 'beauty' || highest.key === 'travel') {
    return language === 'ta'
      ? 'இந்த வகைக்கு ஒரு சிறிய வார வரம்பு அமைத்து பாருங்கள்.'
      : 'Try setting a smaller weekly limit for this category.';
  }

  return language === 'ta'
    ? `${highest.label} செலவை மாத இலக்குடன் ஒப்பிட்டு பாருங்கள்.`
    : `Compare ${highest.label} spending against your monthly goal.`;
}
