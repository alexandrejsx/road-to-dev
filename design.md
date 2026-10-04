# RTD — Design system Observatório diurno

Direção atual: **Observatório diurno**, proposta clara escolhida em 04/10/2026 após a exploração da versão escura. Este documento é a referência visual para telas e componentes do Road to Dev e substitui as instruções de tema escuro anteriores. Deve ser consultado antes de criar ou alterar interfaces. O README continua sendo a referência das regras pedagógicas e da progressão.

## 1. Direção visual

Interface moderna, clara e inteiramente 2D, com bastante espaço e detalhes em pixel art. O Observatório diurno transmite descoberta, orientação e construção de conhecimento: marfim claro, tinta azul profunda, latão discreto e símbolos astronômicos nas margens. A identidade de RPG aparece nos símbolos, mundos, personagens, roupas, equipamentos e conquistas.

Texto, botões, painéis, caminhos e superfícies usam acabamento moderno. Sprites e emblemas usam pixel art consistente. O conteúdo educacional e as três categorias de competências têm prioridade visual.

A tela de personagem e inventário já aprovada é a referência para roupas, equipamentos e personalização. O mapa local usa a versão mais recente: três categorias evidentes, conexões claras e painel contextual de skill. O mapa global é uma navegação compacta entre mundos.

As decisões textuais deste documento prevalecem sobre detalhes divergentes nos sketches. Nomes de skills, valores e requisitos nos exemplos não representam currículo fechado. Termos educacionais permanecem reais; não transformar conceitos em feitiços nem projetos em bosses. Roupas permanecem variadas, sem impor uniforme de mago ou classes fixas ao usuário.

A ambientação varia por contexto: presente e discreta nos mapas; moderada em quests e coleção; mínima na leitura, no enunciado e no código. Todas as telas compartilham tipografia, cores semânticas, controles e estados.

## 2. Base técnica

Setup confirmado nos manifests e no lockfile: pnpm 12.8.1 / Turborepo 2.11.7; frontend em `apps/web` com Next.js 16.3.8, React 19.3.0, TypeScript 6.0.3 e App Router; API NestJS 12.1.2 em `apps/api`. Tailwind CSS 4.3.3, Radix UI 1.6.7, React Flow 12.12.0, TanStack Query 5.104.1, Zustand 5.0.15 e Motion 14.0.0 estão instalados. O package `packages/ui` reúne os componentes compatíveis com as convenções shadcn, tokens e registros de ícones; reutilizar também os packages de contratos e configuração.

O agente deve conferir os manifests, o lockfile, os componentes e as instruções do repositório antes de implementar. O código existente é a autoridade sobre versões e organização. Não migrar framework ou recriar o setup para executar uma tarefa de interface.

O grafo interativo e o painel são componentes cliente. Preservar as fronteiras do App Router e manter layouts/componentes servidor quando apropriado. Regras definitivas de domínio continuam no backend; a tela pode trabalhar com fixtures tipadas na primeira entrega.

## 3. Paleta e tokens

Usar tokens semânticos, compartilhados quando o monorepo já tiver uma estrutura para isso. Os valores abaixo aproximam a imagem escolhida e dão contraste aos textos e controles; não são uma extração literal dos pixels do sketch.

### Superfícies e texto

| Token                      | Valor     | Aplicação                                      |
| -------------------------- | --------- | ---------------------------------------------- |
| `--rtd-background`         | `#FAF9F5` | Fundo geral e canvas marfim                    |
| `--rtd-header`             | `#FFFEFC` | Header claro                                   |
| `--rtd-surface`            | `#FFFFFF` | Nós, cards e painéis                           |
| `--rtd-surface-elevated`   | `#FFFEFC` | Drawer, menus e superfícies elevadas           |
| `--rtd-surface-hover`      | `#F1F4F5` | Hover em superfícies neutras                   |
| `--rtd-border`             | `#D9DFE3` | Bordas e divisores discretos                   |
| `--rtd-border-interactive` | `#8D9CAB` | Contorno funcional mais presente               |
| `--rtd-text`               | `#17253D` | Texto principal azul profundo                  |
| `--rtd-text-muted`         | `#536579` | Texto secundário                               |
| `--rtd-primary`            | `#244B76` | CTA global                                     |
| `--rtd-primary-hover`      | `#193B61` | Hover da ação principal                        |
| `--rtd-primary-foreground` | `#FFFFFF` | Texto sobre ação principal                     |
| `--rtd-gold`               | `#B08443` | Linha de navegação ativa e microacentos        |
| `--rtd-gold-soft`          | `#D8C19D` | Arcos e marcas astronômicas de baixo contraste |
| `--rtd-focus`              | `#6959AD` | Foco visível, separado da seleção              |

