import { MagnifyingGlass } from 'phosphor-react-native';
import { StyleSheet, TextInput, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  marginHorizontal?: number;
  marginTop?: number;
};

export function CaptureBar({ marginHorizontal = 20, marginTop = -22 }: Props) {
  const { colors, radii } = useTheme();

  return (
    <View style={[styles.wrapper, { marginHorizontal, marginTop }]}>
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.captureBarBg,
            borderColor: colors.captureBarBorder,
            borderRadius: radii.captureBar,
          },
        ]}
      >
        <MagnifyingGlass size={16} color={colors.inputIcon} weight="fill" />
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Search or brain dump..."
          placeholderTextColor={colors.captureBarPlaceholder}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    padding: 0,
  },
});
