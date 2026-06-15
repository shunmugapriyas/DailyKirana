import { StyleSheet, Text, View } from 'react-native';
import type { Category } from '../constants/categories';
import { colors, radius } from '../constants/theme';
import { formatCurrency } from '../utils/money';

type CategoryCardProps = {
  category: Category;
  amount: number;
  language: 'ta' | 'en';
};

export function CategoryCard({ amount, category, language }: CategoryCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${category.color}20` }]}>
        <Text style={styles.iconText}>{category.icon}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{category.labels[language]}</Text>
        <Text style={styles.amount}>{formatCurrency(amount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: colors.ink,
    fontSize: 16,
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
    width: '48%',
  },
  copy: {
    flex: 1,
    gap: 3,
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
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
});
