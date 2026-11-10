import { expect, test } from '@playwright/test';

test.describe('M5 tools', () => {
  test('molar mass from the URL, with composition', async ({ page }) => {
    await page.goto('/vi/tools/molar-mass/?f=H2O');
    await expect(page.getByText(/18,01\d/).first()).toBeVisible();
    await expect(page.getByRole('table')).toContainText('88,8');
  });

  test('molar mass shows an understandable error', async ({ page }) => {
    await page.goto('/vi/tools/molar-mass/');
    await page.getByRole('textbox', { name: 'Công thức hoá học' }).fill('co2');
    await expect(page.locator('[role=alert]:not(#__next-route-announcer__)')).toContainText(
      'chữ hoa'
    );
  });

  test('converter: 36 g of water is 2 mol', async ({ page }) => {
    await page.goto('/vi/tools/molar-mass/?f=H2O');
    await page.getByRole('textbox', { name: 'Khối lượng m' }).fill('36,03');
    await expect(page.getByRole('textbox', { name: 'Số mol n' })).toHaveValue(/^2(,0+)?$/);
  });

  test('balance with electron steps and stoichiometry', async ({ page }) => {
    await page.goto(
      `/vi/tools/balance/?eq=${encodeURIComponent('Cu + HNO3 -> Cu(NO3)2 + NO + H2O')}`
    );
    await expect(page.getByText('Phương trình đã cân bằng')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Thăng bằng electron' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(page.getByText('×3')).toBeVisible();
    await page.getByRole('tab', { name: 'Phương pháp đại số' }).click();
    await expect(page.getByText('(3; 8; 3; 2; 4)')).toBeVisible();
    await page.getByRole('textbox', { name: 'Lượng Cu' }).fill('6,4');
    await page.getByRole('textbox', { name: 'Lượng HNO3' }).fill('63');
    await expect(page.getByText(/Chất hết: Cu/)).toBeVisible();
  });

  test('balance reports a species that cannot react', async ({ page }) => {
    await page.goto(`/vi/tools/balance/?eq=${encodeURIComponent('H2 + O2 + N2 -> H2O')}`);
    await expect(page.locator('[role=alert]:not(#__next-route-announcer__)')).toContainText('N2');
  });

  test('activity series explains a metal', async ({ page }) => {
    await page.goto('/vi/tools/activity/');
    await page.getByRole('button', { name: 'Cu', exact: true }).click();
    await expect(page.getByText(/đứng sau H/)).toBeVisible();
  });

  test('trends charts render and the hub links work', async ({ page }) => {
    await page.goto('/en/tools/');
    await page.getByRole('link', { name: /Periodic trends/ }).click();
    await expect(page.getByRole('img', { name: /by atomic number/ })).toBeVisible();
    await expect(page.getByRole('img', { name: /Scatter plot/ })).toBeVisible();
  });
});
