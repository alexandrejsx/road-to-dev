# RTD — Design system Observatório

Direção aprovada: Observatório, proposta dark escolhida em 03/10/2026. Este documento é a referência visual para telas e componentes do Road to Dev e substitui a paleta clara anterior. Deve ser consultado antes de criar ou alterar interfaces. O README continua sendo a referência das regras pedagógicas e da progressão.

## 1. Direção visual

Interface moderna, dark, inteiramente 2D, com bastante espaço e detalhes em pixel art. O Observatório transmite descoberta, orientação e construção de conhecimento: azul noturno, ardósia, pequenos instrumentos e símbolos astronômicos nas margens. A identidade de RPG aparece nos símbolos, mundos, personagens, roupas, equipamentos e conquistas.

Texto, botões, painéis, caminhos e superfícies usam acabamento moderno. Sprites e emblemas usam pixel art consistente. O conteúdo educacional e as três categorias de competências têm prioridade visual.

A tela de personagem e inventário já aprovada é a referência para roupas, equipamentos e personalização. O mapa local usa a versão mais recente: três categorias evidentes, conexões claras e painel contextual de skill. O mapa global é uma navegação compacta entre mundos.

As decisões textuais deste documento prevalecem sobre detalhes divergentes nos sketches. Nomes de skills, valores e requisitos nos exemplos não representam currículo fechado. Termos educacionais permanecem reais; não transformar conceitos em feitiços nem projetos em bosses. Roupas permanecem variadas, sem impor uniforme de mago ou classes fixas ao usuário.

A ambientação varia por contexto: presente e discreta nos mapas; moderada em quests e coleção; mínima na leitura, no enunciado e no código. Todas as telas compartilham tipografia, cores semânticas, controles e estados.

## 2. Base técnica

Setup recomendado recentemente: monorepo pnpm/Turborepo; frontend em `apps/web` com Next.js, React, TypeScript e App Router; API NestJS em `apps/api`; Tailwind CSS, shadcn/ui + Radix, TanStack Query, Zustand, React Flow e Motion. Reutilizar os packages compartilhados de UI, contratos e configuração que já existirem.

O agente deve conferir os manifests, o lockfile, os componentes e as instruções do repositório antes de implementar. O código existente é a autoridade sobre versões e organização. Não migrar framework ou recriar o setup para executar uma tarefa de interface.

O grafo interativo e o painel são componentes cliente. Preservar as fronteiras do App Router e manter layouts/componentes servidor quando apropriado. Regras definitivas de domínio continuam no backend; a tela pode trabalhar com fixtures tipadas na primeira entrega.

## 3. Paleta e tokens

Usar tokens semânticos, compartilhados quando o monorepo já tiver uma estrutura para isso. Os valores abaixo são a proposta concreta derivada da direção aprovada, não uma extração exata dos pixels da imagem.

### Superfícies e texto

| Token                      | Valor     | Aplicação                            |
| -------------------------- | --------- | ------------------------------------ |
| `--rtd-background`         | `#0F1420` | Fundo geral e canvas azul noturno    |
| `--rtd-header`             | `#141B28` | Header                               |
| `--rtd-surface`            | `#1D2735` | Nós, cards e painéis                 |
| `--rtd-surface-elevated`   | `#253244` | Drawer, menus e superfícies elevadas |
| `--rtd-surface-hover`      | `#2B3A4F` | Hover em superfícies neutras         |
| `--rtd-border`             | `#34445B` | Bordas e divisores discretos         |
| `--rtd-border-interactive` | `#70839F` | Contorno funcional mais presente     |
| `--rtd-text`               | `#E8EDF5` | Texto principal                      |
| `--rtd-text-muted`         | `#A6B0C0` | Texto secundário                     |
| `--rtd-primary`            | `#E1B17D` | CTA global, com texto escuro         |
| `--rtd-primary-hover`      | `#EDC393` | Hover da ação principal              |
| `--rtd-primary-foreground` | `#101722` | Texto sobre ação principal           |
| `--rtd-gold`               | `#9A855E` | Ornamentos e microacentos            |
| `--rtd-gold-strong`        | `#D8BC83` | Navegação ativa e ouro legível       |
| `--rtd-focus`              | `#B7A8E8` | Foco visível, separado da seleção    |

### Categorias

