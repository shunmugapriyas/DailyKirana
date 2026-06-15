import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '../constants/theme';

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

export function InputField({ keyboardType, label, onChangeText, placeholder, value }: InputFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 17,
    minHeight: 54,
    paddingHorizontal: 16,
  },
  label: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
});
