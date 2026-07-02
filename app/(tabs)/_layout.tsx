import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { colors } from '@/theme/tokens';

type TabIconProps = { label: string; focused: boolean };

function TabIcon({ label, focused }: TabIconProps) {
  return (
    <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.45 }}>{label}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark.nav,
          borderTopColor: colors.dark.navBorder,
        },
        tabBarActiveTintColor: colors.dark.navActive,
        tabBarInactiveTintColor: colors.dark.navInactive,
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_500Medium',
          fontSize: 9,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="⌂" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Cal',
          tabBarIcon: ({ focused }) => <TabIcon label="◫" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Remind',
          tabBarIcon: ({ focused }) => <TabIcon label="◎" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused }) => <TabIcon label="◻" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
