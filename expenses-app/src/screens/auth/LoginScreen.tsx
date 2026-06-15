import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { requestOtp, verifyOtp } from '../../api/auth';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Screen } from '../../components/Screen';
import { colors, radius } from '../../constants/theme';
import { t } from '../../constants/translations';
import { useApp } from '../../context/AppContext';

export function LoginScreen() {
  const { login, settings } = useApp();
  const language = settings.language;
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [hasRequestedOtp, setHasRequestedOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    if (!identifier.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await requestOtp(identifier.trim());
      setHasRequestedOtp(true);
      setDevOtp(response.devOtp ?? null);
    } catch (error) {
      Alert.alert(error instanceof Error ? error.message : 'Unable to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const submitOtp = async () => {
    if (!identifier.trim() || !otp.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await verifyOtp(identifier.trim(), otp.trim());
      await login(response.token, response.user);
    } catch (error) {
      Alert.alert(error instanceof Error ? error.message : 'Unable to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.badge}>Penn Selavu</Text>
        <Header title={t(language, 'loginTitle')} subtitle={t(language, 'loginSubtitle')} />
      </View>

      <InputField
        keyboardType="email-address"
        label={t(language, 'phoneOrEmail')}
        onChangeText={setIdentifier}
        placeholder="+91 98765 43210"
        value={identifier}
      />

      {hasRequestedOtp ? (
        <>
          {devOtp ? (
            <View style={styles.devBox}>
              <Text style={styles.devLabel}>{t(language, 'devOtp')}</Text>
              <Text style={styles.devOtp}>{devOtp}</Text>
            </View>
          ) : null}
          <InputField keyboardType="number-pad" label={t(language, 'otp')} onChangeText={setOtp} placeholder="123456" value={otp} />
          <Button label={isLoading ? '...' : t(language, 'verifyOtp')} onPress={submitOtp} />
          <Pressable
            onPress={() => {
              setHasRequestedOtp(false);
              setOtp('');
              setDevOtp(null);
            }}
            style={styles.changeButton}
          >
            <Text style={styles.changeText}>{t(language, 'changeIdentifier')}</Text>
          </Pressable>
        </>
      ) : (
        <Button label={isLoading ? '...' : t(language, 'sendOtp')} onPress={sendOtp} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  changeButton: {
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  changeText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  devBox: {
    backgroundColor: '#FFF4D8',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 4,
    padding: 14,
  },
  devLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
  },
  devOtp: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  hero: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 18,
    padding: 20,
  },
});
