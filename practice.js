//alerts

//const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://www.google.com/')
//   page.on('dialog', async dialog => {
//     console.log(dialog.message())
//     await dialog.dismiss()
//   })
//   await page.evaluate(() => alert('This message is inside an alert box'))
//   await browser.close()
// })()

//Download file / upload file

// const puppeteer = require('puppeteer')
// const fs = require('fs')
// const path = require('path')
// const { promisify } = require('util')

// const readFileAsync = promisify(fs.readFile)
// const writeFileAsync = promisify(fs.writeFile);
// (async () => {
//   const browser = await puppeteer.launch({headless:false})
//   const page = await browser.newPage()
//   await page.setViewport({ width: 1200, height: 800 })

//   await page.goto('https://checklyhq.com/')
//   const imageHref = await page.evaluate((sel) => {
//     return document.querySelector(sel).getAttribute('src').replace('/', '')
//   }, '.hero-image')

//   const viewSource = await page.goto('https://checklyhq.com/' + imageHref)
//   const buffer = await viewSource.buffer()
//   await writeFileAsync(path.join(__dirname, 'checkly.png'), buffer)
//   console.log('The file was saved!')

//   await readFileAsync(path.join(__dirname, 'checkly.png'))
//   console.log('The file was read!')
//   browser.close()
// })()

//emulate

// const puppeteer = require('puppeteer')
// const iPhone = puppeteer.devices['iPhone 6'];

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.emulate(iPhone)
//   await page.goto('https://google.com/')
//   await page.screenshot({
//     path: 'full.png',
//     fullPage: true
//   })
//   console.log(await page.title())
//   await browser.close()
// })()


//form value

// const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.setViewport({ width: 1280, height: 1800 })
//     await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios')

//     const checkboxStatus = await page.$eval('#defaultCheck1', input => { return input.checked })
//     console.log('Checkbox checked status:', checkboxStatus)

//     const radios = await page.$$eval('input[name="exampleRadios"]', inputs => { return inputs.map(input => input.value) })
//     console.log('Radio values:', radios)

//     await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#select-menu')

//     const selectOptions = await page.$$eval('.bd-example > select.custom-select.custom-select-lg.mb-3 > option', options => { return options.map(option => option.value) })
//     console.log(selectOptions)

//     await browser.close()
//   })()

//get list of links

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.tracing.start({
//     path: 'trace.json',
//     categories: ['devtools.timeline']
//   })
//   await page.goto('https://news.ycombinator.com/news')

//   // execute standard javascript in the context of the page.
//   const stories = await page.$$eval('a.storylink', anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
//   console.log(stories)
//   await page.tracing.stop()
//   await browser.close()
// })()

//get text value

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://news.ycombinator.com/news')
//   const name = await page.$eval('.hnname > a', el => el.innerText)
//   console.log(name)
//   await browser.close()
// })()

// get title

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://www.google.com/')
//   const title = await page.title()
//   console.log(title)
//   await browser.close()
// })()

//hover.js

// const puppeteer = require('puppeteer');
// (async () => {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto('https://soundcloud.com/')
//     await page.hover('.playableTile__artwork')
//     await page.screenshot({ path: 'hover.png' })
//     await browser.close()
//   })()

//keybord.js

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://trix-editor.org/')
//   await page.focus('trix-editor')
//   await page.keyboard.type('Just adding a title')
//   await page.screenshot({ path: 'keyboard.png' })
//   await browser.close()
// })()

const puppeteer = require('puppeteer')
  async function getPageData(url, page) {
    await page.goto(url);

    const title = await page.$eval('#titleSection h1 > span', span => span.innerText);
    const brand = await page.$eval('#poExpander > div.a-expander-content.a-expander-partial-collapse-content > div > table > tbody > tr:nth-child(3) > td.a-span9 > span', span => span.textContent);
    const rating = await page.$eval('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star.a-star-4-5 > span', span => span.textContent);
    const mrp = await page.$eval('#corePrice_desktop > div > table > tbody > tr:nth-child(1) > td.a-span12.a-color-secondary.a-size-base > span.a-price.a-text-price.a-size-base > span:nth-child(2)', span => span.textContent);
    const rate = await page.$eval('#corePrice_desktop > div > table > tbody > tr:nth-child(2) > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen', span => span.textContent);
    const imageLink = await page.$eval('#landingImage', img => img.src);
    const availability = await page.$eval('#availability > span', span => span.innerText);
    const aboutThisItem = await page.$eval('#feature-bullets > ul', li => li.textContent);


    return {
      Title: title,
      Brand: brand,
      Rating: rating,
      MRP: mrp,
      Rate: rate,
      Image_link: imageLink,
      Availability: availability,
      About_this_item: aboutThisItem
    }
  };
async function getlinks() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.amazon.in/s?k=moisturizer+for+face&crid=3LWHPNZCYFLAQ&sprefix=moi%2Caps%2C193&ref=nb_sb_ss_ts-doa-p_1_3', { waitUntil: 'networkidle2', timeout: 0 });
  const links = await page.$$eval('.a-link-normal', allAs => allAs.map(a => a.href));
  await browser.close();
  return links;
};

async function main() {
  const allLinks = await getlinks();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const scrapedData = [];

  for (let link of allLinks) {
    const data = await getPageData(link, page);
    scrapedData.push(data);
  }
  console.log(scrapedData);
} main();