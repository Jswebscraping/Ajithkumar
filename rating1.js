const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const urls =['https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml',
    'https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6',
    'https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g',
    'https://www.chemistwarehouse.co.nz/buy/87293/l-oreal-serie-expert-nutrifier-shampoo-300ml','https://www.chemistwarehouse.co.nz/buy/41302/biotene-dry-mouth-relief-mouthwash-fresh-mint-470ml'
];
    for (let url of urls){
        //console.log(url);
        await page.goto(url,{waitUntil: 'networkidle2',timeout:0});
        try{
            await page.waitForXPath(`//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[2]`, { visible : true, timeout:1000});
            let ratingele = await page.$x(`//*[@id="Left-Content"]/div[3]/div[1]/div/table/tbody/tr[2]/td[2]/div[6]/div/button/div[2]`,{visible : true, timeout:1000});
            let rating = await page.evaluate(h1 => h1.textContent, ratingele[0]);
            console.log("Rating:",rating);
        }
        catch(e)
        {
            console.log("hidden");
        }
    }
    await browser.close();
}main();