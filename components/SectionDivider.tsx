import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  num: string;
  label: string;
  icon: ReactNode;
  color: string;
};

export function SectionDivider({ num, label, icon, color }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.num, { color }]}>{num} /</Text>
      {icon}
      <Text style={[styles.label, { color }]}>{label}</Text>
      <View style={[styles.line, { backgroundColor: colors.sectionLine }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 18,
    marginBottom: 8,
  },
  num: {
    fontFamily: 'DMMono_400Regular',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  label: {
    fontFamily: 'DMMono_400Regular',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  line: {
    flex: 1,
    height: 1,
    marginLeft: 4,
  },
});
