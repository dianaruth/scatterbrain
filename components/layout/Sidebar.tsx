import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { type Icon as PhosphorIcon, Bell, Calendar, Gear, House, Notebook } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Logo } from '@/components/Logo';
import { useTheme } from '@/theme/ThemeProvider';

type NavItemDef = {
  label: string;
  Icon: PhosphorIcon;
  href: '/' | '/calendar' | '/reminders' | '/notes';
  matches: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItemDef[] = [
  { label: 'Home', Icon: House, href: '/', matches: (p) => p === '/' },
  { label: 'Calendar', Icon: Calendar, href: '/calendar', matches: (p) => p === '/calendar' },
  { label: 'Reminders', Icon: Bell, href: '/reminders', matches: (p) => p === '/reminders' },
  { label: 'Notes', Icon: Notebook, href: '/notes', matches: (p) => p === '/notes' },
];

export function Sidebar() {
  const { colors, fonts } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={[styles.sidebar, { backgroundColor: colors.cardBg, borderRightColor: colors.cardBorder }]}>
      <View style={styles.logoWrap}>
        <Logo size="lg" />
      </View>

      <View style={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const active = item.matches(pathname);
          return (
            <Pressable
              key={item.label}
              style={[
                styles.navItem,
                active && { backgroundColor: 'rgba(160,144,240,0.10)' },
              ]}
              onPress={() => { router.push(item.href); }}
            >
              <item.Icon
                size={18}
                color={active ? colors.navActive : colors.navInactive}
                weight="fill"
              />
              <Text
                style={[
                  styles.navLabel,
                  { fontFamily: fonts.bodyMedium },
                  { color: active ? colors.navActive : colors.navInactive },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}

        <View style={[styles.navItem, styles.navItemDisabled]}>
          <Gear size={18} color={colors.navInactive} weight="fill" />
          <Text style={[styles.navLabel, { fontFamily: fonts.bodyMedium, color: colors.navInactive }]}>
            Settings
          </Text>
        </View>
      </View>

      <View style={styles.userSection}>
        <LinearGradient
          colors={colors.avatarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={[styles.avatarText, { fontFamily: fonts.mono }]}>DR</Text>
        </LinearGradient>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.textPrimary, fontFamily: fonts.bodySemiBold }]}>
            Diana Ruth
          </Text>
          <Text style={[styles.userEmail, { color: colors.textMuted, fontFamily: fonts.bodyRegular }]}>
            dianaruth40@gmail.com
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 210,
    flexShrink: 0,
    borderRightWidth: 1,
    paddingTop: 28,
    paddingHorizontal: 14,
    paddingBottom: 22,
    flexDirection: 'column',
  },
  logoWrap: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  nav: {
    gap: 2,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  navItemDisabled: {
    opacity: 0.45,
    marginTop: 8,
  },
  navLabel: {
    fontSize: 14,
  },
  userSection: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EAF0FF',
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: 13,
  },
  userEmail: {
    fontSize: 11,
    marginTop: 1,
  },
});
