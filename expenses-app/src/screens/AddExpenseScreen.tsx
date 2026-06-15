import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { Screen } from '../components/Screen';
import { categories } from '../constants/categories';
import { colors, radius } from '../constants/theme';
import { paymentModes, t } from '../constants/translations';
import { useApp } from '../context/AppContext';
import type { CategoryKey, PaymentMode } from '../types/expense';
import { toDateInputValue } from '../utils/date';

export function AddExpenseScreen() {
  const navigation = useNavigation();
  const { addExpense, settings } = useApp();
  const { language } = settings;
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryKey>('food');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('cash');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(toDateInputValue());

  const save = async () => {
    const parsedAmount = Number(amount);
    const parsedDate = new Date(`${date}T00:00:00`);

    if (!parsedAmount || Number.isNaN(parsedDate.getTime())) {
      Alert.alert(t(language, 'requiredFields'));
      return;
    }

    await addExpense({
      amount: parsedAmount,
      category,
      date,
      note: note.trim(),
      paymentMode,
    });
    navigation.goBack();
  };

  return (
    <Screen>
      <Header title={t(language, 'addExpense')} />
      <InputField keyboardType="numeric" label={t(language, 'amount')} onChangeText={setAmount} placeholder="250" value={amount} />

      <View style={styles.section}>
        <Text style={styles.label}>{t(language, 'category')}</Text>
        <View style={styles.chipGrid}>
          {categories.map((item) => {
            const active = item.key === category;
            return (
              <Pressable key={item.key} onPress={() => setCategory(item.key)} style={[styles.chip, active && styles.activeChip]}>
                <Text style={styles.chipIcon}>{item.icon}</Text>
                <Text style={[styles.chipText, active && styles.activeChipText]}>{item.labels[language]}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t(language, 'paymentMode')}</Text>
        <View style={styles.segment}>
          {paymentModes.map((mode) => {
            const active = mode === paymentMode;
            return (
              <Pressable key={mode} onPress={() => setPaymentMode(mode)} style={[styles.segmentButton, active && styles.activeSegment]}>
                <Text style={[styles.segmentText, active && styles.activeSegmentText]}>{t(language, mode)}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <InputField label={t(language, 'note')} onChangeText={setNote} placeholder={language === 'ta' ? 'உதா: காய்கறி' : 'Example: vegetables'} value={note} />
      <InputField label={`${t(language, 'date')} (YYYY-MM-DD)`} onChangeText={setDate} value={date} />

      <View style={styles.actions}>
        <Button label={t(language, 'cancel')} onPress={() => navigation.goBack()} variant="secondary" style={styles.action} />
        <Button label={t(language, 'save')} onPress={save} style={styles.action} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  action: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeChipText: {
    color: colors.surface,
  },
  activeSegment: {
    backgroundColor: colors.primary,
  },
  activeSegmentText: {
    color: colors.surface,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 12,
    width: '48%',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  chipIcon: {
    fontSize: 18,
  },
  chipText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
  },
  label: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  section: {
    gap: 8,
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
    fontSize: 15,
    fontWeight: '900',
  },
});
