const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPadMiniLandscape = devices['iPad Mini landscape'];


/**
 * URL, user-id, passwordの設定を忘れずに。
 */
(async () => {

    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--window-size=1024,768'
        ],
        slowMo: 100
    });
    const page = await browser.newPage();
    await page.emulate(iPadMiniLandscape);
    // await page.setViewport({width: 375, height: 667});
    await page.goto('');
    await page.screenshot({path: './screenshot/pinoco-login-init.png', fullPage: true});

    await page.type('#user-id', 'hogehogesan');
    await page.type('#password', 'hogehogesan');
    await page.click('#login-btn');
    await page.waitForSelector('#authentication-error-area', {visible: true});
    await page.screenshot({path: './screenshot/pinoco-login-failure.png', fullPage: true});

    await page.$eval('#user-id', el => el.value = 'xxx');
    await page.$eval('#password', el => el.value = 'xxx');
    await page.click('#login-btn');
    // ページ遷移を待つ書き方
    await page.waitForNavigation({timeout: 60000, waitUntil: 'domcontentloaded'});
    await page.screenshot({path: './screenshot/pinoco-users-index.png', fullPage: true});

    await browser.close();
})();