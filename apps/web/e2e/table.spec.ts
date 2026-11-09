import { expect, type Locator, test } from '@playwright/test';

test('root redirects to a locale', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/(vi|en)\/$/);
});

test('table renders all 118 elements', async ({ page }) => {
  await page.goto('/vi/');
  await expect(page.locator('a[data-z]')).toHaveCount(118);
  await expect(page.locator('a[data-z="26"]')).toContainText('Sắt');
});

test('hover shows preview', async ({ page }) => {
  await page.goto('/vi/');
  await page.locator('a[data-z="79"]').hover();
  await expect(page.getByText('Vàng', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Gold', { exact: true })).toBeVisible();
});

test('click opens panel, URL changes, back closes, refresh shows full page', async ({ page }) => {
  await page.goto('/vi/');
  await page.locator('a[data-z="26"]').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { level: 1 })).toHaveText('Sắt');
  await expect(page).toHaveURL(/\/vi\/element\/fe\/$/);

  // Chuyển sang nguyên tố kế tiếp ngay trong panel
  await dialog.getByRole('button', { name: /27 Co/ }).click();
  await expect(dialog.getByRole('heading', { level: 1 })).toHaveText('Coban');
  await expect(page).toHaveURL(/\/vi\/element\/co\/$/);

  await page.goBack();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/vi\/$/);

  await page.goForward();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.reload();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Coban');
});

test('Escape closes the panel', async ({ page }) => {
  await page.goto('/vi/');
  await page.locator('a[data-z="8"]').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page).toHaveURL(/\/vi\/$/);
});

test('arrow keys move focus across the grid', async ({ page }) => {
  await page.goto('/vi/');
  await page.locator('a[data-z="1"]').focus();
  await page.keyboard.press('ArrowRight'); // H → He
  await expect(page.locator('a[data-z="2"]')).toBeFocused();
  await page.keyboard.press('ArrowDown'); // He → Ne
  await expect(page.locator('a[data-z="10"]')).toBeFocused();
  await page.keyboard.press('ArrowLeft'); // Ne → F
  await expect(page.locator('a[data-z="9"]')).toBeFocused();
});

test('element page is statically rendered with data', async ({ page }) => {
  const res = await page.goto('/en/element/cr/');
  expect(res?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Chromium');
  // Phần học thuật có sẵn trong HTML tĩnh dù đang thu gọn
  await expect(page.getByText('Exception to the Aufbau filling order.')).toBeAttached();
  await expect(page.getByText('Exception to the Aufbau filling order.')).toBeHidden();
  await expect(page).toHaveTitle(/Chromium \(Cr\)/);
});

test('locale switch keeps the path', async ({ page }) => {
  await page.goto('/vi/element/na/');
  await page.getByRole('button', { name: 'en' }).click();
  await expect(page).toHaveURL(/\/en\/element\/na\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sodium');
});

test('Bohr electrons stay on their orbits while animating', async ({ page }) => {
  await page.goto('/vi/element/os/#hoc-hoa');
  const svg = page.getByRole('img', { name: /2, 8, 18, 32, 14, 2/ });
  await expect(svg).toBeVisible();
  for (const wait of [0, 700, 1500]) {
    await page.waitForTimeout(wait);
    const outside = await svg.evaluate((el) => {
      const box = el.getBoundingClientRect();
      const pad = 4;
      return [...el.querySelectorAll('.bohr-shell circle')].filter((c) => {
        const r = c.getBoundingClientRect();
        return (
          r.left < box.left - pad ||
          r.right > box.right + pad ||
          r.top < box.top - pad ||
          r.bottom > box.bottom + pad
        );
      }).length;
    });
    expect(outside).toBe(0);
  }
});

test('list view on mobile: search without diacritics, filter, open panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/vi/');
  await expect(page.locator('a[data-z="1"]')).toBeHidden();
  const search = page.getByRole('searchbox', { name: 'Tìm nguyên tố' });
  await expect(search).toBeVisible();

  await search.fill('luu huynh');
  await expect(page.locator('a[data-row-z]')).toHaveCount(1);
  await page.locator('a[data-row-z="16"]').click();
  await expect(page.getByRole('dialog').getByRole('heading', { level: 1 })).toHaveText('Lưu huỳnh');
  await page.keyboard.press('Escape');

  await search.fill('');
  await page.getByRole('button', { name: 'Khí hiếm' }).click();
  await expect(page.locator('a[data-row-z]')).toHaveCount(7);
});

