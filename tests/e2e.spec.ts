import { test, expect } from '@playwright/test';

test.describe('Pokédex E2E Tests', () => {
  test('Kịch bản 1: Hiển thị màn hình home và tìm kiếm', async ({ page }) => {
    // 1. Vào trang Home
    await page.goto('/');

    // 2. Chờ tải xong danh sách mặc định (kiểm tra Bulbasaur xuất hiện)
    await expect(page.locator('h3').filter({ hasText: 'bulbasaur' })).toBeVisible();

    // 3. Nhập từ khóa tìm kiếm
    const searchInput = page.getByPlaceholder('Tìm kiếm Pokemon theo tên hoặc ID...');
    await searchInput.fill('mew');
    
    // 4. Bấm Tìm
    await page.getByRole('button', { name: 'Tìm' }).click();

    // 5. Kiểm tra kết quả hiển thị Pokemon 'mew'
    await expect(page.locator('h3').filter({ hasText: 'mew' }).first()).toBeVisible();
    
    // Đảm bảo card bulbasaur không còn trên màn hình
    await expect(page.locator('h3').filter({ hasText: 'bulbasaur' })).not.toBeVisible();
  });

  test('Kịch bản 2: Thêm yêu thích và kiểm tra bên trang Favorites', async ({ page }) => {
    await page.goto('/');

    // Chờ bulbasaur xuất hiện (con đầu tiên)
    const bulbasaurCard = page.locator('div').filter({ hasText: /^bulbasaur#1$/ }).first();
    await expect(bulbasaurCard).toBeVisible();

    // 1. Bấm nút trái tim (nút đầu tiên trong bulbasaurCard)
    const favoriteBtn = bulbasaurCard.locator('button').first();
    await favoriteBtn.click();

    // 2. Chuyển sang trang Favorites bằng navbar
    await page.getByRole('link', { name: 'Yêu thích' }).click();
    
    // Kiểm tra URL đã đổi sang /favorites
    await expect(page).toHaveURL(/.*\/favorites/);

    // 3. Kiểm tra Pokemon bulbasaur đã xuất hiện bên trang Favorites
    await expect(page.getByText('Pokemon chưa phân nhóm')).toBeVisible();
    
    const favoriteCard = page.locator('div').filter({ hasText: /^bulbasaur#1$/ }).first();
    await expect(favoriteCard).toBeVisible();
  });
});
