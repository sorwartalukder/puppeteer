const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.google.com');

    await page.waitForSelector('input[name="q"]');
    await page.type('input[name="q"]', 'Puppeteer');

    await page.keyboard.press('Enter');

    await page.waitForSelector('h3');

    const results = await page.evaluate(() => {
        let titles = Array.from(document.querySelectorAll('h3'));
        return titles.map(title => title.innerText);
    });
    console.log(results);

    await browser.close();
})();
