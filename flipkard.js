const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');
async function getdata(page, word) {
    var scrapedData = []
    await page.goto('https://www.flipkart.com/', { waitUntil: 'networkidle2', timeout: 0 });
    let search = await page.waitForXPath('//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/div/input');
    await search.type(word)
    await page.waitForSelector('#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > button');
    await page.evaluate(() => document.querySelector('#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > button').click());
    i = 2;
    while (1) {
        try {
            for (j = 1; j <= 4; j++) {
                await page.waitForXPath(`/html/body/div[1]/div/div[3]/div/div[2]/div[${i}]/div/div[${j}]/div/a[2]`, { timeout: 10000 });
                let title_ele = await page.$x(`/html/body/div[1]/div/div[3]/div/div[2]/div[${i}]/div/div[${j}]/div/a[2]`);
                let title = await page.evaluate(h1 => h1.getAttribute("title"), title_ele[0]);
                await page.waitForXPath(`//*[@id="container"]/div/div[3]/div/div[2]/div[${i}]/div/div[${j}]/div/a[3]/div/div[1]`, { timeout: 10000 });
                let price_ele = await page.$x(`//*[@id="container"]/div/div[3]/div/div[2]/div[${i}]/div/div[${j}]/div/a[3]/div/div[1]`);
                let price = await page.evaluate(pr1 => pr1.textContent, price_ele[0]);
                try {
                    await page.waitForXPath(`/html/body/div[1]/div/div[3]/div/div[2]/div[${i}]/div/div[${j}]/div/div[2]/span[1]/div`, { timeout: 10000 });
                    let rating_ele = await page.$x(`/html/body/div[1]/div/div[3]/div/div[2]/div[${i}]/div/div[${j}]/div/div[2]/span[1]/div`);
                    let rating = await page.evaluate(h1 => h1.textContent, rating_ele[0]);
                    console.log("title:", title, "\nprice:", price, "\n rating:", rating);
                    scrapedData.push({
                        Title: title,
                        Price: price,
                        Rating: rating
                    });
                } catch (e) {
                    console.log("title:", title, "\nprice:", price, "\n rating:unavailable")
                    scrapedData.push({
                        Title: title,
                        Price: price,
                        Rating: rating
                    });
                }
            }
            i += 1;
        } catch (e) {
            break;
        }

    }
    return scrapedData;
}
async function main() {
    var data = fs.readFileSync("key.csv", "utf8");
    data = data.split("\r\n");
    for (let i in data) {
        data[i] = data[i].split(",");
    }
    console.log(data);
    var finalData = [];
    for (let word of data) {
        srp_js = {};
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const srpData = await getdata(page, word);
        await browser.close();
        srp_js[word] = srpData;
        finalData.push(srp_js)
    }
    var allData = { "allData": finalData }
    fs.appendFile('Flipkart.json', JSON.stringify(allData), (err) => {
        if (err) {
            throw err;
        }
    })
} main();


