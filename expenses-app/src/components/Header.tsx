import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ subtitle, title }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '900',
  },
});
