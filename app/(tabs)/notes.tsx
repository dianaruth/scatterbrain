import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/tokens';

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Pile</Text>
      <Text style={styles.subtitle}>SB-3 coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.bg,
  },
  title: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 32,
    color: colors.dark.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.dark.textMuted,
  },
});