test('view switch toggles between table and list on desktop', async ({ page }) => {
  await page.goto('/vi/');
  await expect(page.locator('a[data-z="26"]')).toBeVisible();
  await page.getByRole('button', { name: 'Danh sách' }).first().click();
  await expect(page.locator('a[data-z="26"]')).toBeHidden();
  await expect(page.locator('a[data-row-z="26"]')).toBeVisible();
  await page.getByRole('button', { name: 'Bảng' }).last().click();
  await expect(page.locator('a[data-z="26"]')).toBeVisible();
});

test('opening the panel uses a view transition when supported', async ({ page }) => {
  await page.goto('/vi/');
  const names = await page.evaluate(async () => {
    const seen: string[] = [];
    const orig = document.startViewTransition.bind(document);
    document.startViewTransition = ((cb: () => void) => {
      seen.push(
        document.querySelector<HTMLElement>('a[data-z="26"]')?.style.viewTransitionName ?? ''
      );
      return orig(cb);
    }) as typeof document.startViewTransition;
    document.querySelector<HTMLElement>('a[data-z="26"]')?.click();
    await new Promise((r) => setTimeout(r, 600));
    return seen;
  });
  expect(names).toEqual(['element-tile']);
  await expect(page.getByRole('dialog')).toBeVisible();
  // Sau khi chuyển cảnh xong, ô trong bảng không còn giữ tên transition
  await expect(page.locator('a[data-z="26"]')).toHaveAttribute(
    'style',
    /^(?!.*view-transition-name)/
  );
});

test.describe('photos', () => {
  const loaded = (img: Locator) =>
    img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);

  test('element page hero shows a real photo with alt text and credit', async ({ page }) => {
    await page.goto('/vi/element/fe/');
    const img = page.locator('header img');
    await expect(img).toHaveAttribute('alt', 'Ảnh Sắt');
    await expect(img).toHaveAttribute('fetchpriority', 'high');
    await expect.poll(() => loaded(img)).toBe(true);
    await expect(page.locator('header figcaption')).toContainText('CC BY 3.0');
  });

  test('superheavy element without a photo falls back to the symbol tile', async ({ page }) => {
    await page.goto('/vi/element/og/');
    await expect(page.locator('header img')).toHaveCount(0);
    await expect(page.getByText('Chưa ai từng thu được đủ lượng')).toBeVisible();
  });

  test('hover preview and panel show the photo', async ({ page }) => {
    await page.goto('/vi/');
    await page.locator('a[data-z="29"]').hover();
    await expect.poll(() => loaded(page.locator('img[src*="/cu-640.webp"]').first())).toBe(true);
    await page.locator('a[data-z="29"]').click();
    const dialog = page.getByRole('dialog');
    await expect.poll(() => loaded(dialog.locator('header img'))).toBe(true);
    await expect(dialog.locator('header figcaption')).toContainText('CC BY-SA 2.5');
  });

  test('list rows have thumbnails on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/vi/');
    const thumb = page.locator('a[data-row-z="1"] img');
    await expect(thumb).toHaveAttribute('src', /h-96\.webp$/);
    await expect.poll(() => loaded(thumb)).toBe(true);
  });

  test('credits page lists every photo with its license', async ({ page }) => {
    await page.goto('/en/credits/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Credits');
    expect(await page.locator('main li img').count()).toBeGreaterThanOrEqual(100);
    await page.goto('/vi/');
    await page.getByRole('link', { name: 'Ghi công' }).click();
    await expect(page).toHaveURL(/\/vi\/credits\/$/);
  });
});

