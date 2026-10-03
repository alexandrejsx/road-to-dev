'use client';

import { Separator as Primitive } from 'radix-ui';

export function Separator() {
  return (
    <Primitive.Root decorative className="h-px w-full shrink-0 bg-border" />
  );
}
