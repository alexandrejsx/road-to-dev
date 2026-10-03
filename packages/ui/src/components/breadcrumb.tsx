import type { ReactNode } from 'react';

export function Breadcrumb({ children }: { children: ReactNode }) {
  return (
    <nav aria-label="Navegação estrutural">
      <ol className="flex items-center gap-3 text-sm text-muted-foreground">
        {children}
      </ol>
    </nav>
  );
}
