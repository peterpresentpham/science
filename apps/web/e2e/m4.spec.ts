import { expect, test } from '@playwright/test';

test.describe('M4: cấu trúc, hợp chất, phổ', () => {
  test('element page: crystal viewer, compounds, spectrum and flame', async ({ page }) => {
    await page.goto('/vi/element/cu/#hoc-hoa');
    const structure = page.getByRole('region', { name: 'Cấu trúc & hợp chất' });
    await structure.scrollIntoViewIfNeeded();
    await expect(structure.getByRole('img', { name: /Mô hình 3D/ })).toBeVisible({
      timeout: 15_000,
    });
    await expect(structure).toContainText('Lập phương tâm diện', { timeout: 15_000 });
    await expect(structure).toContainText('12'); // số phối trí fcc
    await expect(structure.getByRole('link', { name: /Đồng\(II\) sunfat/ })).toBeVisible();

    const light = page.getByRole('region', { name: /Ánh sáng/ });
    await expect(light.getByRole('img', { name: /Phổ vạch phát xạ của Đồng/ })).toBeVisible();
    await expect(light).toContainText('xanh lục lam');
  });

  test('compound page shows formula, VSEPR and molar mass', async ({ page }) => {
    await page.goto('/vi/compound/962/'); // nước
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nước');
    await expect(page.getByText('AX₂E₂')).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/18,01\d g\/mol/)).toBeVisible();
  });

  test('ionic compound offers the crystal lattice', async ({ page }) => {
    await page.goto('/vi/compound/5234/'); // natri clorua
    await expect(page.getByRole('tab', { name: 'Mạng tinh thể' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(page.getByText('Kiểu muối ăn (NaCl)')).toBeVisible();
  });

  test('compound index filters without diacritics', async ({ page }) => {
    await page.goto('/vi/compound/');
    await page.getByRole('textbox', { name: 'Lọc hợp chất' }).fill('muoi an');
    await expect(page.getByRole('link', { name: /Natri clorua/ })).toBeVisible();
  });

  test('balance links a species to its compound page', async ({ page }) => {
    await page.goto(`/vi/tools/balance/?eq=${encodeURIComponent('NaOH + HCl -> NaCl + H2O')}`);
    await expect(page.getByRole('link', { name: 'NaCl' })).toHaveAttribute(
      'href',
      /\/compound\/5234\/$/
    );
  });
});
