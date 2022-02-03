const puppeteer = require('puppeteer');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down');
const fs = require("fs");
const csv = require('fast-csv');
async function main() {
    var scrapdata = []
    var data1 = fs.readFileSync("lobkey.csv", "utf8");
    data1 = data1.split("\r\n");
    for (let i in data1) {
        data1[i] = data1[i].split(",");
    }
    var data = fs.readFileSync("xpathcarrefo.csv", "utf8");
    data = data.split("\r\n");
    for (let i in data) {
        data[i] = data[i].split(",");
    }
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for (let word of data1) {
        await page.goto('https://www.carrefouruae.com/', { waitUntil: 'networkidle2', timeout: 0 });
        let search = await page.waitForXPath(`//input[@class="css-12uq56f"]`);
        await search.type(word);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(7000);
        await scrollPageToBottom(page);
        i = 0;
        while (1) {
            try {
                await page.waitForXPath(data[0]);
                let title_ele = await page.$x(data[0]);
                let title = await page.evaluate(h1 => h1.textContent, title_ele[i]);
                await page.waitForXPath(data[1]);
                let price_ele = await page.$x(data[1]);
                let price = await page.evaluate(pr1 => pr1.textContent, price_ele[i]);
                //console.log("Title -", title, "\nPrice -", price);
                scrapdata.push({
                    title: title,
                    price: price
                })
                i += 1
                // scrapdata.push({
                //     title:title,
                //     price:price
                // })
            } catch (e) {
                break;
            }

        }
        await browser.close();
    }
    ws = fs.createWriteStream('carrefo.csv');
    csv.write(scrapdata, { headers: true })
        .pipe(ws);
    console.log("Completed");
    await browser.close();
} main();
