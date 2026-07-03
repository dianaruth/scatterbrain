import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ItemType } from '@/store/items';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  type: ItemType;
  title: string;
  typeLabel: string;
  meta: string;
  chip: string;
  icon: ReactNode;
};

export function ItemCard({ type, title, typeLabel, meta, chip, icon }: Props) {
  const { colors, typeColors, radii } = useTheme();
  const tc = typeColors[type === 'overdue' ? 'overdue' : type === 'calendar' ? 'calendar' : type === 'reminder' ? 'reminder' : 'note'];
  const accent = tc.accent;
  const badgeBg = tc.badgeBgDark;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
      ]}
    >
      <View
        style={[
          styles.typeBar,
          {
            backgroundColor: accent,
            // shadow handled via boxShadow on web; on native the card border carries it
          },
        ]}
      />
      <View
        style={[
          styles.badge,
          { backgroundColor: badgeBg, borderRadius: radii.badge },
        ]}
      >
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.cardTitle }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.meta, { color: colors.cardMeta }]} numberOfLines={1}>
          <Text style={{ color: accent }}>{typeLabel}</Text>
          {' · '}
          {meta}
        </Text>
      </View>
      <View style={[styles.chip, { backgroundColor: badgeBg }]}>
        <Text style={[styles.chipText, { color: accent }]}>{chip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    padding: 11,
    paddingHorizontal: 13,
    marginBottom: 7,
    gap: 11,
  },
  typeBar: {
    width: 2.5,
    alignSelf: 'stretch',
    borderRadius: 99,
  },
  badge: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 15,
    lineHeight: 20,
  },
  meta: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    marginTop: 2,
  },
  chip: {
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 3,
    flexShrink: 0,
  },
  chipText: {
    fontFamily: 'DMMono_400Regular',
    fontSize: 10,
    letterSpacing: 0.5,
  },
});