test('lanthanide/actinide placeholders highlight their series and jump to it', async ({ page }) => {
  await page.goto('/vi/');
  const placeholder = page.getByRole('button', { name: /^Họ Lanthan \(số hiệu 57–71\)/ });
  await expect(placeholder).toBeVisible();

  await placeholder.hover();
  await expect(page.locator('a[data-z="58"]')).toHaveAttribute('data-dimmed', 'false');
  await expect(page.locator('a[data-z="26"]')).toHaveAttribute('data-dimmed', 'true');
  await expect(page.locator('a[data-z="90"]')).toHaveAttribute('data-dimmed', 'true');

  await page.getByRole('button', { name: /^Họ Actini \(số hiệu/ }).click();
  await expect(page.locator('a[data-z="89"]')).toBeFocused();
});

test.describe('academic corner', () => {
  test('is collapsed by default, opens on click and is remembered', async ({ page }) => {
    await page.goto('/vi/element/fe/');
    const corner = page.locator('details#hoc-hoa');
    await expect(corner).not.toHaveAttribute('open', '');
    await expect(page.getByText('Cấu hình electron', { exact: true })).toBeHidden();
    // Thông tin chu kỳ/nhóm/khối không còn ở hero nhưng vẫn có trong mục Vị trí
    await expect(page.locator('article header')).not.toContainText('Chu kỳ 4');
    await expect(corner).toContainText('Chu kỳ 4 vì có 4 lớp electron');

    await page.getByText('Góc học hoá').click();
    await expect(page.getByText('Cấu hình electron', { exact: true })).toBeVisible();
    await page.reload();
    await expect(corner).toHaveAttribute('open', '');
  });

  test('opens from the #hoc-hoa link', async ({ page }) => {
    await page.goto('/en/element/au/#hoc-hoa');
    await expect(page.getByText('Electron configuration', { exact: true })).toBeVisible();
  });

  test('hero shows everyday labels, including radioactivity', async ({ page }) => {
    await page.goto('/vi/element/u/');
    const header = page.locator('article header');
    await expect(header).toContainText('Rắn ở nhiệt độ phòng');
    await expect(header).toContainText('Phóng xạ');
    await expect(header).toContainText('Tìm ra năm 1789');
    await page.goto('/vi/element/au/');
    await expect(page.locator('article header')).toContainText('Biết đến từ thời cổ đại');
    await expect(page.locator('article header')).not.toContainText('Phóng xạ');
  });
});

test.describe('human scale', () => {
  test('turns numbers into everyday comparisons', async ({ page }) => {
    await page.goto('/vi/element/fe/');
    const section = page.getByRole('region', { name: 'Nói cho dễ hình dung' });
    await expect(section).toContainText('Nặng gấp 7,9 lần nước');
    await expect(section).toContainText('Chỉ nóng chảy khi nóng hơn dung nham núi lửa');
    await expect(section).toContainText('nghìn tỉ tỉ nguyên tử');
  });

  test('gallium melts in your hand, helium is lighter than air', async ({ page }) => {
    await page.goto('/vi/element/ga/');
    await expect(page.getByText('Tan chảy trong lòng bàn tay bạn')).toBeVisible();
    await page.goto('/en/element/he/');
    await expect(page.getByText('6.9 times lighter than air')).toBeVisible();
  });

  test('superheavy elements say nobody has made a gram', async ({ page }) => {
    await page.goto('/vi/element/og/');
    await expect(page.getByText('Chưa ai từng tạo ra đủ lượng để cân được')).toBeVisible();
    await expect(page.getByText('Mọi nguyên tử Oganesson rồi sẽ tự phân rã')).toBeVisible();
  });

  test('also shows in the panel', async ({ page }) => {
    await page.goto('/vi/');
    await page.locator('a[data-z="80"]').click();
    await expect(
      page.getByRole('dialog').getByText('Chỉ đông cứng khi lạnh hơn ngăn đá tủ lạnh')
    ).toBeVisible();
  });
});

test.describe('lenses', () => {
  test('body lens highlights body elements with their share', async ({ page }) => {
    await page.goto('/vi/');
    await page.getByRole('button', { name: 'Trong cơ thể bạn' }).first().click();
    await expect(page).toHaveURL(/\?lens=body$/);
    await expect(page.locator('a[data-z="8"]')).toHaveAttribute('data-dimmed', 'false');
    await expect(page.locator('a[data-z="8"]')).toContainText('65%');
    await expect(page.locator('a[data-z="26"]')).toContainText('4,2g');
    await expect(page.locator('a[data-z="79"]')).toHaveAttribute('data-dimmed', 'true');
    await expect(
      page.getByText('Chỉ 4 nguyên tố O, C, H, N').filter({ visible: true })
    ).toBeVisible();
  });

  test('a shared ?lens= link opens that lens', async ({ page }) => {
    await page.goto('/en/?lens=precious');
    await expect(page.getByRole('button', { name: 'Precious' }).first()).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page.locator('a[data-z="79"]')).toHaveAttribute('data-dimmed', 'false');
    await expect(page.locator('a[data-z="26"]')).toHaveAttribute('data-dimmed', 'true');
  });

  test('clicking the active lens again clears it', async ({ page }) => {
    await page.goto('/vi/?lens=radioactive');
    await page.getByRole('button', { name: 'Phóng xạ' }).first().click();
    await expect(page).toHaveURL(/\/vi\/$/);
    await expect(page.locator('a[data-z="26"]')).toHaveAttribute('data-dimmed', 'false');
  });

  test('list view filters by lens on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/vi/?lens=liquid');
    await expect(page.locator('a[data-row-z]')).toHaveCount(6);
  });
});

