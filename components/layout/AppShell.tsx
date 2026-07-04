import { View } from 'react-native';

import { useBreakpoint } from '@/hooks/useBreakpoint';

import { RightPanel } from './RightPanel';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const bp = useBreakpoint();
  if (bp !== 'desktop') return <>{children}</>;
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Sidebar />
      <View style={{ flex: 1 }}>{children}</View>
      <RightPanel />
    </View>
  );
}
