const puppeteer = require('puppeteer');
const fs = require('fs/promises');
(async function start () 
{
   try{
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage()
   await page.goto('https://www.nseindia.com/get-quotes/equity?symbol=SBIN',{waitUntil:'networkidle0' , timeout:0});
   await page.waitForSelector('.securityinfo');
   const lis = await page.$$('.securityinfo');
   for(i of lis)
   {
      var h =await i.$eval('h2', h2 => h2.innerText);
      var header = await i.$eval('#securityInfo thead>tr', tr => tr.innerText);
      var tbody = await i.$eval('.table-onerow tbody', tr => tr.innerText);
      console.log({h,header,tbody});
   }
   //await fs.writeFile(names.txt, h)
   await browser.close();
   }catch(e){
      console.log('error',e);
   }
})()