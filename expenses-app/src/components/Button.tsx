import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius } from '../constants/theme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
};

export function Button({ label, onPress, style, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  pressed: {
    opacity: 0.82,
  },
  secondary: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderWidth: 1,
  },
  secondaryText: {
    color: colors.ink,
  },
  text: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
});
