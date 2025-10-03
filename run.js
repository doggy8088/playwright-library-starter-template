// 引入 Node 內建 path 模組以處理檔案路徑
const path = require('path');

// 從 Playwright 函式庫引入 chromium 瀏覽器控制器
const { chromium } = require('playwright');

// 開始一個立即執行的非同步函式，用來執行非同步程式碼
(async () => {
  let context;
  let page;

  try {
    // 不要寫死 userDataDir 路徑;可用環境變數 USER_DATA_DIR 覆蓋,否則使用專案目錄下的 user-data
    const userDataDir = process.env.USER_DATA_DIR // 從環境變數讀取 USER_DATA_DIR
      ? path.resolve(process.env.USER_DATA_DIR)   // 如果有設定,解析為絕對路徑
      : path.resolve(process.cwd(), 'user-data'); // 否則解析專案目錄下的 'user-data' 路徑

    // 啟動一個會使用指定的 user-data-dir 的 launchPersistentContext (持久性上下文)
    context = await chromium.launchPersistentContext(userDataDir, {
      headless: false // 將 headless 設為 false,使瀏覽器以可視化模式執行
    });

    // 在上下文中建立新的分頁物件
    page = await context.newPage();

    await page.goto('https://github.com/user/repo/settings/access');

    await page.getByRole('button', { name: 'Add people' }).click();
    await page.getByRole('combobox', { name: 'Find people' }).fill('user1');
    await page.getByRole('listbox', { name: 'results' }).getByRole('strong').click();
    await page.getByRole('button', { name: 'Add user1' }).click();

  } catch (error) {
    console.error('執行過程中發生錯誤:', error);
  } finally {
    // 確保資源被釋放
    if (page) {
      await page.close(); // 呼叫 page.close() 關閉分頁 物件
    }
    if (context) {
      await context.close(); // 呼叫 context.close() 關閉整個瀏覽器上下文並釋放資源
    }
  }

})();
