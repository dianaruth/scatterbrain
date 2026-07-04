import { LinearGradient } from 'expo-linear-gradient';
import {
  Alarm,
  Bell,
  BellRinging,
  Calendar,
  Notebook,
} from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CaptureBar } from '@/components/CaptureBar';
import { ItemCard } from '@/components/ItemCard';
import { Logo } from '@/components/Logo';
import { SectionDivider } from '@/components/SectionDivider';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useTheme } from '@/theme/ThemeProvider';

type SampleItem = {
  id: string;
  type: 'overdue' | 'calendar' | 'reminder' | 'note';
  title: string;
  typeLabel: string;
  meta: string;
  chip: string;
  icon: React.ReactNode;
};

type Section = {
  num: string;
  label: string;
  sectionIcon: React.ReactNode;
  sectionColor: string;
  items: SampleItem[];
};

function toRows<T>(items: T[]): [T, T | null][] {
  const rows: [T, T | null][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push([items[i]!, items[i + 1] ?? null]);
  }
  return rows;
}

function renderSection(section: Section): React.ReactNode {
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
          icon={item.icon}
        />
      ))}
    </View>
  );
}

export default function TodayScreen() {
  const { colors, fonts, typeColors } = useTheme();
  const insets = useSafeAreaInsets();
  const bp = useBreakpoint();

  const sections: Section[] = [
    {
      num: '01',
      label: 'Overdue',
      sectionIcon: <Alarm size={12} color={typeColors.overdue.accent} weight="fill" />,
      sectionColor: colors.sectionOverdueAccent,
      items: [
        {
          id: '1',
          type: 'overdue',
          title: 'Call the dentist',
          typeLabel: 'Reminder',
          meta: '2 days overdue',
          chip: 'LATE',
          icon: <Bell size={17} color={typeColors.overdue.accent} weight="fill" />,
        },
      ],
    },
    {
      num: '02',
      label: 'Today',
      sectionIcon: <Calendar size={12} color={colors.sectionTodayAccent} weight="fill" />,
      sectionColor: colors.sectionTodayAccent,
      items: [
        {
          id: '2',
          type: 'calendar',
          title: 'Team standup',
          typeLabel: 'Calendar',
          meta: '10:00 AM',
          chip: '10:00',
          icon: <Calendar size={17} color={typeColors.calendar.accent} weight="fill" />,
        },
        {
          id: '3',
          type: 'reminder',
          title: 'Pick up dry cleaning',
          typeLabel: 'Reminder',
          meta: '6:00 PM',
          chip: '18:00',
          icon: <BellRinging size={17} color={typeColors.reminder.accent} weight="fill" />,
        },
      ],
    },
    {
      num: '03',
      label: 'Notes',
      sectionIcon: <Notebook size={12} color={colors.sectionEmptyAccent} weight="fill" />,
      sectionColor: colors.sectionEmptyAccent,
      items: [
        {
          id: '4',
          type: 'note',
          title: 'Grocery ideas',
          typeLabel: 'Note',
          meta: 'edited yesterday',
          chip: 'NOTE',
          icon: <Notebook size={17} color={typeColors.note.accent} weight="fill" />,
        },
      ],
    },
  ];

  const hdrPx = bp === 'mobile' ? 24 : 36;
  const greetingSize = bp === 'tablet' ? 58 : 48;
  const captureMx = bp === 'mobile' ? 20 : bp === 'tablet' ? 28 : 36;
  const captureMt = bp === 'tablet' ? -26 : -22;

  const overdueSec = sections[0];
  const todaySec = sections[1];
  const notesSec = sections[2];

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
          style={[styles.header, { paddingTop: insets.top + 16, paddingHorizontal: hdrPx }]}
        >
          <View style={styles.headerTop}>
            {bp === 'desktop' ? (
              <Text style={[styles.dateText, { color: colors.subText, fontFamily: fonts.mono }]}>
                {new Date()
                  .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
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
            <Text style={[styles.dateText, { color: colors.subText, fontFamily: fonts.mono, marginBottom: 6 }]}>
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
          <Text style={[styles.subtitle, { color: colors.subText, fontFamily: fonts.bodyRegular }]}>
            3 things need attention
          </Text>
        </LinearGradient>

        {/* Floating capture bar */}
        <CaptureBar marginHorizontal={captureMx} marginTop={captureMt} />

        {/* Body */}
        <View style={[styles.body, { paddingHorizontal: hdrPx }]}>
          {bp === 'desktop' ? (
            <View style={styles.desktopColumns}>
              <View style={styles.desktopCol}>
                {overdueSec !== undefined && renderSection(overdueSec)}
                {todaySec !== undefined && renderSection(todaySec)}
              </View>
              <View style={styles.desktopCol}>
                {notesSec !== undefined && renderSection(notesSec)}
              </View>
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
                {section.label === 'Overdue' ? (
                  section.items.map((item) => (
                    <ItemCard
                      key={item.id}
                      type={item.type}
                      title={item.title}
                      typeLabel={item.typeLabel}
                      meta={item.meta}
                      chip={item.chip}
                      icon={item.icon}
                    />
                  ))
                ) : (
                  toRows(section.items).map(([a, b], i) => (
                    <View key={i} style={styles.tabletRow}>
                      <View style={styles.tabletCell}>
                        <ItemCard
                          type={a.type}
                          title={a.title}
                          typeLabel={a.typeLabel}
                          meta={a.meta}
                          chip={a.chip}
                          icon={a.icon}
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
                            icon={b.icon}
                          />
                        </View>
                      ) : (
                        <View style={styles.tabletCell} />
                      )}
                    </View>
                  ))
                )}
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
                    icon={item.icon}
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
  body: {
    paddingTop: 28,
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
