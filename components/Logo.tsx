import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  size?: 'sm' | 'lg';
};

const NODES = [
  { cx: 10, cy: 2,  r: 2.2, fill: '#A090F0', opacity: 0.95 },
  { cx: 16, cy: 6,  r: 1.4, fill: '#C0B0FF', opacity: 0.60 },
  { cx: 3,  cy: 5,  r: 1.6, fill: '#A090F0', opacity: 0.65 },
  { cx: 14, cy: 11, r: 1.1, fill: '#C0B0FF', opacity: 0.50 },
  { cx: 5,  cy: 13, r: 1.9, fill: '#A090F0', opacity: 0.90 },
  { cx: 12, cy: 17, r: 1.3, fill: '#C0B0FF', opacity: 0.55 },
  { cx: 3,  cy: 19, r: 1.0, fill: '#A090F0', opacity: 0.40 },
] as const;

export function Logo({ size = 'lg' }: Props) {
  const { fonts, colors } = useTheme();
  const fontSize = size === 'lg' ? 18 : 12;
  const svgW = size === 'lg' ? 20 : 13;
  const svgH = size === 'lg' ? 22 : 14;

  return (
    <View style={styles.row}>
      <Text style={[styles.word, { fontSize, fontFamily: fonts.mono, color: colors.textPrimary }]}>
        scatter
      </Text>
      <Svg
        width={svgW}
        height={svgH}
        viewBox="0 0 20 22"
        style={styles.nodes}
      >
        {NODES.map((node, i) => (
          <Circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={node.fill}
            opacity={node.opacity}
          />
        ))}
      </Svg>
      <Text style={[styles.word, { fontSize, fontFamily: fonts.mono, color: colors.navActive }]}>
        brain
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  word: {
    lineHeight: 22,
  },
  nodes: {
    marginHorizontal: 3,
  },
});
