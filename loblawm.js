const puppeteer = require('puppeteer');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
let db, Loblawsd
MongoClient.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("Loblawsd")
        Loblawsd = db.collection("Loblawsd");
    async function main() {
            var data1 = fs.readFileSync("lobkey.csv", "utf8");
            data1 = data1.split("\r\n");
            for (let i in data1) {
                data1[i] = data1[i].split(",");
            }
            //console.log(data[1]);
            for (let word of data1) {
                const browser = await puppeteer.launch({ headless: false });
                const page = await browser.newPage();
                const srpData = await getdata(page, word);
                console.log(srpData);
                Loblawsd.insertMany(srpData)
                await browser.close();
            }
        }main()
    })

async function getdata(page, word) {
    var data = fs.readFileSync("xpath.csv", "utf8");
    data = data.split("\r\n");
    for (let i in data) {
        data[i] = data[i].split(",");
    }
    //console.log(data);
   var scrapdata=[]
    await page.goto('https://www.loblaws.ca/', { waitUntil: 'networkidle2', timeout: 0 });
    let search = await page.waitForXPath('//*[@id="autocomplete-listbox-site-header-"]');
    await search.type(word);
    await page.keyboard.press('Enter');
    try {
        for (i = 0; i <= 52; i++) {
            await page.waitForXPath(data[0], { timeout: 10000 });
            let title_ele = await page.$x(data[0]);
            let title = await page.evaluate(h1 => h1.textContent, title_ele[i]);
            await page.waitForXPath(data[1], { timeout: 10000 });
            let price_ele = await page.$x(data[1]);
            let price = await page.evaluate(pr1 => pr1.textContent, price_ele[i]);
            await page.waitForXPath(data[2], { timeout: 10000 });
            let cprice_ele = await page.$x(data[2]);
            let cprice = await page.evaluate(pr1 => pr1.textContent, cprice_ele[i]);
            //console.log("title:", title, "\nprice:", price, "\ncprice:", cprice);
            scrapdata.push({
                title:title,
                price:price,
                price_c:cprice
            })
            console.log(scrapdata);
        }
    } catch (e) {
        
    }
    return scrapdata;
}

