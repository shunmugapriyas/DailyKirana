import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { Screen } from '../components/Screen';
import { colors, radius } from '../constants/theme';
import { t } from '../constants/translations';
import { useApp } from '../context/AppContext';
import type { Language } from '../types/expense';

export function SettingsScreen() {
  const { logout, settings, updateSettings } = useApp();
  const [language, setLanguage] = useState<Language>(settings.language);
  const [income, setIncome] = useState(String(settings.monthlyIncome || ''));
  const [budget, setBudget] = useState(String(settings.monthlyBudget || ''));
  const [goal, setGoal] = useState(String(settings.monthlySavingsGoal || ''));
  const [pinEnabled, setPinEnabled] = useState(settings.pinLockEnabled);

  const save = async () => {
    await updateSettings({
      language,
      monthlyIncome: Number(income) || 0,
      monthlyBudget: Number(budget) || 0,
      monthlySavingsGoal: Number(goal) || 0,
      pinLockEnabled: pinEnabled,
    });
  };

  return (
    <Screen>
      <Header title={t(language, 'settings')} />

      <View style={styles.section}>
        <Text style={styles.label}>{t(language, 'language')}</Text>
        <View style={styles.segment}>
          {(['ta', 'en'] as Language[]).map((item) => {
            const active = item === language;
            return (
              <Pressable key={item} onPress={() => setLanguage(item)} style={[styles.segmentButton, active && styles.activeSegment]}>
                <Text style={[styles.segmentText, active && styles.activeSegmentText]}>
                  {item === 'ta' ? t(language, 'tamil') : t(language, 'english')}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <InputField keyboardType="numeric" label={t(language, 'monthlyIncome')} onChangeText={setIncome} value={income} />
      <InputField keyboardType="numeric" label={t(language, 'monthlyBudget')} onChangeText={setBudget} value={budget} />
      <InputField keyboardType="numeric" label={t(language, 'savingsGoal')} onChangeText={setGoal} value={goal} />

      <View style={styles.pinCard}>
        <View style={styles.pinCopy}>
          <Text style={styles.pinTitle}>{t(language, 'pinLock')}</Text>
          <Text style={styles.pinSubtitle}>{t(language, 'pinPlaceholder')}</Text>
        </View>
        <Switch
          onValueChange={setPinEnabled}
          thumbColor={colors.surface}
          trackColor={{ false: colors.border, true: colors.primary }}
          value={pinEnabled}
        />
      </View>

      <Button label={t(language, 'update')} onPress={save} />
      <Button label={t(language, 'logout')} onPress={logout} variant="secondary" />
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
  label: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  pinCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
  },
  pinCopy: {
    flex: 1,
    gap: 4,
  },
  pinSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  pinTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
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