test.describe('stories', () => {
  test('element with a story shows hook, uses, facts and safety', async ({ page }) => {
    await page.goto('/vi/element/fe/');
    await expect(page.locator('article header')).toContainText('khoảng 4 gam sắt');
    await expect(page.getByRole('region', { name: 'Bạn gặp nó ở đâu' })).toContainText('Chảo gang');
    const facts = page.getByRole('region', { name: 'Có thể bạn chưa biết' });
    await expect(facts.getByText('Chủ yếu là sắt pha niken')).toBeVisible();
    await facts.getByText('Vì sao sao Hoả màu đỏ?').click();
    await expect(facts.getByText('gỉ sắt')).toBeVisible();
    await expect(facts.getByRole('link', { name: /en\.wikipedia\.org/ }).first()).toBeVisible();
    await expect(page.getByRole('region', { name: /An toàn/ })).toContainText('vô hại');
  });

  test('english page shows the english story', async ({ page }) => {
    await page.goto('/en/element/hg/');
    await expect(
      page.getByText('The only metal that is liquid at room temperature.')
    ).toBeVisible();
    await expect(page.getByRole('region', { name: /Safety/ })).toContainText('toxic');
  });

  test('sections without content are not rendered', async ({ page }) => {
    // Og có câu chuyện nhưng không có hỏi–đáp: không được hiện mục "Có thể bạn chưa biết" rỗng
    await page.goto('/vi/element/og/');
    await expect(page.getByRole('region', { name: 'Bạn gặp nó ở đâu' })).toContainText(
      'Chỉ dùng trong nghiên cứu'
    );
    await expect(page.getByRole('region', { name: 'Có thể bạn chưa biết' })).toHaveCount(0);
  });

  test('radioactive element gets an automatic safety warning', async ({ page }) => {
    await page.goto('/vi/element/pu/');
    await expect(page.getByRole('region', { name: /An toàn/ })).toContainText('phóng xạ');
  });

  test('hook shows in the hover preview and the mobile list', async ({ page }) => {
    await page.goto('/vi/');
    await page.locator('a[data-z="79"]').hover();
    // Danh sách mobile (ẩn bằng CSS) cũng chứa câu này, nên chỉ lấy phần đang hiển thị
    await expect(
      page.getByText('khối lập phương cạnh khoảng 22 mét').filter({ visible: true })
    ).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/vi/');
    await expect(page.locator('a[data-row-z="80"]')).toContainText('Kim loại duy nhất ở thể lỏng');
  });
});