| Categoria    | Texto/ênfase | Contorno  | Fundo suave | Emblema                 |
| ------------ | ------------ | --------- | ----------- | ----------------------- |
| Conhecimento | `#94BDFF`    | `#4E79B2` | `#17263D`   | Livro azul              |
| Estratégia   | `#E1B17D`    | `#A47B48` | `#2B241E`   | Bússola em cobre/âmbar  |
| Criação      | `#86CAA7`    | `#4E8D73` | `#172D28`   | Terminal/notebook verde |

Tokens por categoria: `--rtd-knowledge`, `--rtd-knowledge-border`, `--rtd-knowledge-surface`; equivalentes `strategy` e `creation`.

Essas associações valem em toda a aplicação. A categoria é indicada por cor, texto e símbolo; não apenas pela cor. Pigmentos secundários dentro de um sprite podem variar, mas seu contêiner e identificação seguem a categoria. O ouro decorativo não é cor de leitura e não deve pintar todas as competências. O CTA global conserva o mesmo tratamento; a categoria de conteúdo aparece em seu emblema, badge, título e borda.

### Estados e conexões

| Token                    | Valor     | Aplicação                                |
| ------------------------ | --------- | ---------------------------------------- |
| `--rtd-success`          | `#86CAA7` | Pequeno check de requisito atendido      |
| `--rtd-warning`          | `#E1B17D` | Aviso contextual                         |
| `--rtd-error`            | `#EFA1A1` | Erro de atividade/validação              |
| `--rtd-disabled`         | `#8B97A8` | Indicadores e texto indisponível legível |
| `--rtd-disabled-surface` | `#18202B` | Superfície indisponível                  |
| `--rtd-edge-muted`       | `#8490A0` | Conexão futura/sem destaque              |
| `--rtd-coin`             | `#E4BC68` | Detalhe dourado da moeda                 |

Não aplicar opacidade baixa ao texto de nós bloqueados a ponto de prejudicar a leitura. O check de progresso não transforma um nó de Conhecimento em um nó verde.

### Exemplo de declaração

```css
:root {
  color-scheme: dark;
  --rtd-background: #0f1420;
  --rtd-header: #141b28;
  --rtd-surface: #1d2735;
  --rtd-surface-elevated: #253244;
  --rtd-surface-hover: #2b3a4f;
  --rtd-border: #34445b;
  --rtd-border-interactive: #70839f;
  --rtd-text: #e8edf5;
  --rtd-text-muted: #a6b0c0;
  --rtd-primary: #e1b17d;
  --rtd-primary-hover: #edc393;
  --rtd-primary-foreground: #101722;
  --rtd-gold: #9a855e;
  --rtd-gold-strong: #d8bc83;
  --rtd-focus: #b7a8e8;
  --rtd-knowledge: #94bdff;
  --rtd-knowledge-border: #4e79b2;
  --rtd-knowledge-surface: #17263d;
  --rtd-strategy: #e1b17d;
  --rtd-strategy-border: #a47b48;
  --rtd-strategy-surface: #2b241e;
  --rtd-creation: #86caa7;
  --rtd-creation-border: #4e8d73;
  --rtd-creation-surface: #172d28;
  --rtd-success: #86caa7;
  --rtd-warning: #e1b17d;
  --rtd-error: #efa1a1;
  --rtd-disabled: #8b97a8;
  --rtd-disabled-surface: #18202b;
  --rtd-edge-muted: #8490a0;
  --rtd-coin: #e4bc68;
}
```

Integrar à versão de Tailwind e ao tema shadcn já instalados, incluindo menus, tooltips e drawers. Se houver escopo/provider de tema, usar a estrutura existente. Centralizar o mapeamento de tokens; evitar valores de cor repetidos nos componentes. Os fundos são preenchimentos sólidos, não gradientes. Não é necessário criar um seletor de temas nesta entrega.

## 4. Tipografia e geometria

- Reutilizar a fonte sans-serif do setup. Geist, Inter ou a fonte de sistema são compatíveis com a direção; não adicionar outra fonte se a existente funcionar.
- Texto de interface: 14–16 px; nomes de skills: 14–16 px, peso 600; headings das categorias: 24–28 px no desktop; título do painel: 22–26 px.
- `RTD`: 22–26 px, peso 700. Não usar fonte pixelada no texto da marca ou na interface.
- Escala de espaço: 4, 8, 12, 16, 24, 32 e 48 px.
- Raios: 10–12 px em nós e controles; 14–16 px em painéis e regiões; pills apenas para badges curtos.
- Bordas comuns: 1 px; seleção de nó: 2 px. Sombras discretas, reservadas ao painel elevado e à seleção.
- Botões principais: 44–48 px de altura. Controles interativos devem ter área de toque de pelo menos 44 px.

