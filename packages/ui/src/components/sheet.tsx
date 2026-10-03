'use client';

import { Dialog } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';

export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus?: ComponentProps<typeof Dialog.Content>['onCloseAutoFocus'];
  children: ReactNode;
};

export function Sheet({
  open,
  onOpenChange,
  children,
  onCloseAutoFocus,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="rtd-overlay" />
        <Dialog.Content
          className="rtd-sheet"
          onCloseAutoFocus={onCloseAutoFocus}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