### Categorias

| Categoria    | Texto/ênfase | Contorno  | Fundo suave | Emblema                 |
| ------------ | ------------ | --------- | ----------- | ----------------------- |
| Conhecimento | `#245A9D`    | `#79A9DC` | `#EDF5FD`   | Livro azul              |
| Estratégia   | `#A64F1A`    | `#DBA06B` | `#FFF4E9`   | Bússola em cobre        |
| Criação      | `#1F664A`    | `#87B69A` | `#EEF8F1`   | Terminal/notebook verde |

Tokens por categoria: `--rtd-knowledge`, `--rtd-knowledge-border`, `--rtd-knowledge-surface`; equivalentes `strategy` e `creation`.

Essas associações valem em toda a aplicação. A categoria é indicada por cor, texto e símbolo; não apenas pela cor. Pigmentos secundários dentro de um sprite podem variar, mas seu contêiner e identificação seguem a categoria. O latão decorativo não é cor de leitura e não deve pintar todas as competências. O CTA global conserva o mesmo tratamento azul profundo; a categoria de conteúdo aparece em seu emblema, badge, título e borda.

### Estados e conexões

| Token                    | Valor     | Aplicação                                |
| ------------------------ | --------- | ---------------------------------------- |
| `--rtd-success`          | `#28764E` | Pequeno check de requisito atendido      |
| `--rtd-warning`          | `#A64F1A` | Aviso contextual                         |
| `--rtd-error`            | `#AC3743` | Erro de atividade/validação              |
| `--rtd-disabled`         | `#5D6B7A` | Indicadores e texto indisponível legível |
| `--rtd-disabled-surface` | `#F2F2EF` | Superfície indisponível                  |
| `--rtd-edge-muted`       | `#78899A` | Conexão futura/sem destaque              |
| `--rtd-coin`             | `#C18A25` | Detalhe dourado da moeda                 |

Não aplicar opacidade baixa ao texto de nós bloqueados a ponto de prejudicar a leitura. O check de progresso não transforma um nó de Conhecimento em um nó verde.

### Exemplo de declaração

```css
:root {
  color-scheme: light;
  --rtd-background: #faf9f5;
  --rtd-header: #fffefc;
  --rtd-surface: #ffffff;
  --rtd-surface-elevated: #fffefc;
  --rtd-surface-hover: #f1f4f5;
  --rtd-border: #d9dfe3;
  --rtd-border-interactive: #8d9cab;
  --rtd-text: #17253d;
  --rtd-text-muted: #536579;
  --rtd-primary: #244b76;
  --rtd-primary-hover: #193b61;
  --rtd-primary-foreground: #ffffff;
  --rtd-gold: #b08443;
  --rtd-gold-soft: #d8c19d;
  --rtd-focus: #6959ad;
  --rtd-knowledge: #245a9d;
  --rtd-knowledge-border: #79a9dc;
  --rtd-knowledge-surface: #edf5fd;
  --rtd-strategy: #a64f1a;
  --rtd-strategy-border: #dba06b;
  --rtd-strategy-surface: #fff4e9;
  --rtd-creation: #1f664a;
  --rtd-creation-border: #87b69a;
  --rtd-creation-surface: #eef8f1;
  --rtd-success: #28764e;
  --rtd-warning: #a64f1a;
  --rtd-error: #ac3743;
  --rtd-disabled: #5d6b7a;
  --rtd-disabled-surface: #f2f2ef;
  --rtd-edge-muted: #78899a;
  --rtd-coin: #c18a25;
}
```

Integrar à versão de Tailwind e ao tema shadcn já instalados, incluindo menus, tooltips e drawers. Se houver escopo/provider de tema, usar a estrutura existente. Centralizar o mapeamento de tokens; evitar valores de cor repetidos nos componentes. Os fundos são preenchimentos sólidos, não gradientes. Não é necessário criar um seletor de temas nesta entrega.