## 5. Header compartilhado

Header horizontal, cerca de 72 px no desktop, com fundo `--rtd-header` e borda discreta. Segue a largura da aplicação; não fica limitado à largura do grafo.

- À esquerda: somente `RTD` como marca textual. Não adicionar o emblema de bússola nem criar uma logo agora.
- Navegação: `Mapa`, `Quests`, `Personagem`. Nunca usar `Mundos` como nome dessa aba.
- `Mapa` aparece ativo na tela local e na tela global. Usar texto claro e sublinhado fino em ouro forte; aplicar `aria-current` quando houver um link ativo.
- À direita: XP e moeda separados visualmente. Exemplo de fixture: `1.280 XP` e ícone de moeda com `240`.
- Usar ícones funcionais discretos quando úteis; o texto das abas permanece legível.
- Integrar com rotas existentes. Não usar `href="#"` nem apresentar ações mortas como se funcionassem. Destinos ainda ausentes devem ter estado indisponível claro, sem implementar outras telas nesta tarefa.
- Em telas estreitas, compactar o header ou usar navegação acessível com texto disponível. Nunca causar overflow horizontal da página.

## 6. Tela inicial: mapa local do mundo Inicial

### Composição

O primeiro conteúdo abaixo do header é apenas o breadcrumb pequeno `Mapa / Inicial`. `Mapa` leva ao mapa global quando a rota existir. O título de página continua disponível semanticamente, por exemplo com um `h1` visualmente oculto.

**Não exibir os textos grandes `Mundo Inicial` nem `Entenda. Resolva. Construa.`.** Não reservar o espaço vazio que esses títulos ocupavam no sketch.

Após o breadcrumb, o mapa ocupa o espaço útil. Não há personagem, avatar, card de perfil, estatísticas do jogador ou sidebar esquerda.

No desktop, o canvas ocupa toda a área disponível quando não há seleção. Ao selecionar uma skill, abre-se o painel direito com aproximadamente 360–400 px, e o canvas ocupa o restante. O painel não é uma coluna vazia permanente.

### As três categorias

Organizar o grafo em três regiões reconhecíveis: Conhecimento à esquerda, Estratégia ao centro e Criação à direita. Cada região tem fundo sólido escuro da categoria, borda fina, heading visível e emblema em pixel de 48–64 px. Usar apenas o nome da categoria no heading; não acrescentar slogans. Preservar a disposição funcional já implementada.

Essas regiões orientam a leitura, mas não impõem uma sequência pedagógica única. Skills podem ter dependências internas, dependências entre categorias e pontos de entrada independentes. As conexões podem atravessar regiões.

As regiões, seus nós e as conexões devem compartilhar o mesmo sistema de coordenadas do canvas. Não desenhar conexões por cima de três colunas HTML que se movem ou redimensionam de forma independente.

### Nós de skill

Cada nó contém emblema em pixel, nome legível e indicador de estado. Categoria também identificável no nome acessível ou no painel. Tamanho inicial de referência: cerca de 148–172 px de largura e 116–140 px de altura, ajustável à implementação.

O ícone usa a mesma escala visual nos diferentes nós. O nome pode quebrar em duas linhas quando necessário. Evitar barras, contadores e texto descritivo dentro de todos os nós.

Estados visuais:

| Estado             | Tratamento                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Disponível         | Superfície escura, borda da categoria e indicador discreto                                |
| Em desenvolvimento | Borda da categoria mais presente e progresso/status acessível                             |
| Meta atingida      | Pequeno check; identidade da categoria preservada                                         |
| Bloqueada          | Contorno mais suave, cadeado, texto legível; ainda selecionável para consultar requisitos |
| Selecionada        | Borda reforçada na cor da categoria e sombra pequena                                      |
| Foco de teclado    | Anel próprio, distinguível do estado selecionado                                          |

Seleção é um estado de interface; não muda o progresso educacional. A skill continua tendo desenvolvimento gradual, conforme o README.

### Caminhos e requisitos

