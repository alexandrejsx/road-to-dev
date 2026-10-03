'use client';

import { Dialog as Primitive } from 'radix-ui';
import { useRef, type ReactNode } from 'react';

export const DialogTitle = Primitive.Title;
export const DialogDescription = Primitive.Description;
export const DialogClose = Primitive.Close;

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  const opener = useRef<HTMLElement | null>(null);
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className="rtd-overlay" />
        <Primitive.Content
          className="rtd-dialog"
          onEscapeKeyDown={(event) => event.stopPropagation()}
          onOpenAutoFocus={() => {
            opener.current =
              document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
        >
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
