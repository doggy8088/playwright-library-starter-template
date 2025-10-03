# Playwright Library Starter Template

1. 初始化專案目錄

    ```sh
    mkdir playwright-library-starter
    cd playwright-library-starter

    npm init -y
    npm install playwright@latest @playwright/browser-chromium
    ```

2. 建立初始腳本 ( `run.js` )

    ```js
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

        // 導航到指定的 URL
        await page.goto('https://example.com');

        ///////////////////////////////////////////////
        // TODO: 在這裡加入更多的自動化操作程式碼...
        ///////////////////////////////////////////////

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
    ```

3. 錄製初始爬蟲腳本

    我們可以使用 Playwright v1.54 新增的 `--user-data-dir` 選項來保留瀏覽器的完整狀態！

    ```sh
    npx playwright codegen --user-data-dir=./user-data https://example.com
    ```

    將錄製好的腳本複製回 `run.js` 即可！

4. 人工測試並驗證

    執行方式有兩種：

    ```sh
    node run.js
    ```

    或是

    ```sh
    npm test
    ```