- Toda seta representa uma dependência real, do pré-requisito para a skill dependente.
- Posicionar nós para minimizar cruzamentos e reservar corredores para os caminhos.
- Caminhos passam pelo espaço entre nós; nunca atravessam nomes, ícones ou contêineres.
- Conexões relacionadas à skill selecionada recebem destaque; as demais continuam legíveis.
- Conexões atendidas podem ser sólidas; futuras/não atendidas podem ser tracejadas. Essa diferença deve corresponder aos dados.
- Cor de uma conexão destacada segue sua origem; se várias convergirem, preservar a legibilidade e não recolorir os nós.
- Pré-requisitos com nível mínimo devem ser avaliados por esse nível, não por simples existência da skill.
- Não inventar linhas decorativas para preencher espaço. Não mostrar conexões de edição nem permitir ao aluno alterar dependências ou arrastar nós.

O ambiente é um mapa de competências limpo. Não adicionar florestas, ilhas detalhadas, rios, montanhas, castelos ou cenários extensos atrás do grafo. O fundo Observatório tem poucos arcos de astrolábio nas margens, pequenas marcas astronômicas, estrelas esparsas e, quando couber, uma pequena constelação discreta em área vazia. O centro permanece tranquilo; ornamentos têm contraste inferior ao dos caminhos.

Uma moldura externa fina em ouro discreto, com pequenos detalhes geométricos de canto, pode enquadrar o canvas. Não repetir a moldura em todos os cards. Implementar os elementos vetoriais simples em SVG/CSS local, sem usar uma screenshot como fundo. A camada decorativa tem `aria-hidden`, não recebe foco, usa `pointer-events: none` e não participa dos cálculos de limites do grafo. Sem estrelas animadas, parallax, glow ou partículas.

### Painel contextual direito

Abre ao selecionar uma skill e mostra a seleção atual. Um botão de fechar no topo e Escape permitem fechá-lo. No desktop é um painel complementar; não bloqueia interação com o mapa.

Conteúdo, nesta ordem:

1. Ícone em pixel, nome da skill, badge da categoria e status de desenvolvimento.
2. Descrição breve, quando existir conteúdo real para ela.
3. Requisitos com check/cadeado, nome e nível mínimo quando aplicável. O requisito pode ser selecionado para explorar sua skill de origem.
4. Atividades com nome, tipo e estado. Aulas, exercícios e projetos são mecanismos de desenvolvimento da skill.
5. Recompensas com XP e moeda separados; item de conquista quando houver.
6. CTA principal contextual, como `Continuar` ou `Começar`. Para skill bloqueada, explicar o requisito e permitir explorá-lo, sem simular acesso liberado.

Divisores finos e espaço entre seções. O conteúdo do painel pode rolar independentemente. O CTA deve permanecer acessível sem sobrepor a lista. Abrir uma skill não concede XP ou moedas.

### Interações e adaptação

- Selecionar por mouse, toque ou teclado; manter foco visível.
- Pan/zoom apenas onde necessário, com controles discretos e gesto que não prenda a rolagem da página.
- Preservar seleção e viewport durante interações; não executar fit-to-view em todo render nem reiniciar a navegação ao abrir o painel.
- Ao mudar o tamanho do canvas, garantir que a seleção continue visível.
- Por volta de 1024 px e abaixo, preferir drawer/Sheet para os detalhes em vez de esmagar o grafo em três colunas estreitas.
- Em celular, preservar o tamanho legível dos nós e permitir explorar o canvas. Não reduzir todo o grafo até os nomes ficarem ilegíveis.
- Drawer modal usa gerenciamento de foco, Escape e retorno de foco ao acionador. Painel desktop não usa focus trap.
- Disponibilizar leitura dos requisitos em texto; depender apenas das linhas do grafo é insuficiente.

### Limites do mundo e recuperação de orientação

O mundo é uma área finita derivada do grafo e de suas regiões, com margem de respiro. A moldura decorativa não limita a navegação por si só.

