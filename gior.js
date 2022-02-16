const puppeteer = require('puppeteer');
const fs = require("fs");
const csv = require('fast-csv');
async function main() {
    let scrapdata = []
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.debijenkorf.nl/giorgio-armani-beauty-acqua-di-gio-profumo-parfum-2144090001-214409000100000?query=fh_location%3D%252F%252Fcatalog01%252Fnl_NL%252F%2524s%253D214409000700000%26country%3DNL%26chl%3D1%26language%3Dnl', { waitUntil: 'networkidle2', timeout: 0 });
    try {
        // await scrollPageToBottom(page,scrollDelay = 800,);
        // await page.$x(() => document.querySelector('body > div.dbk-wrapper > section > div > div > div.container.d-flex.flex-wrap.dbk-productdetail__container > div.col-12.col-sm-5.col-lg-4.productdetail__column-container > div:nth-child(3) > div > div > div').scrollIntoView());
        await page.waitForXPath('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div', { timeout: 3000 });
        let title_ele = await page.$x('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div/div/div[1]/h1/a');
        let title = await page.evaluate(el => el.textContent, title_ele[0]);
        let brand_ele = await page.$x('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div/div/p');
        let brand = await page.evaluate(el => el.textContent, brand_ele[0]);
        let price_ele = await page.$x('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div/span[1]/span');
        let price = await page.evaluate(el => el.textContent, price_ele[0]);
        scrapdata.push({ title: title, brand: brand, price: price });

        try {
            let search = await page.waitForXPath('/html/body/div[1]/section/div/div/div[2]/div[2]/div[3]/div/div/div', { timeout: 10000 });
            await search.click();
            await page.keyboard.press('PageDown')
            await page.keyboard.press('Enter');
            await page.waitForXPath('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div', { timeout: 3000 });
            let title_ele1 = await page.$x('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div/div/div[1]/h1/a');
            let title1 = await page.evaluate(el => el.textContent, title_ele1[0]);
            let brand_ele1 = await page.$x('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div/div/p');
            let brand1 = await page.evaluate(el => el.textContent, brand_ele1[0]);
            let price_ele1 = await page.$x('/html/body/div[1]/section/div/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div/span[1]/span');
            let price1 = await page.evaluate(el => el.textContent, price_ele1[0]);
            scrapdata.push({ title: title1, brand: brand1, price: price1 });
            console.log(scrapdata);
        } catch (e) {
        }
    } catch (e) { }
    var ws = fs.createWriteStream('gior.csv');
    csv.write(scrapdata, { headers: true })
        .pipe(ws);
    console.log("Completed");
    await browser.close();
} main();