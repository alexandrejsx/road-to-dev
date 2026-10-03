# Road to Dev — Agent Guidelines

## Project context

Road to Dev is a software-development learning platform where educational progress is represented through an RPG-inspired progression experience.

The RPG does not replace learning.

Learning is the core activity of the product, while RPG systems represent progress, identity, discovery, achievement and collection.

Before making architectural or product decisions, read:

- `README.md`

The README is currently the primary source of product decisions.

Do not invent product requirements that are not defined there.

---

## Core product model

The educational model is organized around three conceptual categories:

- **Theoría — Knowledge**
- **Práxis — Strategy**
- **Poíesis — Creation**

These categories represent different forms of development:

```text
Knowledge -> understand
Strategy  -> solve
Creation  -> build
```

They are not necessarily a rigid linear sequence.

---

## Skills

The fundamental unit of progression is the **Skill**, not the lesson.

Skills form a progression graph.

A skill may:

- have no prerequisites;
- depend on one or multiple other skills;
- depend on skills from different categories;
- unlock multiple paths;
- develop progressively rather than being a simple completed/not-completed checkbox.

Lessons, exercises, challenges and projects are mechanisms through which skills can be developed.

Do not model the platform as a traditional:

```text
course
  -> module
      -> lesson
```

hierarchy unless a future requirement explicitly introduces such a structure.

---

## Architectural principle

Maintain a conceptual separation between:

```text
RPG
----------------
Skill Graph
----------------
Learning
```

The educational system must remain independent from cosmetic RPG representation.

Learning drives progression.

Progression may drive unlocks and rewards.

RPG systems represent the resulting journey.

Do not make educational rules depend on cosmetic equipment, character appearance or other RPG presentation concerns.

---

## Repository

This project is a TypeScript monorepo.

Primary applications:

```text
apps/web -> Next.js
apps/api -> NestJS
```

Shared packages live under:

```text
packages/
```

The package manager is:

```text
pnpm
```

The monorepo task runner is:

```text
Turborepo
```

---

## Frontend

The frontend uses:

- Next.js;
- React;
- TypeScript;
- App Router;
- Tailwind CSS.

Expected supporting libraries include:

- TanStack Query;
- Zustand;
- React Flow;
- Motion;
- Radix UI.

The frontend is responsible for:

- presentation;
- interaction;
- local UI state;
- rendering API state;
- maps and visualizations;
- character presentation;
- inventory presentation.

The frontend must not become the authority for business rules.

Do not implement domain decisions such as skill unlocking, progression calculation or rewards directly inside React components, Zustand stores, hooks or Server Actions.

---

## Backend

The backend uses:

- NestJS;
- TypeScript;
- REST;
- OpenAPI.

The backend will be the authority for domain rules.

The intended persistence stack is:

```text
MongoDB + Mongoose
```

Redis and BullMQ may later support cache, jobs and asynchronous processing.

Do not introduce distributed infrastructure without a concrete requirement.

---

## Backend architecture

Start as a **modular monolith**.

Potential future domain boundaries include:

```text
identity
learning
skills
progression
projects
quests
rpg
```

Possible concepts inside RPG include:

```text
character
inventory
equipment
rewards
currency
```

These names express current architectural direction, not permission to prematurely implement empty architectures.

Create modules when the corresponding domain is actually being implemented.

Do not create speculative abstractions.

---

## API contracts

Shared public API contracts belong in:

```text
packages/contracts
```

This package may contain:

- DTO types;
- requests;
- responses;
- public enums;
- shared schemas when justified.

It must not contain domain behavior.

Never share NestJS domain entities directly with Next.js.

The intended dependency direction is:

```text
         contracts
          /     \
         /       \
      Next       Nest
        \         /
         \-- API -
```

---

## Domain rules

Domain logic belongs in the backend.

Do not duplicate domain rules between frontend and backend.

Avoid generic abstractions such as:

```text
BaseRepository
BaseService
GenericCrudService
AbstractEntity
```