- Calcular bounds depois de medir nós e regiões, incluindo seus headings. A decoração não amplia a área navegável.
- Usar `translateExtent` finito no React Flow ou equivalente. `nodeExtent` sozinho limita os nós, não a câmera.
- Derivar zoom mínimo/máximo do tamanho útil do canvas e do conteúdo; não usar uma porcentagem fixa para todos os dispositivos.
- Se o viewport em coordenadas do mundo for maior que o grafo, expandir os limites de forma controlada ou centralizar o eixo menor, preservando o conteúdo visível.
- Enquadrar ao entrar no mundo e pelo botão `Centralizar`, depois da medição. Preservar orientação durante cliques e evitar fit-view em todo render.
- Recalcular limites ao abrir/fechar painel, mudar mundo ou redimensionar, ajustando somente o necessário para manter seleção visível. Evitar zoom oscilante e ciclos de atualização.
- Controles: menos, percentual real, mais e `Centralizar`. Não rotular fit-view como fullscreen se não houver fullscreen real.
- Para o mapa pequeno no desktop, preferir arraste e controles explícitos de zoom; revisar roda/trackpad para evitar pan/zoom acidental. Preservar gesto de toque/pinch e teclado conforme o dispositivo.
- O usuário não deve conseguir deslocar todo o grafo para uma área vazia. Painéis e listas rolam sem movimentar o mapa. Revisar também altura/overflow da página.
- No celular, aceitar uma primeira vista parcial em escala legível, com orientação e recuperação fáceis. Grandes mundos futuros usam agrupamento por regiões; não esconder a complexidade por zoom ilegível.

## 7. Pixel art e assets

Usar um sistema híbrido:

- Ícones funcionais: biblioteca existente no projeto, preferencialmente Lucide se já fizer parte do setup.
- Emblemas de Conhecimento/Estratégia/Criação: trio próprio consistente, substituível por arquivos finais.
- Ícones de skills: uma coleção coesa, inicialmente com Pixelarticons ou assets locais existentes.
- Personagem, roupas, equipamentos e marcos de mundos: sprites próprios, com escala, paleta, contorno e pose padronizados.

Pixelarticons oferece ícones SVG baseados em grade de 24 × 24; é uma fonte de símbolos em pixel, não de sprites coloridos prontos iguais aos sketches. Usar exportações e nomes reais da versão instalada, conferindo a documentação.

Centralizar em um componente como `PixelIcon` e em um registro tipado de assets. Priorizar recursos locais/importados, não hotlinks para imagens externas. Cada asset declara tamanho lógico, fonte, licença e função. Não misturar coleções com contornos e densidades incompatíveis.

Para sprites raster, manter transparência real e ampliar em múltiplos inteiros do tamanho original: 24→48, 32→64. Aplicar a regra abaixo somente nos sprites; não na aplicação inteira:

```css
.pixel-sprite {
  image-rendering: pixelated;
  object-fit: contain;
}
```

SVGs de uma grade pixelada também devem ter escala/alinhamento coerentes; `image-rendering` não converte um desenho comum em pixel art. Reutilizar SVGs reais de bibliotecas ou assets autorizados; não extrair um ícone por recorte de screenshot como entrega definitiva.

Um placeholder deve seguir a mesma grade e paleta e ser declarado como provisório. Evitar emoji como substituto. A primeira entrega deve funcionar antes de uma grande produção de assets.

## 8. Bibliotecas e papéis

Reutilizar as dependências instaladas; não instalar toda a lista automaticamente.

| Recurso                 | Papel nesta interface                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `@xyflow/react`         | Canvas, nós e arestas customizados, seleção e viewport do grafo                                             |
| Tailwind CSS            | Layout, responsividade e aplicação dos tokens                                                               |
| shadcn/ui + Radix       | Button, Badge, Breadcrumb, Tooltip, Separator, ScrollArea e Sheet, conforme disponíveis                     |
| `lucide-react`          | Controles funcionais modernos, quando presente                                                              |
| `pixelarticons`         | Símbolos em pixel SVG, com adaptação visual pelos tokens                                                    |
| `zustand`               | Estado de interface compartilhado quando houver necessidade real; estado local simples pode continuar local |
| `@tanstack/react-query` | Dados do servidor quando houver API; não duplicar esses dados em uma store de UI                            |
| `motion`                | Transições discretas se já instalado; CSS é suficiente para efeitos simples                                 |

Customizar React Flow para esta identidade, em vez de aceitar sua aparência padrão de editor técnico. Manter as atribuições exigidas pelas licenças. Definir manualmente o pequeno grafo inicial; algoritmos de layout automático podem ser avaliados posteriormente.

Animações: aproximadamente 160–220 ms em hover, seleção e abertura do painel; respeitar `prefers-reduced-motion`. Não animar sprites com escalas fracionárias que borrem os pixels. O fundo astronômico permanece estático. Componentes de referência adicionais: ObservatoryBackdrop e MapControls, adaptados às convenções do projeto.