test.describe('step 6: search by use, kitchen lens, did you know', () => {
  test('search finds elements by everyday use and lens name', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/vi/');
    const search = page.getByRole('searchbox');
    await search.fill('muoi');
    for (const z of [11, 17, 53]) await expect(page.locator(`a[data-row-z="${z}"]`)).toBeVisible();
    await search.fill('dien thoai');
    await expect(page.locator('a[data-row-z="3"]')).toBeVisible(); // Li: pin điện thoại
    await expect(page.locator('a[data-row-z="31"]')).toBeVisible(); // Ga: lăng kính điện thoại
  });

  test('kitchen lens highlights kitchen elements', async ({ page }) => {
    await page.goto('/vi/?lens=kitchen');
    await expect(page.locator('a[data-z="11"]')).toHaveAttribute('data-dimmed', 'false');
    await expect(page.locator('a[data-z="24"]')).toHaveAttribute('data-dimmed', 'false');
    await expect(page.locator('a[data-z="79"]')).toHaveAttribute('data-dimmed', 'true');
  });

  test('did you know shows a random hook and can shuffle', async ({ page }) => {
    await page.goto('/vi/');
    const card = page.getByText('Bạn có biết?').filter({ visible: true });
    await expect(card).toBeVisible();
    const box = card.locator('xpath=..');
    const before = await box.textContent();
    await box.getByRole('button', { name: 'Điều khác' }).click();
    await expect(box).not.toHaveText(before ?? '');
    await box.getByRole('link').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});

test.describe('M2: tô màu, tìm nhanh, so sánh', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('colour mode is kept in the URL and restored on reload', async ({ page }) => {
    await page.goto('/vi/');
    await page.getByLabel('Thuộc tính').selectOption('en');
    await expect(page).toHaveURL(/color=en/);
    // F có độ âm điện lớn nhất: ô hiện giá trị thay cho tên
    await expect(page.locator('a[data-z="9"]')).toContainText('3,98');
    await page.reload();
    await expect(page.locator('a[data-z="9"]')).toContainText('3,98');
    // Nguyên tố không có dữ liệu được đánh dấu sọc
    await expect(page.locator('a[data-z="118"]')).toHaveAttribute('data-missing', 'true');
  });

  test('phase slider changes gallium from solid to liquid', async ({ page }) => {
    await page.goto('/vi/?color=phase&t=273');
    await expect(page.locator('a[data-z="31"]')).toHaveAttribute('style', /--series-1/);
    await page.goto('/vi/?color=phase&t=310');
    const ga = page.locator('a[data-z="31"]');
    await expect(ga).toHaveAttribute('style', /--series-2/);
  });

  test('32-column layout puts lanthanum in period 6', async ({ page }) => {
    await page.goto('/vi/?layout=32');
    // React gộp gridColumn + gridRow thành grid-area: hàng / cột
    await expect(page.locator('a[data-z="57"]')).toHaveAttribute('style', /grid-area: 6 \/ 3/);
  });

  test('⌘K opens quick search and goes to the element page', async ({ page }) => {
    await page.goto('/vi/');
    await page.keyboard.press('ControlOrMeta+k');
    const box = page.getByRole('dialog').getByRole('combobox');
    await box.fill('sat');
    await expect(page.getByRole('option').first()).toContainText('Sắt');
    await box.press('Enter');
    await expect(page).toHaveURL(/\/vi\/element\/fe\/$/);
  });

  test('shift-click builds a comparison and the compare page shows radar + table', async ({
    page,
  }) => {
    await page.goto('/vi/');
    await page.locator('a[data-z="11"]').click({ modifiers: ['Shift'] });
    await page.locator('a[data-z="19"]').click({ modifiers: ['Shift'] });
    const tray = page.getByRole('region', { name: 'Khay so sánh' });
    await expect(tray).toContainText('Na');
    await tray.getByRole('link', { name: 'So sánh' }).click();
    await expect(page).toHaveURL(/compare\/\?z=11,19/);
    await expect(page.getByRole('img', { name: /Natri, Kali/ })).toBeVisible();
    await expect(page.getByRole('table')).toContainText('Độ âm điện');
  });
});

test.describe('M3: mô hình nguyên tử', () => {
  test('build the atom step by step, with rule captions and the Cr exception', async ({ page }) => {
    await page.goto('/vi/element/cr/#hoc-hoa');
    const card = page.getByRole('region', { name: 'Cấu tạo nguyên tử' });
    // Mặc định ở cấu hình cuối: Cr là ngoại lệ
    await expect(card).toContainText('Ngoại lệ');
    await expect(card).toContainText('nửa bão hoà');
    await card.getByRole('button', { name: 'Về đầu' }).click();
    await expect(card).toContainText('Bấm ▶ để điền lần lượt 24 electron');
    await card.getByRole('button', { name: 'Thêm một electron' }).click();
    await expect(card).toContainText('Electron thứ 1 vào phân lớp 1s');
    await card.getByRole('button', { name: 'Thêm một electron' }).click();
    await expect(card).toContainText('nguyên lý Pauli');
  });

  test('ion explorer removes 4s before 3d', async ({ page }) => {
    await page.goto('/vi/element/fe/#hoc-hoa');
    const card = page.getByRole('region', { name: 'Ion' });
    await card.getByRole('button', { name: 'Fe³⁺' }).click();
    await expect(card).toContainText('[Ar] 3d⁵');
  });

  test('orbital cloud loads on demand', async ({ page }) => {
    await page.goto('/vi/element/c/#hoc-hoa');
    const card = page.getByRole('region', { name: 'Hình dạng orbital' });
    await card.getByRole('button', { name: '2px', exact: true }).click();
    await card.getByRole('button', { name: /Xem đám mây 3D của 2px/ }).click();
    await expect(card.getByRole('img', { name: /orbital 2px/ })).toBeVisible();
    await expect(card.getByText('Đang tính…')).toHaveCount(0);
  });
});
