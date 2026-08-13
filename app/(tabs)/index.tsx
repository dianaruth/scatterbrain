import { LinearGradient } from 'expo-linear-gradient';
import { Alarm, Bell, BellRinging, Calendar, Notebook } from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CaptureBar } from '@/components/CaptureBar';
import { ItemCard } from '@/components/ItemCard';
import { Logo } from '@/components/Logo';
import { SectionDivider } from '@/components/SectionDivider';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useAttentionCount, useTodaySections } from '@/store';
import type { ItemType, TodaySection } from '@/store';
import { useTheme } from '@/theme/ThemeProvider';

type ThemeTypeColors = ReturnType<typeof useTheme>['typeColors'];

type RenderSection = TodaySection & {
  sectionIcon: React.ReactNode;
  sectionColor: string;
};

const CONTENT_MAX = 720;
const DESKTOP_TWO_COL_MIN = 1150;

function toRows<T>(items: T[]): [T, T | null][] {
  const rows: [T, T | null][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push([items[i]!, items[i + 1] ?? null]);
  }
  return rows;
}

function iconForType(type: ItemType, typeColors: ThemeTypeColors): React.ReactNode {
  switch (type) {
    case 'overdue':
      return <Bell size={17} color={typeColors.overdue.accent} weight="fill" />;
    case 'calendar':
      return <Calendar size={17} color={typeColors.calendar.accent} weight="fill" />;
    case 'reminder':
      return <BellRinging size={17} color={typeColors.reminder.accent} weight="fill" />;
    case 'note':
      return <Notebook size={17} color={typeColors.note.accent} weight="fill" />;
  }
}

function renderSection(section: RenderSection, typeColors: ThemeTypeColors): React.ReactNode {
  return (
    <View key={section.num}>
      <SectionDivider
        num={section.num}
        label={section.label}
        icon={section.sectionIcon}
        color={section.sectionColor}
      />
      {section.items.map((item) => (
        <ItemCard
          key={item.id}
          type={item.type}
          title={item.title}
          typeLabel={item.typeLabel}
          meta={item.meta}
          chip={item.chip}
          icon={iconForType(item.type, typeColors)}
        />
      ))}
    </View>
  );
}