## 9. Continuidade para as próximas telas

### Mapa global

Canvas ocupa o viewport útil abaixo do header, sem personagem ou painel lateral permanente. Mundos são destinos pequenos com um marco em pixel, nome e status, em fundo quase plano. Busca e zoom discretos ajudam a transitar quando houver muitos mundos. Evitar grandes ilhas detalhadas e hero headings que consumam a tela.

### Personagem e inventário

Manter a direção aprovada: personagem 2D em pixel art, slots de equipamento, inventário em grade e painel do item selecionado. Adaptar superfícies ao azul noturno, com um pedestal 2D simples e pequenos ornamentos. Roupas e acessórios são expressão/conquista; não concedem bônus artificiais de Conhecimento, Estratégia ou Criação. Essas categorias conservam suas cores também nessa tela. O Observatório não obriga redesenhar todas as roupas como trajes de mago.

### Coerência de UI e UX nas demais telas

Estas regras orientam trabalhos futuros; não exigem implementar todas as telas na tarefa de atualizar o mapa.

| Tela              | Composição e UX                                                                                     | Ambientação                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Mapa global       | Destinos compactos com nome, marco em pixel e status; busca quando necessária                       | Mais presente nas margens; mundos podem remeter a constelações, sem virar grandes paisagens |
| Skill/atividades  | Objetivo, desenvolvimento, requisitos e possibilidades abertas                                      | Categoria como acento; superfícies sólidas e pouco ornamento                                |
| Aula              | Título educacional, conteúdo e exemplos em coluna confortável de leitura, cerca de 65–75 caracteres | Mínima; sem estrelas ou linhas atrás do texto                                               |
| Exercício/editor  | Enunciado, código, saída e feedback real dominam a composição                                       | Fundo uniforme e sintaxe legível; detalhes fora da área de trabalho                         |
| Projeto           | Objetivo real, requisitos, etapas, entregáveis e feedback                                           | Construção de software; recompensas ao redor da entrega, sem bosses                         |
| Quests            | Objetivos, progresso e recompensas; acesso às skills; curadoria opcional                            | Diário de missões discreto, sem narrativa fictícia obrigatória                              |
| Perfil/conquistas | Trajetória, categorias, títulos e origem das conquistas                                             | Acervo pessoal com pequenos emblemas e ornamentos                                           |

A ordem de atenção é tarefa/conteúdo → categorias/progresso → navegação → ambientação. Mesmos tokens, geometria, foco e estados em todas as telas. Breadcrumbs e ações de retorno preservam contexto; voltar de uma atividade não deve exigir passar pelo mapa global novamente.

Mundos futuros permanecem visíveis com requisitos claros. Não exigir conclusão de 100% do anterior nem criar bloqueios globais por decoração. Ligações entre mundos só sugerem requisitos se forem reais. As três categorias aparecem em todos os mundos.

Loading usa skeleton discreto; vazio explica o próximo passo; erro apresenta mensagem e recuperação; bloqueio informa o requisito; sucesso explica o progresso real. Não depender de cor ou animação para comunicar estados.

Itens adquiridos mostram aquisição/equipamento; itens de conquista mostram origem e critérios. Selecionar/equipar não pode ser confundido com compra. XP registra evolução e não é gasto; moeda permite escolhas cosméticas.

## 10. Critérios de revisão

- Header com `RTD`, `Mapa`, `Quests`, `Personagem`, XP e moeda separados.
- Ausência dos dois títulos grandes removidos e de personagens no mapa local.
- Três categorias reconhecíveis em poucos segundos, com cores e emblemas consistentes.
- Caminhos legíveis e requisitos equivalentes no painel e nos dados.
- Skill independente e dependência entre categorias demonstradas na fixture.
- Seleção abre/atualiza o painel; fechar devolve o espaço ao canvas.
- Bloqueio não impede consultar a skill; não libera atividades indevidamente.
- Layout utilizável no desktop e no celular; nomes legíveis, foco visível e controles acessíveis.
- Sprites nítidos e UI sem pixelização global, emoji, cenário excessivo ou gradientes.
- Tokens centralizados; componentes reaproveitáveis; domínio, progresso e layout separados.
- Dark aplicado também a controles, overlays e painel; detalhes do fundo não interceptam ações.
- Limites reais e Centralizar impedem perder o mundo em vazio; painel/resize não causam saltos ou zoom oscilante.
- Estudo e código têm superfícies uniformes, enquanto exploração e coleção recebem mais ambientação.