Implementação: `packages/ui/src/styles/globals.css` declara os tokens no `:root` e os mapeia para Tailwind via `@theme inline`. `color-scheme: light` cobre também os portais Radix; React Flow usa `colorMode="light"`. Tooltips e diálogos reutilizam `popover`, superfícies elevadas e o mesmo foco. A sombra compartilhada usa tinta azul a 8% e o overlay a 24%, sem reaproveitar a opacidade pesada do tema anterior. O painel desktop é branco; o drawer e seu rodapé usam a superfície elevada clara.

## 4. Tipografia e geometria

- Usar a sans-serif do setup em navegação, descrições, status, requisitos e controles. A imagem usa uma serif editorial contida em `RTD`, categorias e títulos curtos de skill/painel; aplicar uma fonte já existente quando houver ou um fallback de sistema como `ui-serif, Georgia, serif`. Não adicionar fonte de rede só para reproduzir o sketch.
- O token compartilhado `--rtd-font-editorial` aplica esse fallback à marca, headings das categorias, nomes dos nós e título do painel. O restante conserva a sans-serif do Tailwind.
- Texto de interface: 14–16 px; nomes de skills: 15–16 px, peso 600; headings das categorias: 24–28 px no desktop; título do painel: 22–26 px.
- `RTD`: 24–28 px, peso 700. Não usar fonte pixelada no texto da marca ou na interface.
- Escala de espaço: 4, 8, 12, 16, 24, 32 e 48 px.
- Raios: 10–12 px em nós e controles; 14–16 px em painéis e regiões; pills apenas para badges curtos.
- Bordas comuns: 1 px; seleção de nó: 2 px. Sombras discretas, reservadas ao painel elevado e à seleção.
- Botões principais: 44–48 px de altura. Controles interativos devem ter área de toque de pelo menos 44 px.

## 5. Header compartilhado

Header horizontal, cerca de 72 px no desktop, com fundo `--rtd-header` e borda discreta. Segue a largura da aplicação; não fica limitado à largura do grafo.

- À esquerda: somente `RTD` como marca textual. Não adicionar o emblema de bússola nem criar uma logo agora.
- Navegação: `Mapa`, `Quests`, `Personagem`. Nunca usar `Mundos` como nome dessa aba.
- `Mapa` aparece ativo na tela local e na tela global. Usar texto azul profundo e sublinhado fino `--rtd-gold`; aplicar `aria-current` quando houver um link ativo.
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

Organizar o grafo em três regiões reconhecíveis: Conhecimento à esquerda, Estratégia ao centro e Criação à direita. Cada região tem fundo claro suave da categoria, borda muito discreta, heading visível e emblema em pixel de 48–64 px. Usar apenas o nome da categoria no heading; não acrescentar slogans. Preservar a disposição funcional já implementada.

Essas regiões orientam a leitura, mas não impõem uma sequência pedagógica única. Skills podem ter dependências internas, dependências entre categorias e pontos de entrada independentes. As conexões podem atravessar regiões.

As regiões, seus nós e as conexões devem compartilhar o mesmo sistema de coordenadas do canvas. Não desenhar conexões por cima de três colunas HTML que se movem ou redimensionam de forma independente.

### Nós de skill

Cada nó contém emblema em pixel, nome legível e indicador de estado. Categoria também identificável no nome acessível ou no painel. Tamanho inicial de referência: cerca de 148–172 px de largura e 116–140 px de altura, ajustável à implementação.

O ícone usa a mesma escala visual nos diferentes nós. O nome pode quebrar em duas linhas quando necessário. Evitar barras, contadores e texto descritivo dentro de todos os nós.

Estados visuais:

| Estado             | Tratamento                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Disponível         | Superfície branca, borda da categoria e indicador discreto                                |
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
- Conexões que chegam à skill selecionada e que partem dela recebem destaque; as demais continuam legíveis. Arestas atendidas usam a cor de ênfase da categoria de origem, com opacidade de 85%, para manter contraste no tema claro; destaque usa 100% e traço mais espesso. Arestas pendentes usam `--rtd-edge-muted` a 100% e tracejado, mantendo contraste de pelo menos 3:1 sobre as regiões claras.
- Conexões atendidas podem ser sólidas; futuras/não atendidas podem ser tracejadas. Essa diferença deve corresponder aos dados.
- Cor de uma conexão destacada segue sua origem; se várias convergirem, preservar a legibilidade e não recolorir os nós.
- Pré-requisitos com nível mínimo devem ser avaliados por esse nível, não por simples existência da skill.
- Não inventar linhas decorativas para preencher espaço. Não mostrar conexões de edição nem permitir ao aluno alterar dependências ou arrastar nós.

