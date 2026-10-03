import Link from 'next/link';
import { PixelIcon } from '@road-to-dev/ui/components/pixel-icon';
import { Tooltip } from '@road-to-dev/ui/components/tooltip';

export function AppHeader({ xp, coins }: { xp: string; coins: string }) {
  return (
    <header className="app-header">
      <Link
        href="/mapa/inicial"
        className="app-brand"
        aria-label="RTD — mapa inicial"
      >
        RTD
      </Link>
      <nav aria-label="Navegação principal" className="app-nav">
        <Link
          href="/mapa/inicial"
          aria-current="page"
          className="nav-link is-active"
        >
          Mapa
        </Link>
        <Tooltip content="Quests ainda não está disponível.">
          <button
            type="button"
            aria-disabled="true"
            className="nav-link unavailable"
          >
            Quests<span>Em breve</span>
          </button>
        </Tooltip>
        <Tooltip content="Personagem ainda não está disponível.">
          <button
            type="button"
            aria-disabled="true"
            className="nav-link unavailable"
          >
            Personagem<span>Em breve</span>
          </button>
        </Tooltip>
      </nav>
      <Tooltip content="Saldos de demonstração. Explorar o mapa não altera XP ou moedas.">
        <div
          className="header-balances"
          tabIndex={0}
          aria-label={`Saldo de demonstração: ${xp} XP e ${coins} moedas`}
        >
          <span className="xp-balance">
            {xp}
            <span>XP</span>
          </span>
          <span className="balance-divider" aria-hidden="true" />
          <span className="coin-balance">
            <PixelIcon name="coin" size={24} />
            {coins}
            <span className="sr-only"> moedas</span>
          </span>
        </div>
      </Tooltip>
    </header>
  );
}
