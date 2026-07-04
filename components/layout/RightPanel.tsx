import { type Icon as PhosphorIcon, BellRinging, Calendar, UsersThree } from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type MiniCardData = {
  id: string;
  Icon: PhosphorIcon;
  iconColor: string;
  badgeBg: string;
  title: string;
  meta: string;
};

export function RightPanel() {
  const { colors, fonts, typeColors } = useTheme();

  const upcomingItems: MiniCardData[] = [
    {
      id: 'u1',
      Icon: Calendar,
      iconColor: typeColors.calendar.accent,
      badgeBg: typeColors.calendar.badgeBgDark,
      title: 'Flight to NYC',
      meta: 'Thu · 09:00',
    },
    {
      id: 'u2',
      Icon: BellRinging,
      iconColor: typeColors.reminder.accent,
      badgeBg: typeColors.reminder.badgeBgDark,
      title: 'Renew gym membership',
      meta: 'Fri · end of day',
    },
    {
      id: 'u3',
      Icon: UsersThree,
      iconColor: typeColors.calendar.accent,
      badgeBg: typeColors.calendar.badgeBgDark,
      title: 'Quarterly planning',
      meta: 'Mon · 10:00',
    },
  ];

  return (
    <View style={[styles.panel, { backgroundColor: colors.cardBg, borderLeftColor: colors.cardBorder }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textMuted, fontFamily: fonts.mono }]}>
            Coming up
          </Text>
          {upcomingItems.map((item) => (
            <View
              key={item.id}
              style={[styles.miniCard, { backgroundColor: colors.bg, borderColor: colors.sectionLine }]}
            >
              <View style={[styles.iconBadge, { backgroundColor: item.badgeBg, borderRadius: 5 }]}>
                <item.Icon size={14} color={item.iconColor} weight="fill" />
              </View>
              <View style={styles.miniCardContent}>
                <Text
                  style={[styles.miniCardTitle, { color: colors.cardTitle, fontFamily: fonts.bodyMedium }]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text style={[styles.miniCardMeta, { color: colors.textMuted, fontFamily: fonts.bodyRegular }]}>
                  {item.meta}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textMuted, fontFamily: fonts.mono }]}>
            Recent note
          </Text>
          <View style={[styles.noteCard, { backgroundColor: colors.bg, borderColor: colors.sectionLine }]}>
            <Text style={[styles.noteLabel, { color: typeColors.note.accent, fontFamily: fonts.mono }]}>
              Note
            </Text>
            <Text style={[styles.noteText, { color: colors.textSecondary, fontFamily: fonts.bodyRegular }]}>
              Grocery ideas — oat milk, sourdough, cherry tomatoes, tahini, good olive oil…
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: 250,
    flexShrink: 0,
    borderLeftWidth: 1,
  },
  content: {
    padding: 22,
    paddingHorizontal: 16,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  iconBadge: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  miniCardContent: {
    flex: 1,
    minWidth: 0,
  },
  miniCardTitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  miniCardMeta: {
    fontSize: 11,
    marginTop: 1,
  },
  noteCard: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    paddingHorizontal: 14,
    gap: 4,
  },
  noteLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
