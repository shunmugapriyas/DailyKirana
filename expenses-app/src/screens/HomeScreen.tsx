import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CategoryCard } from '../components/CategoryCard';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { StatCard } from '../components/StatCard';
import { categories } from '../constants/categories';
import { colors, radius } from '../constants/theme';
import { t } from '../constants/translations';
import { useApp } from '../context/AppContext';
import type { RootStackParamList } from '../navigation/types';
import { getCategoryTotals, getMonthlyTotal, getTodayTotal } from '../utils/expense';
import { formatCurrency } from '../utils/money';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { expenses, settings } = useApp();
  const { language, monthlyBudget, monthlyIncome, monthlySavingsGoal } = settings;
  const todayTotal = getTodayTotal(expenses);
  const monthlyTotal = getMonthlyTotal(expenses);
  const remainingBudget = Math.max(monthlyBudget - monthlyTotal, 0);
  const estimatedSavings = Math.max(monthlyIncome - monthlyTotal, 0);
  const savingsProgress = monthlySavingsGoal > 0 ? Math.min(estimatedSavings / monthlySavingsGoal, 1) : 0;
  const totals = getCategoryTotals(expenses);
  const visibleCategories = categories.filter((category) => (totals[category.key] ?? 0) > 0).slice(0, 6);

  return (
    <View style={styles.container}>
      <Screen>
        <Header title={t(language, 'home')} subtitle={t(language, 'tagline')} />

        <View style={styles.statsRow}>
          <StatCard label={t(language, 'todayExpense')} value={formatCurrency(todayTotal)} tone="primary" />
          <StatCard label={t(language, 'monthlyExpense')} value={formatCurrency(monthlyTotal)} tone="gold" />
        </View>
        <View style={styles.statsRow}>
          <StatCard label={t(language, 'remainingBudget')} value={formatCurrency(remainingBudget)} tone="green" />
          <StatCard label={t(language, 'savingsGoal')} value={formatCurrency(monthlySavingsGoal)} tone="blue" />
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>{t(language, 'savingsProgress')}</Text>
            <Text style={styles.percent}>{Math.round(savingsProgress * 100)}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${savingsProgress * 100}%` }]} />
          </View>
          <Text style={styles.helper}>
            {formatCurrency(estimatedSavings)} {t(language, 'left')}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>{t(language, 'categorySummary')}</Text>
        <View style={styles.categoryGrid}>
          {(visibleCategories.length ? visibleCategories : categories.slice(0, 4)).map((category) => (
            <CategoryCard key={category.key} amount={totals[category.key] ?? 0} category={category} language={language} />
          ))}
        </View>
      </Screen>

      <Pressable onPress={() => navigation.navigate('AddExpense')} style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
        <Text style={styles.fabPlus}>+</Text>
        <Text style={styles.fabText}>{t(language, 'addExpense')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    bottom: 22,
    elevation: 6,
    flexDirection: 'row',
    gap: 8,
    minHeight: 58,
    paddingHorizontal: 20,
    position: 'absolute',
    right: 18,
    shadowColor: colors.primaryDark,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
  },
  fabPlus: {
    color: colors.surface,
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 28,
  },
  fabText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '900',
  },
  fill: {
    backgroundColor: colors.green,
    borderRadius: 999,
    height: '100%',
  },
  helper: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  percent: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.86,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  track: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    height: 12,
    overflow: 'hidden',
  },
});
