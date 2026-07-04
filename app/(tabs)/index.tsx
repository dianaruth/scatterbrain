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
import { SectionDivider } from '@/components/SectionDivider';
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

export default function TodayScreen() {
  const { colors, fonts, typeColors } = useTheme();
  const insets = useSafeAreaInsets();

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
          <View style={styles.headerTop}>
            <Text style={[styles.dateText, { color: colors.subText, fontFamily: fonts.mono }]}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
            </Text>
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
          <Text style={[styles.greeting, { color: colors.greeting, fontFamily: fonts.headingBold }]}>
            {'Good\nmorning.'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.subText, fontFamily: fonts.bodyRegular }]}>
            3 things need attention
          </Text>
        </LinearGradient>

        {/* Floating capture bar */}
        <CaptureBar />

        {/* Content */}
        <View style={styles.body}>
          {sections.map((section) => (
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
          ))}
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
    paddingHorizontal: 24,
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
    fontSize: 48,
    lineHeight: 46,
    letterSpacing: -1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  bottomPad: {
    height: 20,
  },
});