O ambiente é um mapa de competências limpo. Não adicionar florestas, ilhas detalhadas, rios, montanhas, castelos ou cenários extensos atrás do grafo. O fundo Observatório diurno é marfim claro, com poucos arcos de astrolábio grandes parcialmente cortados nas margens laterais, estrelas esparsas, pequenas marcas de orientação e, quando couber, uma constelação discreta em área vazia. O miolo atrás dos três caminhos permanece tranquilo. O contraste dos ornamentos fica abaixo do contraste de conexões, bordas e texto.

O sketch inclui pequenas coordenadas como decoração: na interface real, não mostrar números geográficos fictícios nem rótulos que pareçam dados funcionais. Usar apenas marcas gráficas abstratas ou coordenadas reais com função explicada. Uma linha muito fina em latão e pontos de orientação podem delimitar o espaço sem fechar o mapa numa moldura pesada.

Implementar o fundo com SVG/CSS local, sem usar screenshot como textura. A camada pode ficar no viewport com posição fixa ao canvas ou usar coordenadas próprias decorativas, desde que não introduza parallax enganoso nem se confunda com requisitos. Ela tem `aria-hidden`, não recebe foco, usa `pointer-events: none` e não participa dos cálculos de limites do grafo. Não repetir ornamento em cada nó. Sem estrelas animadas, glow ou partículas.

### Painel contextual direito

Abre ao selecionar uma skill e mostra a seleção atual. Um botão de fechar no topo e Escape permitem fechá-lo. No desktop é um painel complementar; não bloqueia interação com o mapa.

Conteúdo, nesta ordem:

1. Ícone em pixel, nome da skill, badge da categoria e status de desenvolvimento.
2. Descrição breve, quando existir conteúdo real para ela.
3. Requisitos com check/cadeado, nome e nível mínimo quando aplicável. O requisito pode ser selecionado para explorar sua skill de origem.
4. Atividades com nome, tipo e estado. Aulas, exercícios e projetos são mecanismos de desenvolvimento da skill.
5. Recompensas com XP e moeda separados; item de conquista quando houver.
6. CTA principal contextual, como `Continuar` ou `Começar`. Para skill bloqueada, explicar o requisito e permitir explorá-lo, sem simular acesso liberado.

Painel em superfície branca, título azul profundo, badge da categoria, divisores finos e espaço entre seções. Não desenhar arcos e estrelas atrás do conteúdo textual. O conteúdo do painel pode rolar independentemente. O CTA deve permanecer acessível sem sobrepor a lista. Abrir uma skill não concede XP ou moedas.

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

O mundo é uma área finita derivada do grafo e de suas regiões, com margem de respiro. Os arcos e marcas decorativos não limitam a navegação por si só.

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

No mapa existente, `viewport.ts` reúne os bounds medidos dos nós com os retângulos de `layout.ts`, que incluem os headings. A margem é de 32 px nas laterais, 24 px no topo (80 px com navegação compacta) e 80 px na base para os controles. `translateExtent` usa essas margens em coordenadas do mundo; o eixo menor é centralizado. O zoom deriva da área útil, preservando um piso de legibilidade de 80% e teto de 200%. A entrada e `Centralizar` enquadram o mundo até 100%; no celular, começam pela região Conhecimento em vista parcial. Resize e seleção apenas limitam a câmera/revelam o nó, preservando o zoom quando válido. Botões de categoria no modo compacto ajudam a alcançar entradas independentes. Os testes existentes cobrem container maior que o grafo, extremos de pan/zoom, resize, roda, pinch e foco.

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

