import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../constants/theme';

type StatCardProps = {
  label: string;
  value: string;
  tone?: 'primary' | 'green' | 'blue' | 'gold';
};

export function StatCard({ label, tone = 'primary', value }: StatCardProps) {
  return (
    <View style={[styles.card, styles[tone]]}>
      <Text style={styles.label}>{label}</Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  blue: {
    backgroundColor: '#EDF5FF',
  },
  card: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flex: 1,
    gap: 8,
    minHeight: 104,
    padding: 14,
  },
  gold: {
    backgroundColor: '#FFF4D8',
  },
  green: {
    backgroundColor: '#ECF8F0',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  primary: {
    backgroundColor: colors.surfaceSoft,
  },
  value: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
});
