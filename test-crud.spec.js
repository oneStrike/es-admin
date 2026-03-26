const { test, expect } = require('@playwright/test');

test.describe('分类管理页面 CRUD 测试', () => {
  test.beforeEach(async ({ page }) => {
    // 导航到分类管理页面
    await page.goto('http://localhost:5777/content-manager/category-manager');
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');
  });

  test('1. 查询功能 - 页面加载后应显示分类列表', async ({ page }) => {
    //