| Recurso                     | Papel nesta interface                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `@xyflow/react`             | Canvas, nós e arestas customizados, seleção e viewport do grafo                                                |
| Tailwind CSS                | Layout, responsividade e aplicação dos tokens                                                                  |
| shadcn/ui + Radix           | Button, Badge, Breadcrumb, Tooltip, Separator, ScrollArea e Sheet, conforme disponíveis                        |
| `lucide-react`              | Controles funcionais modernos, quando presente                                                                 |
| Registro local de pixel art | `packages/ui/src/lib/pixel-assets.ts`, SVGs originais provisórios de 24 × 24; Pixelarticons não está instalado |
| `zustand`                   | Estado de interface compartilhado quando houver necessidade real; estado local simples pode continuar local    |
| `@tanstack/react-query`     | Dados do servidor quando houver API; não duplicar esses dados em uma store de UI                               |
| `motion`                    | Transições discretas se já instalado; CSS é suficiente para efeitos simples                                    |

Customizar React Flow para esta identidade, em vez de aceitar sua aparência padrão de editor técnico. Manter as atribuições exigidas pelas licenças. Definir manualmente o pequeno grafo inicial; algoritmos de layout automático podem ser avaliados posteriormente.

Animações: aproximadamente 160–220 ms em hover, seleção e abertura do painel; respeitar `prefers-reduced-motion`. Não animar sprites com escalas fracionárias que borrem os pixels. O fundo astronômico claro permanece estático. Componentes de referência adicionais: ObservatoryBackdrop e MapControls, adaptados às convenções do projeto.

## 9. Continuidade para as próximas telas

### Mapa global

Canvas ocupa o viewport útil abaixo do header, sem personagem ou painel lateral permanente. Mundos são destinos pequenos com um marco em pixel, nome e status, em fundo quase plano. Busca e zoom discretos ajudam a transitar quando houver muitos mundos. Evitar grandes ilhas detalhadas e hero headings que consumam a tela.

### Personagem e inventário

Manter a direção aprovada: personagem 2D em pixel art, slots de equipamento, inventário em grade e painel do item selecionado. Adaptar superfícies ao marfim e aos cards brancos, com um pedestal 2D simples e pequenos ornamentos em latão. Roupas e acessórios são expressão/conquista; não concedem bônus artificiais de Conhecimento, Estratégia ou Criação. Essas categorias conservam suas cores também nessa tela. O Observatório não obriga redesenhar todas as roupas como trajes de mago.

### Coerência de UI e UX nas demais telas

Estas regras orientam trabalhos futuros; não exigem implementar todas as telas na tarefa de atualizar o mapa.

| Tela              | Composição e UX                                                                                     | Ambientação                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Mapa global       | Destinos compactos com nome, marco em pixel e status; busca quando necessária                       | Fundo marfim claro com marcas de orientação nas margens; mundos podem remeter a constelações, sem virar grandes paisagens |
| Skill/atividades  | Objetivo, desenvolvimento, requisitos e possibilidades abertas                                      | Categoria como acento; superfícies sólidas e pouco ornamento                                                              |
| Aula              | Título educacional, conteúdo e exemplos em coluna confortável de leitura, cerca de 65–75 caracteres | Mínima; sem estrelas ou linhas atrás do texto                                                                             |
| Exercício/editor  | Enunciado, código, saída e feedback real dominam a composição                                       | Fundo uniforme e sintaxe legível; detalhes fora da área de trabalho                                                       |
| Projeto           | Objetivo real, requisitos, etapas, entregáveis e feedback                                           | Construção de software; recompensas ao redor da entrega, sem bosses                                                       |
| Quests            | Objetivos, progresso e recompensas; acesso às skills; curadoria opcional                            | Diário de missões discreto, sem narrativa fictícia obrigatória                                                            |
| Perfil/conquistas | Trajetória, categorias, títulos e origem das conquistas                                             | Acervo pessoal com pequenos emblemas e ornamentos                                                                         |

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
- Tema claro aplicado também a controles, overlays e painel; contraste dos textos e status verificado; detalhes do fundo não interceptam ações.
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
O design system aprovado é Observatório diurno (tema claro). Siga seus tokens, cores das
categorias, regras de ambientação, acessibilidade e limites do canvas.

Consulte o README para preservar as regras pedagógicas e de progressão.
Reutilize componentes e tokens existentes. Ao implementar uma nova
decisão visual explicitamente aprovada, atualize o design.md junto com
a mudança. Instruções textuais recentes prevalecem sobre sketches.
```
