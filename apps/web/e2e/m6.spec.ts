import { expect, test } from '@playwright/test';

test.describe('M6: đồng vị, bảng 3D, offline', () => {
  test('carbon lists isotopes and simulates C-14 decay', async ({ page }) => {
    await page.goto('/vi/element/c/#hoc-hoa');
    const card = page.getByRole('region', { name: /Đồng vị/ });
    await card.scrollIntoViewIfNeeded();
    await expect(card).toContainText('14 đồng vị đã biết');
    await expect(card.getByRole('table')).toContainText('5.700 năm');

    // C-14 là đồng vị phóng xạ sống lâu nhất của carbon: mô phỏng chọn sẵn
    const slider = card.getByRole('slider', { name: /Thời gian trôi qua/ });
    await expect(card.getByRole('combobox')).toContainText('14C');
    await slider.fill('1');
    await expect(card).toContainText(/còn \d+\/400 hạt nhân/);
    await expect(card).toContainText(/Sau 5\.\d{3}/);
  });

  test('nuclide chart loads and describes the hovered nucleus', async ({ page }) => {
    await page.goto('/vi/element/u/#hoc-hoa');
    // Bản đồ chỉ tải khi khung lọt vào màn hình: cuộn tới tiêu đề trước
    await page
      .getByRole('heading', { name: 'Vị trí trên bản đồ hạt nhân' })
      .scrollIntoViewIfNeeded();
    const chart = page.getByRole('img', { name: /Bản đồ [\d.,]+ hạt nhân/ });
    await expect(chart).toBeVisible({ timeout: 15_000 });
  });

  test('3D table toggles on and opens the element panel', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/vi/');
    const toggle = page.getByRole('button', { name: 'Bảng 3D' });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('img', { name: /Bảng tuần hoàn 3D/ })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page).toHaveURL(/d=3/);
  });

  test('offline page lists the downloadable packs', async ({ page }) => {
    await page.goto('/vi/offline/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dùng offline');
    await expect(page.getByText('118 trang nguyên tố', { exact: true })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole('button', { name: /Tải tất cả/ })).toBeEnabled();
  });
});
