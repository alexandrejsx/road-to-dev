import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 900 } });

test('explora requisitos e atividades sem conceder recompensas', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/mapa\/inicial$/);
  await expect(page.getByRole('complementary')).toHaveCount(0);
  const canvas = page.getByTestId('map-canvas');
  const originalWidth = (await canvas.boundingBox())!.width;
  const balances = page.getByLabel('Saldo de demonstração:', { exact: false });
  const originalBalances = await balances.textContent();
  const zoom = page.locator('.zoom-value');
  await expect(zoom).toHaveText('100%');

  await page
    .getByRole('button', {
      name: 'Primeiro programa, Criação, Disponível',
      exact: true,
    })
    .click();
  const panel = page.getByRole('complementary');
  await expect(
    panel.getByRole('heading', { name: 'Primeiro programa', exact: true }),
  ).toBeVisible();
  await expect(panel.getByText('2 de 2', { exact: true })).toBeVisible();
  await expect(zoom).toHaveText('100%');
  expect((await canvas.boundingBox())!.width).toBeLessThan(originalWidth);

  const start = panel.getByRole('button', { name: 'Começar', exact: true });
  await start.click();
  const demo = page.getByRole('dialog');
  await expect(demo.getByText('Demonstração', { exact: true })).toBeVisible();
  await expect(
    demo.getByRole('heading', { name: 'Entender o problema' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(demo).toHaveCount(0);
  await expect(start).toBeFocused();
  await expect(balances).toHaveText(originalBalances!);

  await panel
    .getByRole('button', { name: /^Explorar requisito Variáveis/ })
    .click();
  await expect(
    panel.getByRole('heading', { name: 'Variáveis', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', {
      name: 'Condições, Conhecimento, Bloqueada',
      exact: true,
    })
    .click();
  await expect(panel.getByText('Nível 2 · atual 1')).toBeVisible();
  await expect(
    panel.getByRole('button', { name: /^Escolher caminhos/ }),
  ).toBeDisabled();
  await panel.getByRole('button', { name: 'Explorar requisitos' }).click();
  await expect(
    panel.getByRole('heading', { name: 'Variáveis', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toHaveCount(0);
  await expect(page.locator('#skill-variables')).toBeFocused();
  expect((await canvas.boundingBox())!.width).toBe(originalWidth);
});

test('suporta teclado, zoom e redimensionamento sem reiniciar a exploração', async ({
  page,
}) => {
  await page.goto('/mapa/inicial');
  const skill = page.getByRole('button', {
    name: 'Decompor problemas, Estratégia, Em desenvolvimento',
    exact: true,
  });
  await skill.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('complementary').getByRole('button', { name: 'Continuar' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Diminuir zoom', exact: true })
    .click();
  await expect(page.locator('.zoom-value')).not.toHaveText('100%');
  await page.waitForTimeout(250);
  const currentZoom = await page.locator('.zoom-value').textContent();
  await page.setViewportSize({ width: 1100, height: 850 });
  await expect(page.locator('.zoom-value')).toHaveText(currentZoom!);
  await expect(skill).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Fechar detalhes da skill' }).click();
  await expect(skill).toBeFocused();
  await expect(page.locator('.zoom-value')).toHaveText(currentZoom!);
});

test('mantém o drawer acessível em tela móvel e devolve o foco ao nó', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/mapa/inicial');
  await page
    .getByRole('navigation', { name: 'Explorar categorias' })
    .getByRole('button', { name: 'Criação', exact: true })
    .click();
  const independent = page.getByRole('button', {
    name: 'Explorar prompts, Criação, Disponível',
    exact: true,
  });
  await independent.click();
  const sheet = page.getByRole('dialog', {
    name: 'Explorar prompts',
    exact: true,
  });
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByText('Entrada livre. Sem pré-requisitos.'),
  ).toBeVisible();
  await expect(page.getByRole('complementary')).toHaveCount(0);
  const first = sheet.getByRole('button', { name: 'Fechar detalhes da skill' });
  await first.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(sheet.getByRole('button', { name: 'Começar' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('dialog', { name: 'Experimentar uma instrução' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(sheet).toBeVisible();
  await expect(sheet.getByRole('button', { name: 'Começar' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(independent).toBeFocused();
  const noPageOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth === window.innerWidth,
  );
  expect(noPageOverflow).toBe(true);
  await page.setViewportSize({ width: 320, height: 740 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth === window.innerWidth,
    ),
  ).toBe(true);
});

async function expectWorldVisible(page: Page) {
  const visible = await page
    .locator('.category-regions')
    .evaluate((regions) => {
      const canvas = document
        .querySelector('[data-testid="map-canvas"]')!
        .getBoundingClientRect();
      return [...regions.children].some((region) => {
        const box = region.getBoundingClientRect();
        return (
          Math.min(box.right, canvas.right) - Math.max(box.left, canvas.left) >
            100 &&
          Math.min(box.bottom, canvas.bottom) - Math.max(box.top, canvas.top) >
            100
        );
      });
    });
  expect(visible).toBe(true);
}

async function viewportTransform(page: Page) {
  return page.locator('.react-flow__viewport').getAttribute('style');
}

test('limita pan em todas as direções e zoom, sem movimento pela roda', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/mapa/inicial');
  await expect(page.getByTestId('map-canvas')).toHaveAttribute(
    'aria-busy',
    'false',
  );
  await expect(page.locator('.zoom-value')).toHaveText('100%');
  for (const size of [
    { width: 2560, height: 1440 },
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    for (const label of ['Aumentar zoom', 'Diminuir zoom']) {
      const button = page.getByRole('button', { name: label, exact: true });
      for (let step = 0; step < 12 && (await button.isEnabled()); step++)
        await button.click();
      await expect(button).toBeDisabled();
      // Start in the empty margin, then keep dragging past each world boundary.
      const box = (await page.getByTestId('map-canvas').boundingBox())!;
      for (const [dx, dy] of [
        [1500, 0],
        [-1500, 0],
        [0, 1500],
        [0, -1500],
      ]) {
        for (let repeat = 0; repeat < 3; repeat++) {
          await page.mouse.move(box.x + 5, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + 5 + dx!, box.y + box.height / 2 + dy!, {
            steps: 8,
          });
          await page.mouse.up();
        }
        await expectWorldVisible(page);
      }
    }
    await page
      .getByRole('button', { name: 'Centralizar', exact: true })
      .click();
    await expectWorldVisible(page);
    const centered = await viewportTransform(page);
    await page.mouse.move(100, 350);
    await page.mouse.wheel(800, 800);
    await page.waitForTimeout(150);
    expect(await viewportTransform(page)).toBe(centered);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollHeight <= window.innerHeight &&
          document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test('painel rola sem mover o canvas e mantém o contexto da atividade', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/mapa/inicial');
  await page.locator('#skill-first-program').click();
  const panel = page.getByRole('complementary');
  const scroll = panel.locator('[data-radix-scroll-area-viewport]');
  const before = await viewportTransform(page);
  await scroll.hover();
  await page.mouse.wheel(0, 600);
  await expect
    .poll(() => scroll.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  expect(await viewportTransform(page)).toBe(before);
  await panel.getByRole('button', { name: 'Começar', exact: true }).click();
  await page.keyboard.press('Escape');
  expect(await viewportTransform(page)).toBe(before);
  await expect(page.locator('#skill-first-program')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(
    panel.getByRole('button', { name: 'Começar', exact: true }),
  ).toBeFocused();
});

test.describe('gestos de toque', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });

  test('preserva pinch, seleção por toque e retorno de foco', async ({
    page,
    context,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/mapa/inicial');
    await page.getByRole('button', { name: 'Centralizar', exact: true }).tap();
    const before = Number(
      (await page.locator('.zoom-value').textContent())!.replace('%', ''),
    );
    const session = await context.newCDPSession(page);
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [
        { x: 100, y: 300, id: 0 },
        { x: 230, y: 300, id: 1 },
      ],
    });
    for (let step = 1; step <= 5; step++) {
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [
          { x: 100 - step * 7, y: 300, id: 0 },
          { x: 230 + step * 7, y: 300, id: 1 },
        ],
      });
    }
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await expect
      .poll(async () =>
        Number(
          (await page.locator('.zoom-value').textContent())!.replace('%', ''),
        ),
      )
      .toBeGreaterThan(before);
    await expectWorldVisible(page);
    await page.getByRole('button', { name: 'Centralizar', exact: true }).tap();
    await page
      .getByRole('navigation', { name: 'Explorar categorias' })
      .getByRole('button', { name: 'Criação', exact: true })
      .tap();
    await page.locator('#skill-prompts').tap();
    const sheet = page.getByRole('dialog', {
      name: 'Explorar prompts',
      exact: true,
    });
    await expect(sheet).toBeVisible();
    await sheet.getByRole('button', { name: 'Fechar detalhes da skill' }).tap();
    await expect(page.locator('#skill-prompts')).toBeFocused();
  });
});
