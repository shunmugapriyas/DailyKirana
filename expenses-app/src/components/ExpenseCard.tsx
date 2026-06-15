import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getCategory } from '../constants/categories';
import { colors, radius } from '../constants/theme';
import { t } from '../constants/translations';
import type { Expense, Language } from '../types/expense';
import { formatDisplayDate } from '../utils/date';
import { formatCurrency } from '../utils/money';

type ExpenseCardProps = {
  expense: Expense;
  language: Language;
  onDelete?: (id: string) => void;
};

export function ExpenseCard({ expense, language, onDelete }: ExpenseCardProps) {
  const category = getCategory(expense.category);

  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${category.color}20` }]}>
        <Text style={styles.iconText}>{category.icon}</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.title}>{category.labels[language]}</Text>
        <Text numberOfLines={1} style={styles.meta}>
          {expense.note || formatDisplayDate(expense.date)} · {t(language, expense.paymentMode)}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
        {onDelete ? (
          <Pressable onPress={() => onDelete(expense.id)} hitSlop={10}>
            <Text style={styles.delete}>{t(language, 'delete')}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  delete: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'right',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 12,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  iconText: {
    fontSize: 21,
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
  },
  middle: {
    flex: 1,
    gap: 3,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
  },
});
