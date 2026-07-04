import { Bell, Calendar, House, Notebook } from 'phosphor-react-native';
import { Tabs } from 'expo-router';

import { useTheme } from '@/theme/ThemeProvider';

export default function TabLayout() {
  const { colors, fonts } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.nav,
          borderTopColor: colors.navBorder,
        },
        tabBarActiveTintColor: colors.navActive,
        tabBarInactiveTintColor: colors.navInactive,
        tabBarLabelStyle: {
          fontFamily: fonts.bodyMedium,
          fontSize: 9,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <House size={24} color={focused ? colors.navActive : colors.navInactive} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Cal',
          tabBarIcon: ({ focused }) => (
            <Calendar size={24} color={focused ? colors.navActive : colors.navInactive} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Remind',
          tabBarIcon: ({ focused }) => (
            <Bell size={24} color={focused ? colors.navActive : colors.navInactive} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused }) => (
            <Notebook size={24} color={focused ? colors.navActive : colors.navInactive} weight="fill" />
          ),
        }}
      />
    </Tabs>
  );
}
