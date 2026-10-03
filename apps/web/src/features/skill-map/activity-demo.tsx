'use client';

import { Badge } from '@road-to-dev/ui/components/badge';
import { Button } from '@road-to-dev/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@road-to-dev/ui/components/dialog';
import { Icon } from '@road-to-dev/ui/components/icon';
import { PixelIcon } from '@road-to-dev/ui/components/pixel-icon';
import type { Activity, SkillDefinition } from './types';

export function ActivityDemo({
  activity,
  skill,
  onClose,
}: {
  activity: Activity | null;
  skill: SkillDefinition;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={activity !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {activity && (
        <div data-category={skill.category}>
          <div className="flex items-center justify-between">
            <Badge>Demonstração</Badge>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar demonstração"
              >
                <Icon name="close" />
              </Button>
            </DialogClose>
          </div>
          <div className="mb-6 mt-4">
            <PixelIcon name={skill.icon} size={48} />
          </div>
          <p className="mb-2 text-sm text-muted-foreground">
            {skill.name} <span aria-hidden="true">/</span> {activity.type}
          </p>
          <DialogTitle className="mb-3 text-2xl font-semibold tracking-tight">
            {activity.name}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-muted-foreground">
            {activity.description}
          </DialogDescription>
          <div className="my-6 rounded-lg bg-muted p-4 text-sm leading-relaxed">
            Esta é uma apresentação de exemplo da atividade. A experiência
            completa será disponibilizada em uma próxima etapa. Nenhum
            progresso, XP ou moeda é alterado aqui.
          </div>
          <DialogClose asChild>
            <Button className="w-full">Voltar à skill</Button>
          </DialogClose>
        </div>
      )}
    </Dialog>
  );
}