unless repeated real use cases demonstrate that the abstraction is necessary.

Prefer explicit domain code over speculative reuse.

---

## Product constraints

Do not turn the product into:

- a combat RPG;
- a card game;
- a system where code controls character movement;
- a system where projects become bosses;
- a system where equipment grants artificial learning advantages;
- a completely linear learning path.

RPG mechanics should represent learning, not distort it.

---

## Equipment

Equipment is primarily:

- cosmetic;
- identity-related;
- collectible;
- symbolic of achievements.

Equipment must not grant educational advantages such as:

```text
+10% Knowledge
+20 XP
+5 Strategy
```

Educational progression must come from actual learning activities.

---

## Engineering principles

Prefer:

- simple solutions;
- explicit code;
- strong module boundaries;
- domain terminology;
- TypeScript strictness;
- small focused modules;
- dependency direction that is easy to understand;
- tests around meaningful behavior.

Avoid:

- premature abstraction;
- unnecessary indirection;
- generic frameworks created inside the project;
- speculative scalability;
- microservices without a real reason;
- infrastructure introduced before it is needed.

---

## Development behavior

Before implementing a feature:

1. Read the relevant product context.
2. Identify which domain owns the behavior.
3. Check whether the requirement is actually defined.
4. Avoid inventing unspecified business rules.
5. Keep frontend and backend responsibilities separated.
6. Prefer the smallest architecture that correctly supports the requirement.

If an important product decision is missing, clearly identify the ambiguity instead of silently deciding it through implementation.

---

## Current stage

The project is currently in its initial architecture/bootstrap stage.

Do not prematurely implement:

- Skills;
- Progression;
- RPG;
- Quests;
- Projects;
- Inventory;
- Character;
- XP;
- Currency;
- Rewards;
- Authentication.

Implement these only when explicitly requested.

---

# Do not create nested AGENTS.md yet

For now use only:

```text
/AGENTS.md
```

Do not create:

```text
apps/web/AGENTS.md
apps/api/AGENTS.md
```

yet.

We will introduce scoped agent instructions later if the frontend and backend become complex enough to justify them.

---

## Technical bootstrap conventions

Use Node.js 22.22.3+, 24.15+ or 26+, and the pnpm version pinned in `package.json`.
Read `docs/DEVELOPMENT.md` for setup and validation commands.

Frontend directories should grow as needed under `apps/web/src`:

```text
app/         -> routes and application composition
components/  -> application-specific presentation
features/    -> frontend organization around implemented use cases
hooks/       -> reusable frontend hooks
lib/         -> client utilities and API integration
stores/      -> local UI state
styles/      -> application styles
```

Create these directories only when they contain real code. Shared visual primitives belong in `packages/ui`.

The API and contracts use ESM with NodeNext resolution; relative imports use `.js` extensions in TypeScript sources. The UI package exposes TypeScript source for Next.js to transpile.

MongoDB, Mongoose, Redis and BullMQ dependencies are prepared, but application startup must not require external services during this stage. Swagger is exposed at `/docs` only in development; `/health` checks only that the API is running.

Before completing changes, run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`. Use `pnpm test:e2e` when frontend behavior changes. Preserve the product README and keep setup instructions in `docs/DEVELOPMENT.md`.

## Design de interface

Antes de criar ou alterar telas, layouts, componentes visuais, estilos,
ícones, assets ou interações de interface, leia o `design.md` da raiz
do repositório. O design system aprovado é Observatório. Siga seus tokens,
cores das categorias, ambientação, acessibilidade e limites do canvas.

Consulte também o README para preservar as regras pedagógicas e de
progressão. Mantenha as cores de Conhecimento, Estratégia e Criação
consistentes e reutilize os componentes e tokens compartilhados.

Quando uma decisão visual nova for explicitamente aprovada, atualize
o `design.md` junto com a implementação. Se houver conflito entre uma
imagem de referência e uma instrução textual mais recente do usuário,
aplique a instrução textual e registre a decisão no documento.
