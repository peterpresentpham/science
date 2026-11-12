import { expect, test } from '@playwright/test';

test.describe('M9: thư viện ảnh, lịch sử, bài học, quiz chủ đề, phòng thí nghiệm', () => {
  test('gallery opens a lightbox with credit, keyboard navigation and Esc', async ({ page }) => {
    await page.goto('/vi/element/cu/');
    const gallery = page.getByRole('region', { name: 'Thư viện ảnh' });
    await gallery.scrollIntoViewIfNeeded();
    const thumbs = gallery.getByRole('button', { name: /^Xem ảnh lớn/ });
    await expect(thumbs).toHaveCount(3);

    await thumbs.first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/Ảnh: .+ · .+/);
    await expect(dialog).toContainText('Ảnh 1 / 3');
    await expect(dialog.getByRole('link', { name: /Wikimedia Commons/ })).toHaveAttribute(
      'href',
      /commons\.wikimedia\.org\/wiki\/File:/
    );

    await page.keyboard.press('ArrowRight');
    await expect(dialog).toContainText('Ảnh 2 / 3');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('history section appears for priority elements only', async ({ page }) => {
    await page.goto('/vi/element/cu/');
    const history = page.getByRole('region', { name: 'Lịch sử' });
    await expect(history).toContainText('Các mốc chính');
    await expect(history.getByRole('link', { name: /dòng thời gian/i })).toBeVisible();

    await page.goto('/vi/element/og/');
    await expect(page.getByRole('region', { name: 'Lịch sử' })).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Thư viện ảnh' })).toHaveCount(0);
  });

  test('timeline filters by kind and links elements', async ({ page }) => {
    await page.goto('/vi/timeline/');
    const count = async () =>
      Number((await page.getByText(/^\d+ mốc$/).textContent())!.replace(/\D/g, ''));
    const all = await count();
    expect(all).toBeGreaterThan(100);

    await page.getByRole('button', { name: 'Lý thuyết', exact: true }).click();
    const theory = await count();
    expect(theory).toBeGreaterThan(0);
    expect(theory).toBeLessThan(all);

    await page.getByRole('button', { name: 'Phát hiện nguyên tố', exact: true }).click();
    await page
      .getByRole('link', { name: /Oxi \(O\)/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/vi\/element\/o\/$/);
  });

  test('lessons list, interactive balance widget and practice quiz', async ({ page }) => {
    await page.goto('/vi/lessons/');
    await expect(page.getByRole('listitem').filter({ hasText: 'phút đọc' })).toHaveCount(6);

    await page.goto('/vi/lessons/redox-reactions/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('electron');
    const show = page.getByRole('button', { name: 'Hiện hệ số cân bằng' }).first();
    await show.scrollIntoViewIfNeeded();
    await show.click();
    await expect(page.getByRole('button', { name: 'Ẩn hệ số' }).first()).toBeVisible();

    const practice = page.getByRole('region', { name: 'Luyện tập' }).first();
    await practice.scrollIntoViewIfNeeded();
    await expect(practice).toContainText(/Câu 1\/\d/);
  });

  test('topic quiz runs and content flashcard decks are listed', async ({ page }) => {
    await page.goto('/vi/learn/');
    await expect(page.getByRole('button', { name: 'Ion thường gặp' })).toBeVisible();
    await page.getByRole('button', { name: 'Ion thường gặp' }).click();
    await expect(page.getByText('Bấm để lật thẻ')).toBeVisible();

    await page.getByRole('tab', { name: 'Quiz' }).click();
    await expect(page.getByRole('heading', { name: 'Theo chủ đề' })).toBeVisible();
    await page
      .getByRole('heading', { name: 'Theo chủ đề' })
      .locator('xpath=following-sibling::ul')
      .getByRole('button')
      .first()
      .click();
    await expect(page.getByText(/Câu 1\/10/)).toBeVisible();
    // Trả lời một câu (mọi kiểu: một đáp án, nhiều đáp án, nhập số hoặc ký hiệu)
    const checkbox = page.getByRole('checkbox').first();
    const textbox = page.getByRole('textbox');
    if (await checkbox.isVisible()) {
      await checkbox.check();
      await page.getByRole('button', { name: 'Kiểm tra' }).click();
    } else if (await textbox.isVisible()) {
      await textbox.fill('1');
      await page.getByRole('button', { name: 'Kiểm tra' }).click();
    } else {
      await page.locator('ul li button').first().click();
    }
    await expect(page.getByRole('button', { name: /^(Câu tiếp|Xem kết quả)$/ })).toBeVisible();
    await expect(page.getByRole('status').last()).toContainText(/Chính xác|Chưa đúng/);
  });

  test('virtual lab: ready-made experiment shows observations', async ({ page }) => {
    await page.goto('/vi/lab/?r=agno3-nacl');
    await expect(page.getByRole('heading', { level: 2 }).first()).toContainText('Bạc nitrat');
    await expect(page.getByRole('note')).toContainText('Cần cẩn thận');
    await page.getByRole('button', { name: 'Trộn' }).click();
    // Hoạt cảnh dài tối thiểu 3 giây
    await expect(page.getByRole('heading', { name: 'Hiện tượng' })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText(/kết tủa trắng/).first()).toBeVisible();
    await expect(page.getByText(/Bạn đoán đúng \d\/5/)).toBeVisible();
  });

  test('virtual lab: heat is required and free mode matches reagents', async ({ page }) => {
    await page.goto('/vi/lab/?r=caco3-heat');
    await page.getByRole('button', { name: 'Trộn' }).click();
    await expect(page.getByRole('status')).toContainText('cần đun nóng');

    await page.goto('/vi/lab/');
    await page.getByRole('tab', { name: 'Tự chọn hoá chất' }).click();
    await page.getByRole('button', { name: 'AgNO3', exact: true }).click();
    await page.getByRole('button', { name: 'NaCl', exact: true }).click();
    await page.getByRole('button', { name: 'Trộn' }).click();
    await expect(page.getByRole('heading', { name: 'Hiện tượng' })).toBeVisible({
      timeout: 15_000,
    });

    // Bộ hoá chất không có phản ứng
    await page.getByRole('button', { name: 'Đặt lại' }).click();
    await page.getByRole('button', { name: 'NaCl', exact: true }).click();
    await page.getByRole('button', { name: 'Trộn' }).click();
    await expect(page.getByRole('status')).toBeVisible();
  });

  test('chosen language is remembered when opening the root', async ({ page }) => {
    await page.goto('/vi/');
    await page.getByRole('button', { name: 'en', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);

    await page.getByRole('button', { name: 'vi', exact: true }).click();
    await page.goto('/');
    await expect(page).toHaveURL(/\/vi\/$/);
  });

  test('404 page follows the language in the URL', async ({ page }) => {
    await page.goto('/vi/khong-co-trang/');
    await expect(page.getByRole('heading', { name: 'Không tìm thấy trang' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeHidden();
    await expect(page).toHaveTitle('404 · Nguyên tố');

    await page.goto('/en/nothing-here/');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to the periodic table' })).toBeVisible();
  });
});