## 11. Fontes técnicas

- React Flow — [nós customizados](https://reactflow.dev/learn/customization/custom-nodes), [tema](https://reactflow.dev/learn/customization/theming), [acessibilidade](https://reactflow.dev/learn/advanced-use/accessibility).
- React Flow — [viewport e limites](https://reactflow.dev/api-reference/react-flow), [getNodesBounds](https://reactflow.dev/api-reference/utils/get-nodes-bounds), [getViewportForBounds](https://reactflow.dev/api-reference/utils/get-viewport-for-bounds).
- Pixelarticons — [documentação](https://pixelarticons.com/docs/) e [coleção gratuita](https://pixelarticons.com/free/).
- Lucide — [React](https://lucide.dev/guide/react).
- shadcn/ui — [Sheet](https://ui.shadcn.com/docs/components/radix/sheet).
- Motion — [React](https://motion.dev/docs/react).
- Zustand — [introdução](https://zustand.docs.pmnd.rs/learn/getting-started/introduction).
- TanStack Query — [React](https://tanstack.com/query/latest/docs/framework/react).

Consultar a documentação correspondente às versões efetivamente instaladas.

## 12. Referência no AGENTS.md

Preservar as instruções existentes e manter no AGENTS aplicável ao frontend uma referência ao documento da raiz:

```md
## Design de interface

Antes de criar ou alterar telas, layouts, componentes visuais, estilos,
ícones, assets ou interações, leia o design.md da raiz do repositório.
O design system aprovado é Observatório. Siga seus tokens, cores das
categorias, regras de ambientação, acessibilidade e limites do canvas.

Consulte o README para preservar as regras pedagógicas e de progressão.
Reutilize componentes e tokens existentes. Ao implementar uma nova
decisão visual explicitamente aprovada, atualize o design.md junto com
a mudança. Instruções textuais recentes prevalecem sobre sketches.
```

## 13. Aplicação no mapa Inicial

A referência canônica é `design.md` (minúsculas). O documento Observatório fornecido como `DESIGN.md` foi consolidado aqui. Os tokens ficam em `packages/ui/src/styles/globals.css`, incluindo o mapeamento Tailwind/shadcn e `color-scheme: dark`. O header, o painel, os portais Radix e o React Flow usam o mesmo tema. Ícones funcionais passam pelo componente `Icon` (Lucide); emblemas e moeda continuam no registro local `PixelIcon`, com assets originais provisórios.

`ObservatoryBackdrop` desenha arcos, marcas e cantos em SVG/CSS estático, fora de `ViewportPortal`. Não recebe eventos, foco nem participa dos bounds. Regiões com seus headings permanecem dentro do portal do grafo.

A câmera espera a medição dos nós controlados. `getNodesBounds` une essas medidas às regiões do layout; `getViewportForBounds` calcula o enquadramento útil. As margens de navegação são 32 px nas laterais, 24 px acima (80 px com navegação de categorias) e 80 px abaixo para os controles. São convertidas para coordenadas do mundo ao calcular `translateExtent`.

O zoom mínimo acompanha a área útil: no desktop, parte da escala de enquadramento; em celular, da largura de uma região. O piso de 0,8 mantém nomes de 16 px com cerca de 13 px renderizados, e a vista inicial chega a 1 quando houver espaço. O zoom máximo considera um nó inteiro na área útil, até 2. Eixos menores que o viewport ficam deliberadamente centralizados. Resize e painel preservam a escala vigente quando ela está dentro dos novos limites, deslocando apenas o necessário para revelar a seleção. Roda comum não move o mapa; arraste, pinch e controles explícitos continuam disponíveis. Tab revela nós fora da vista e Enter/Espaço selecionam; Centralizar recupera a orientação.

A implementação atual possui apenas o mundo Inicial e estado local, sem restauração persistente prévia. Voltar do diálogo de atividade mantém seleção e câmera. Ao integrar outros mundos ou uma store persistente, aplicar `constrainViewport` ao viewport restaurado e enquadrar somente na entrada de um mundo sem contexto. Não criar rotas ou persistência fictícias para demonstrar o tema.
