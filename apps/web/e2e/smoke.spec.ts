import { expect, test } from '@playwright/test';

test('a página inicial confirma que o frontend está funcionando', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Road to Dev');
  await expect(
    page.getByRole('heading', { name: 'Road to Dev', level: 1 }),
  ).toBeVisible();
  await expect(page.getByText('Frontend funcionando.')).toBeVisible();
});
