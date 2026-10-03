type PixelLayer = { path: string; fill: string };
type PixelAsset = {
  size: 24;
  source: 'RTD / SVG local';
  license: 'Original do projeto; acompanha a licença do repositório';
  provisional: true;
  purpose: string;
  layers: readonly PixelLayer[];
};

const ink = 'var(--category-color, var(--rtd-primary))';
const mid = 'var(--category-border, var(--rtd-creation-border))';
const paper = 'var(--rtd-surface)';
const book = [
  { path: 'M2 4h8v1h4V4h8v15h-8v2h-4v-2H2z', fill: ink },
  { path: 'M4 6h6v1h1v11h-1v-1H4zM13 7h1V6h6v11h-6v1h-1z', fill: paper },
  {
    path: 'M5 8h4v1H5zM5 11h4v1H5zM5 14h4v1H5zM15 8h4v1h-4zM15 11h4v1h-4zM15 14h4v1h-4z',
    fill: mid,
  },
] as const;
const compass = [
  {
    path: 'M9 1h6v2h-2v1h4v2h3v3h2v8h-2v3h-3v2H7v-2H4v-3H2V9h2V6h3V4h4V3H9z',
    fill: ink,
  },
  {
    path: 'M8 6h8v2h3v3h1v5h-2v3h-3v1H9v-2H6v-3H4v-5h2V8h2z',
    fill: 'var(--rtd-strategy-surface)',
  },
  { path: 'M14 7h3v3h-2v3h-3v2H9v3H6v-3h2v-3h3v-2h3z', fill: mid },
  { path: 'M14 7h3v3h-2v3h-3v-3h2z', fill: ink },
] as const;
const terminal = [
  { path: 'M3 3h18v15h2v3H1v-3h2z', fill: ink },
  { path: 'M5 5h14v11H5zM3 18h18v1H3z', fill: paper },
  { path: 'M7 7h2v2h2v2H9v2H7v-2h2V9H7zM12 12h5v2h-5zM9 18h6v1H9z', fill: mid },
] as const;

function asset(purpose: string, layers: readonly PixelLayer[]): PixelAsset {
  return {
    size: 24,
    source: 'RTD / SVG local',
    license: 'Original do projeto; acompanha a licença do repositório',
    provisional: true,
    purpose,
    layers,
  };
}

/** Original, provisional 24px SVGs. Replace here when final emblems are approved. */
export const pixelAssets = {
  book: asset('Conhecimento', book),
  compass: asset('Estratégia', compass),
  terminal: asset('Criação e primeiro programa', terminal),
  logic: asset('Lógica', [
    { path: 'M8 2h8v2h3v3h2v8h-3v3h-2v4H8v-4H6v-3H3V7h2V4h3z', fill: ink },
    {
      path: 'M9 4h6v2h3v2h1v5h-3v3h-2v2h-4v-2H8v-3H5V8h2V6h2z',
      fill: 'var(--rtd-knowledge-surface)',
    },
    { path: 'M8 9h2v3h4V9h2v5h-3v4h-2v-4H8zM9 20h6v1H9z', fill: mid },
  ]),
  variables: asset('Variáveis', [
    { path: 'M2 4h20v3h-2v14H4V7H2z', fill: ink },
    { path: 'M4 6h16v1H4zM6 9h12v10H6z', fill: paper },
    { path: 'M9 11h6v2H9zM8 15h8v2H8z', fill: mid },
  ]),
  conditions: asset('Condições', [
    {
      path: 'M10 2h4v5h-4zM11 7h2v3h6v6h3v6h-6v-6h1v-4H7v4h1v6H2v-6h3v-6h6z',
      fill: ink,
    },
    { path: 'M11 3h2v3h-2zM4 18h2v2H4zM18 18h2v2h-2z', fill: mid },
  ]),
  decompose: asset('Decompor problemas', [
    { path: 'M2 2h9v9H2zM13 2h9v9h-9zM2 13h9v9H2zM13 13h9v9h-9z', fill: ink },
    {
      path: 'M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4z',
      fill: 'var(--rtd-strategy-surface)',
    },
    { path: 'M15 15h5v5h-5z', fill: mid },
  ]),
  debug: asset('Depurar', [
    {
      path: 'M6 2h2v3h8V2h2v4h-2v2h2v3h4v2h-4v3h4v2h-5v2h-3v2h-4v-2H7v-2H2v-2h4v-3H2v-2h4V8h2V6H6z',
      fill: ink,
    },
    { path: 'M8 9h3v9H8zM13 9h3v9h-3zM10 6h4v1h-4z', fill: mid },
  ]),
  plan: asset('Planejar solução', [
    { path: 'M7 2h10v2h4v18H3V4h4z', fill: ink },
    { path: 'M5 6h14v14H5z', fill: paper },
    {
      path: 'M8 3h8v3H8zM7 9h2v2H7zM11 9h6v2h-6zM7 13h2v2H7zM11 13h6v2h-6zM7 17h10v1H7z',
      fill: mid,
    },
  ]),
  project: asset('Criar um projeto', [
    { path: 'M2 4h8v2h12v14H2z', fill: ink },
    { path: 'M4 6h5v2h11v2H4z', fill: paper },
    { path: 'M4 12h16v6H4z', fill: mid },
  ]),
  prompts: asset('Explorar prompts', [
    { path: 'M2 3h20v15H10v2H7v2H4v-4H2z', fill: ink },
    { path: 'M4 5h16v11H9v2H6v-2H4z', fill: paper },
    { path: 'M6 8h2v2h2v2H8v2H6v-2h2v-2H6zM12 12h5v2h-5z', fill: mid },
  ]),
  coin: asset('Moeda ilustrativa', [
    {
      path: 'M7 2h10v2h3v3h2v10h-2v3h-3v2H7v-2H4v-3H2V7h2V4h3z',
      fill: 'var(--rtd-coin)',
    },
    {
      path: 'M8 5h8v2h3v10h-3v2H8v-2H5V7h3z',
      fill: 'var(--rtd-strategy-surface)',
    },
    { path: 'M10 7h4v2h-2v6h2v2h-4v-2H8V9h2z', fill: 'var(--rtd-coin)' },
  ]),
} as const satisfies Record<string, PixelAsset>;

export type PixelIconName = keyof typeof pixelAssets;
