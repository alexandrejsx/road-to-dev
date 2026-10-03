import type { Metadata } from 'next';
import { Breadcrumb } from '@road-to-dev/ui/components/breadcrumb';
import { Icon } from '@road-to-dev/ui/components/icon';
import { WorldSkillMap } from '@/features/skill-map/world-skill-map';

export const metadata: Metadata = { title: 'Inicial · Mapa | RTD' };

export default function InitialMapPage() {
  return (
    <main id="main-content" className="map-page">
      <h1 className="sr-only">Mapa de skills do mundo Inicial</h1>
      <div className="map-breadcrumb">
        <Breadcrumb>
          <li>
            <span
              aria-disabled="true"
              title="O mapa global ainda não está disponível"
            >
              Mapa
            </span>
          </li>
          <li aria-hidden="true">
            <Icon name="chevron" size={12} />
          </li>
          <li aria-current="page" className="font-medium text-foreground">
            Inicial
          </li>
        </Breadcrumb>
      </div>
      <WorldSkillMap />
    </main>
  );
}
