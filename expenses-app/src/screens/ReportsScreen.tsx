import { StyleSheet, Text, View } from 'react-native';
import { categories } from '../constants/categories';
import { colors, radius } from '../constants/theme';
import { t } from '../constants/translations';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { useApp } from '../context/AppContext';
import { isCurrentMonth } from '../utils/date';
import { getCategoryTotals, getHighestCategory, getMonthlyTotal, getSavingTip } from '../utils/expense';
import { formatCurrency } from '../utils/money';

export function ReportsScreen() {
  const { expenses, settings } = useApp();
  const { language } = settings;
  const monthlyExpenses = expenses.filter((expense) => isCurrentMonth(expense.date));
  const monthlyTotal = getMonthlyTotal(expenses);
  const totals = getCategoryTotals(monthlyExpenses);
  const highest = getHighestCategory(monthlyExpenses, language);
  const tip = getSavingTip(expenses, language);

  return (
    <Screen>
      <Header title={t(language, 'reports')} subtitle={t(language, 'monthlySpending')} />

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>{t(language, 'monthlyExpense')}</Text>
        <Text style={styles.summaryValue}>{formatCurrency(monthlyTotal)}</Text>
      </View>

      <View style={styles.bars}>
        {categories.map((category) => {
          const amount = totals[category.key] ?? 0;
          const percent = monthlyTotal > 0 ? Math.max((amount / monthlyTotal) * 100, amount > 0 ? 4 : 0) : 0;

          return (
            <View key={category.key} style={styles.barRow}>
              <View style={styles.barLabelRow}>
                <Text style={styles.barLabel}>{category.labels[language]}</Text>
                <Text style={styles.barAmount}>{formatCurrency(amount)}</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { backgroundColor: category.color, width: `${percent}%` }]} />
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightLabel}>{t(language, 'highestCategory')}</Text>
        <Text style={styles.insightValue}>{highest ? `${highest.label} · ${formatCurrency(highest.amount)}` : t(language, 'noExpenses')}</Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.insightLabel}>{t(language, 'savingTip')}</Text>
        <Text style={styles.tip}>{tip}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  barAmount: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '900',
  },
  barLabel: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
  },
  barLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  barRow: {
    gap: 8,
  },
  bars: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 16,
    padding: 16,
  },
  fill: {
    borderRadius: 999,
    height: '100%',
  },
  insightCard: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  insightLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '900',
  },
  insightValue: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
  },
  summary: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    gap: 8,
    padding: 20,
  },
  summaryLabel: {
    color: '#FFEAF0',
    fontSize: 14,
    fontWeight: '800',
  },
  summaryValue: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: '900',
  },
  tip: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  tipCard: {
    backgroundColor: '#FFF4D8',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  track: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    height: 12,
    overflow: 'hidden',
  },
});
