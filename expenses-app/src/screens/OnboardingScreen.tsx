import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { Screen } from '../components/Screen';
import { colors, radius } from '../constants/theme';
import { t } from '../constants/translations';
import { useApp } from '../context/AppContext';
import type { Language } from '../types/expense';

export function OnboardingScreen() {
  const { settings, updateSettings } = useApp();
  const [language, setLanguage] = useState<Language>(settings.language);
  const [income, setIncome] = useState('');
  const [goal, setGoal] = useState('');

  const finishOnboarding = async () => {
    const monthlyIncome = Number(income) || 0;
    const monthlySavingsGoal = Number(goal) || 0;

    await updateSettings({
      language,
      monthlyIncome,
      monthlyBudget: Math.max(monthlyIncome - monthlySavingsGoal, 0),
      monthlySavingsGoal,
      hasCompletedOnboarding: true,
    });
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.badge}>பெண் செலவு</Text>
        <Header title={t(language, 'appName')} subtitle={t(language, 'tagline')} />
      </View>

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

      <InputField keyboardType="numeric" label={t(language, 'monthlyIncome')} onChangeText={setIncome} placeholder="30000" value={income} />
      <InputField keyboardType="numeric" label={t(language, 'savingsGoal')} onChangeText={setGoal} placeholder="5000" value={goal} />
      <Button label={t(language, 'start')} onPress={finishOnboarding} />
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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  hero: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 18,
    padding: 20,
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
    minHeight: 48,
    justifyContent: 'center',
  },
  segmentText: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '900',
  },
});