export default function TodayScreen() {
  const { colors, fonts, typeColors } = useTheme();
  const insets = useSafeAreaInsets();
  const bp = useBreakpoint();
  const { width } = useWindowDimensions();
  const wideColumns = width >= DESKTOP_TWO_COL_MIN;

  const now = new Date();
  const [overdueSection, todaySection, notesSection] = useTodaySections(now);
  const attentionCount = useAttentionCount(now);

  const sections: [RenderSection, RenderSection, RenderSection] = [
    {
      ...overdueSection,
      sectionIcon: <Alarm size={12} color={typeColors.overdue.accent} weight="fill" />,
      sectionColor: colors.sectionOverdueAccent,
    },
    {
      ...todaySection,
      sectionIcon: <Calendar size={12} color={colors.sectionTodayAccent} weight="fill" />,
      sectionColor: colors.sectionTodayAccent,
    },
    {
      ...notesSection,
      sectionIcon: <Notebook size={12} color={colors.sectionEmptyAccent} weight="fill" />,
      sectionColor: colors.sectionEmptyAccent,
    },
  ];

  const hdrPx = bp === 'mobile' ? 24 : 36;
  const greetingSize = bp === 'tablet' ? 58 : 48;
  const captureMx = bp === 'mobile' ? 20 : bp === 'tablet' ? 28 : 36;
  const captureMt = bp === 'tablet' ? -26 : -22;

  const [overdueSec, todaySec, notesSec] = sections;

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={colors.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <View style={[styles.headerInner, { paddingHorizontal: hdrPx }]}>
            <View style={styles.headerTop}>
              {bp === 'desktop' ? (
                <Text style={[styles.dateText, { color: colors.subText, fontFamily: fonts.mono }]}>
                  {new Date()
                    .toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                    .toUpperCase()}
                </Text>
              ) : (
                <Logo size="sm" />
              )}
              <View style={styles.avatar}>
                <LinearGradient
                  colors={colors.avatarGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.avatarGrad, { borderRadius: 6 }]}
                >
                  <Text style={[styles.avatarText, { fontFamily: fonts.mono }]}>DR</Text>
                </LinearGradient>
              </View>
            </View>
            {bp !== 'desktop' && (
              <Text
                style={[
                  styles.dateText,
                  { color: colors.subText, fontFamily: fonts.mono, marginBottom: 6 },
                ]}
              >
                {new Date()
                  .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                  .toUpperCase()}
              </Text>
            )}
            <Text
              style={[
                styles.greeting,
                { color: colors.greeting, fontFamily: fonts.headingBold, fontSize: greetingSize },
              ]}
            >
              {'Good\nmorning.'}
            </Text>
            <Text
              style={[styles.subtitle, { color: colors.subText, fontFamily: fonts.bodyRegular }]}
            >
              {attentionCount === 1
                ? '1 thing needs attention'
                : `${attentionCount} things need attention`}
            </Text>
          </View>
        </LinearGradient>

        {/* Floating capture bar */}
        <View style={[styles.captureWrap, { paddingHorizontal: captureMx }]}>
          <CaptureBar marginHorizontal={0} marginTop={captureMt} />
        </View>

        {/* Body */}
        <View style={[styles.body, { paddingHorizontal: hdrPx }]}>
          {bp === 'desktop' && wideColumns ? (
            <View style={styles.desktopColumns}>
              <View style={styles.desktopCol}>
                {renderSection(overdueSec, typeColors)}
                {renderSection(todaySec, typeColors)}
              </View>
              <View style={styles.desktopCol}>{renderSection(notesSec, typeColors)}</View>
            </View>
          ) : bp === 'tablet' ? (
            sections.map((section) => (
              <View key={section.num}>
                <SectionDivider
                  num={section.num}
                  label={section.label}
                  icon={section.sectionIcon}
                  color={section.sectionColor}
                />
                {section.label === 'Overdue'
                  ? section.items.map((item) => (
                      <ItemCard
                        key={item.id}
                        type={item.type}
                        title={item.title}
                        typeLabel={item.typeLabel}
                        meta={item.meta}
                        chip={item.chip}
                        icon={iconForType(item.type, typeColors)}
                      />
                    ))
                  : toRows(section.items).map(([a, b], i) => (
                      <View key={i} style={styles.tabletRow}>
                        <View style={styles.tabletCell}>
                          <ItemCard
                            type={a.type}
                            title={a.title}
                            typeLabel={a.typeLabel}
                            meta={a.meta}
                            chip={a.chip}
                            icon={iconForType(a.type, typeColors)}
                          />
                        </View>
                        {b !== null ? (
                          <View style={styles.tabletCell}>
                            <ItemCard
                              type={b.type}
                              title={b.title}
                              typeLabel={b.typeLabel}
                              meta={b.meta}
                              chip={b.chip}
                              icon={iconForType(b.type, typeColors)}
                            />
                          </View>
                        ) : (
                          <View style={styles.tabletCell} />
                        )}
                      </View>
                    ))}
              </View>
            ))
          ) : (
            sections.map((section) => (
              <View key={section.num}>
                <SectionDivider
                  num={section.num}
                  label={section.label}
                  icon={section.sectionIcon}
                  color={section.sectionColor}
                />
                {section.items.map((item) => (
                  <ItemCard
                    key={item.id}
                    type={item.type}
                    title={item.title}
                    typeLabel={item.typeLabel}
                    meta={item.meta}
                    chip={item.chip}
                    icon={iconForType(item.type, typeColors)}
                  />
                ))}
              </View>
            ))
          )}
          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingBottom: 28,
  },
  headerInner: {
    width: '100%',
    maxWidth: CONTENT_MAX,
    alignSelf: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 10,
    letterSpacing: 2,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  avatarGrad: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#EAF0FF',
  },
  greeting: {
    lineHeight: 46,
    letterSpacing: -1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
  },
  captureWrap: {
    width: '100%',
    maxWidth: CONTENT_MAX,
    alignSelf: 'center',
  },
  body: {
    paddingTop: 28,
    width: '100%',
    maxWidth: CONTENT_MAX,
    alignSelf: 'center',
  },
  desktopColumns: {
    flexDirection: 'row',
    gap: 28,
  },
  desktopCol: {
    flex: 1,
  },
  tabletRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tabletCell: {
    flex: 1,
  },
  bottomPad: {
    height: 20,
  },
});
