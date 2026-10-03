# Desenvolvimento

## Pré-requisitos

- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`. Recomendado: Node 24 atualizado (`nvm install` e `nvm use`, conforme `.nvmrc`).
- pnpm `12.8.1`, fixado no campo `packageManager` da raiz. Para instalar: `npm install --global pnpm@12.8.1`.

O piso de Node atende ao requisito de Node 20+ e às ferramentas atuais: os geradores do [NestJS 12](https://docs.nestjs.com/migration-guide) exigem versões mais recentes. TypeScript 6 e ESLint 9 foram mantidos por compatibilidade com Swagger, typescript-eslint e o plugin React usado pelo Next. As versões diretas estão fixadas nos manifests; `pnpm-lock.yaml` fixa a árvore completa.

Não é necessário configurar MongoDB, Redis, Docker ou credenciais.

## Instalação e execução

Na raiz do repositório:

```bash
pnpm install
pnpm dev
```

O Turborepo prepara os packages necessários e inicia:

| Aplicação                                | Endereço                        |
| ---------------------------------------- | ------------------------------- |
| Frontend                                 | http://localhost:3000           |
| Health check da API                      | http://localhost:3001/health    |
| Swagger, somente em desenvolvimento      | http://localhost:3001/docs      |
| OpenAPI JSON, somente em desenvolvimento | http://localhost:3001/docs-json |

O frontend exibe apenas uma confirmação de funcionamento. O health check retorna `{"status":"ok"}` e não verifica dependências externas.

Para executar separadamente:

```bash
pnpm dev:web
pnpm dev:api
```

`Ctrl+C` encerra os processos. As portas estão explícitas nos scripts do Next e no bootstrap do Nest. A API libera CORS para `http://localhost:3000` somente em desenvolvimento.

## Ambiente

Nenhum arquivo `.env` é obrigatório. Para mudar a porta da API, copie `apps/api/.env.example` para `apps/api/.env` e ajuste `PORT`. O Node carrega esse arquivo ao iniciar a API; variáveis já definidas no processo têm precedência. `pnpm dev:api` define `NODE_ENV=development`; o script `start` da API define `NODE_ENV=production`, sem Swagger.

O frontend ainda não faz requisições à API, portanto não há variável de URL nem cliente HTTP antecipado. URLs de banco, Redis e secrets serão introduzidos quando houver uma integração real.

## Comandos de qualidade

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format:check
pnpm format
```

- `lint`: ESLint com configuração compartilhada e zero avisos permitidos.
- `typecheck`: TypeScript strict; o frontend gera os tipos do App Router antes da checagem, inclusive em um checkout novo.
- `test`: Vitest, com um smoke test HTTP da API. Web, contracts e UI estão preparados para testes e aceitam a ausência deles nesta etapa. O Vitest do frontend cobre código sem DOM; testes de componentes precisarão de ambiente e utilitários próprios quando forem necessários.
- `build`: compila contracts e API em `dist/`, e o frontend em `.next/`. UI é consumida como código-fonte pelo Next e verificada por `typecheck`.
- `format:check` / `format`: verificam/aplicam Prettier. O `README.md` de produto é preservado.

Teste E2E mínimo do frontend:

```bash
pnpm --filter @road-to-dev/web exec playwright install chromium
pnpm test:e2e
```

O Playwright inicia o frontend automaticamente ou reutiliza a instância local em execução. Em Linux, a instalação pode precisar das bibliotecas do sistema indicadas pelo Playwright (`playwright install --with-deps chromium`). O E2E fica separado de `pnpm test` para não exigir navegador nos testes de código.

Para conferir os artefatos de produção, após `pnpm build`, execute em terminais separados:

```bash
pnpm --filter @road-to-dev/web start
pnpm --filter @road-to-dev/api start
```

## Organização

```text
apps/
  web/                    Next.js, App Router e smoke test Playwright
  api/                    NestJS, health check, Swagger e smoke test Vitest
packages/
  contracts/              export central, sem contratos de domínio
  ui/                     suporte mínimo a componentes visuais compartilhados
  eslint-config/          configurações flat compartilhadas
  typescript-config/      base strict e configurações por ambiente
docs/
  DEVELOPMENT.md          este guia
AGENTS.md                 contexto e limites arquiteturais
```

Todos os packages são privados e usam o namespace `@road-to-dev`. `contracts` utiliza ESM compilado; o Turborepo o compila antes das aplicações e o observa durante `pnpm dev`. UI expõe fontes TypeScript, transpiladas pelo Next. Imports relativos na API e em contracts devem usar extensão `.js` para resolução NodeNext.

TanStack Query, Zustand, React Flow e Motion estão instalados no frontend. Radix UI e os utilitários de classes estão no package UI. Nenhum provider, store ou componente de domínio foi antecipado.

Os arquivos `components.json`, os aliases, `cn`, a exportação de fontes de UI e a leitura de classes pelo Tailwind preparam o uso futuro de [shadcn/ui em monorepo](https://ui.shadcn.com/docs/monorepo). Antes do primeiro componente, defina/inicialize o tema e seus tokens em `packages/ui/src/styles/globals.css`; os valores do gerador ainda não representam um design definitivo. Crie componentes a partir de `apps/web` e mantenha os dois `components.json` consistentes.

Mongoose, a integração Nest/Mongoose, ioredis, BullMQ e a integração Nest/BullMQ estão apenas instalados. Não existem conexões, schemas, filas ou workers. Novas regras de negócio pertencem ao backend; contratos públicos podem ser compartilhados, comportamento de domínio não.

Os diretórios e módulos futuros estão descritos em `AGENTS.md` e devem surgir somente com casos de uso definidos.
