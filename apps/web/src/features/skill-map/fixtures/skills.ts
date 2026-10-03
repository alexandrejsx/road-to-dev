import type { SkillDefinition, SkillId } from '../types';

/** Demonstration content only; this is not a curriculum or a public API contract. */
export const skills: Readonly<Record<SkillId, SkillDefinition>> = {
  logic: {
    id: 'logic',
    name: 'Lógica',
    category: 'knowledge',
    world: 'inicial',
    icon: 'logic',
    description:
      'Reconheça padrões e organize ideias em uma sequência de passos que faça sentido.',
    prerequisites: [],
    activities: [
      {
        id: 'logic-patterns',
        name: 'Reconhecer padrões',
        type: 'Exercício',
        description:
          'Observe uma sequência e identifique como cada passo se relaciona com o próximo.',
      },
    ],
    rewards: { xp: 40, coins: 10 },
  },
  variables: {
    id: 'variables',
    name: 'Variáveis',
    category: 'knowledge',
    world: 'inicial',
    icon: 'variables',
    description:
      'Dê nomes às informações e entenda como um programa guarda e transforma valores.',
    prerequisites: [{ skillId: 'logic', minimumLevel: 1 }],
    activities: [
      {
        id: 'variables-values',
        name: 'Nomear e guardar valores',
        type: 'Prática',
        description:
          'Explore a relação entre o nome de uma variável, seu valor e seu papel em um programa.',
      },
    ],
    rewards: { xp: 60, coins: 15 },
  },
  conditions: {
    id: 'conditions',
    name: 'Condições',
    category: 'knowledge',
    world: 'inicial',
    icon: 'conditions',
    description:
      'Expresse decisões e descubra como caminhos diferentes nascem de uma condição.',
    prerequisites: [{ skillId: 'variables', minimumLevel: 2 }],
    activities: [
      {
        id: 'conditions-paths',
        name: 'Escolher caminhos',
        type: 'Exercício',
        description:
          'Compare valores e descreva o que deve acontecer em cada situação.',
      },
    ],
    rewards: { xp: 60, coins: 15 },
  },
  decompose: {
    id: 'decompose',
    name: 'Decompor problemas',
    category: 'strategy',
    world: 'inicial',
    icon: 'decompose',
    description:
      'Transforme um problema amplo em partes menores que você consegue compreender e resolver.',
    prerequisites: [],
    activities: [
      {
        id: 'decompose-read',
        name: 'Identificar o objetivo',
        type: 'Leitura',
        description:
          'Separe o que o problema pede das informações que ele oferece.',
      },
      {
        id: 'decompose-parts',
        name: 'Dividir em pequenas partes',
        type: 'Exercício',
        description:
          'Descreva pequenos passos e como eles contribuem para o objetivo.',
      },
    ],
    rewards: { xp: 50, coins: 15 },
  },
  debug: {
    id: 'debug',
    name: 'Depurar',
    category: 'strategy',
    world: 'inicial',
    icon: 'debug',
    description:
      'Investigue o comportamento de um programa, formule hipóteses e encontre a origem de um erro.',
    prerequisites: [{ skillId: 'variables', minimumLevel: 2 }],
    activities: [
      {
        id: 'debug-investigate',
        name: 'Seguir as pistas',
        type: 'Prática',
        description:
          'Observe os valores do programa e compare o resultado com o que você esperava.',
      },
    ],
    rewards: { xp: 70, coins: 20 },
  },
  plan: {
    id: 'plan',
    name: 'Planejar solução',
    category: 'strategy',
    world: 'inicial',
    icon: 'plan',
    description:
      'Compare possibilidades e organize uma abordagem antes de começar a implementar.',
    prerequisites: [{ skillId: 'debug', minimumLevel: 1 }],
    activities: [
      {
        id: 'plan-steps',
        name: 'Desenhar um plano',
        type: 'Exercício',
        description:
          'Registre etapas, dúvidas e maneiras de verificar sua solução.',
      },
    ],
    rewards: { xp: 70, coins: 20 },
  },
  'first-program': {
    id: 'first-program',
    name: 'Primeiro programa',
    category: 'creation',
    world: 'inicial',
    icon: 'terminal',
    description:
      'Junte suas primeiras ideias e dê vida a um programa simples, do problema à solução.',
    prerequisites: [
      { skillId: 'variables', minimumLevel: 1 },
      { skillId: 'decompose', minimumLevel: 1 },
    ],
    activities: [
      {
        id: 'program-understand',
        name: 'Entender o problema',
        type: 'Leitura',
        description:
          'Conheça o objetivo, identifique as informações de entrada e descreva o resultado esperado.',
      },
      {
        id: 'program-write',
        name: 'Escrever o programa',
        type: 'Prática',
        description:
          'Organize variáveis e passos para transformar sua ideia em um primeiro programa.',
      },
      {
        id: 'program-test',
        name: 'Testar sua solução',
        type: 'Exercício',
        description:
          'Pense em entradas diferentes e compare os resultados com o que você planejou.',
      },
    ],
    rewards: { xp: 80, coins: 20 },
  },
  project: {
    id: 'project',
    name: 'Criar um projeto',
    category: 'creation',
    world: 'inicial',
    icon: 'project',
    description:
      'Reúna o que você aprendeu em uma pequena criação com propósito próprio.',
    prerequisites: [{ skillId: 'first-program', minimumLevel: 1 }],
    activities: [
      {
        id: 'project-create',
        name: 'Dar forma à sua ideia',
        type: 'Prática',
        description:
          'Defina uma pequena necessidade e organize os arquivos de uma solução.',
      },
    ],
    rewards: { xp: 120, coins: 30, item: 'Emblema Primeira criação' },
  },
  prompts: {
    id: 'prompts',
    name: 'Explorar prompts',
    category: 'creation',
    world: 'inicial',
    icon: 'prompts',
    description:
      'Experimente formas de comunicar uma intenção com clareza e avaliar as respostas que recebe.',
    prerequisites: [],
    activities: [
      {
        id: 'prompts-explore',
        name: 'Experimentar uma instrução',
        type: 'Prática',
        description:
          'Compare instruções com diferentes níveis de contexto e identifique o que torna uma resposta útil.',
      },
    ],
    rewards: { xp: 40, coins: 10 },
  },
};
