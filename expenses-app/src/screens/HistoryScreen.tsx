import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExpenseCard } from '../components/ExpenseCard';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { Screen } from '../components/Screen';
import { getCategory } from '../constants/categories';
import { colors, radius } from '../constants/theme';
import { t } from '../constants/translations';
import { useApp } from '../context/AppContext';
import { formatDisplayDate, getTodayKey, isCurrentMonth, isWithinLastDays } from '../utils/date';
import { groupByDate } from '../utils/expense';

type Filter = 'daily' | 'weekly' | 'monthly';

export function HistoryScreen() {
  const { deleteExpense, expenses, settings } = useApp();
  const { language } = settings;
  const [filter, setFilter] = useState<Filter>('monthly');
  const [query, setQuery] = useState('');

  const filteredExpenses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return expenses.filter((expense) => {
      const matchesFilter =
        filter === 'daily'
          ? expense.date === getTodayKey()
          : filter === 'weekly'
            ? isWithinLastDays(expense.date, 6)
            : isCurrentMonth(expense.date);
      const category = getCategory(expense.category).labels[language].toLowerCase();
      const matchesSearch =
        !normalizedQuery ||
        expense.note.toLowerCase().includes(normalizedQuery) ||
        category.includes(normalizedQuery) ||
        expense.category.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [expenses, filter, language, query]);

  const groups = groupByDate(filteredExpenses);
  const dates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <Screen>
      <Header title={t(language, 'history')} />

      <View style={styles.segment}>
        {(['daily', 'weekly', 'monthly'] as Filter[]).map((item) => {
          const active = item === filter;
          return (
            <Pressable key={item} onPress={() => setFilter(item)} style={[styles.segmentButton, active && styles.activeSegment]}>
              <Text style={[styles.segmentText, active && styles.activeSegmentText]}>{t(language, item)}</Text>
            </Pressable>
          );
        })}
      </View>

      <InputField label={t(language, 'search')} onChangeText={setQuery} value={query} />

      {dates.length === 0 ? <Text style={styles.empty}>{t(language, 'noExpenses')}</Text> : null}

      {dates.map((date) => (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.date}>{formatDisplayDate(date)}</Text>
          {groups[date].map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} language={language} onDelete={deleteExpense} />
          ))}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  activeSegment: {
    backgroundColor: colors.primary,
  },
  activeSegmentText: {
    color: colors.surface,
  },
  date: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '900',
  },
  dateGroup: {
    gap: 10,
  },
  empty: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 16,
    fontWeight: '800',
    padding: 20,
    textAlign: 'center',
  },
  segment: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 5,
  },
  segmentButton: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    minHeight: 46,
    justifyContent: 'center',
  },
  segmentText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '900',
  },
});
