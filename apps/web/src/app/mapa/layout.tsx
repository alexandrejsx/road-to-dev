import type { ReactNode } from 'react';
import { AppHeader } from '@/components/app-header';
import { demoBalances } from '@/features/skill-map/fixtures/progress';

export default function MapLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <AppHeader {...demoBalances} />
      {children}
    </div>
  );
}
