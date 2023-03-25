const puppeteer = require("puppeteer");
const fs = require("fs");

const scrape = async() => {

    // launches a new instance of Puppeteer and assigns it to the browser variable.
    const browser = await puppeteer.launch();

    //creates a new page in the browser and assigns it to the page variable
    const page = await browser.newPage();

    // navigates the page to the specified URL.
    await page.goto('https://www.gatesnotes.com/The-Age-of-AI-Has-Begun?WT.mc_id=20230321100000_Artificial-Intelligence_BG-TW_&WT.tsrc=BGTW')

    // uses the page.$$eval method to extract the text content of all h1 elements on the page 
    // and assigns the resulting array of strings to the h1Headings variable
    const h1Headings = await page.$$eval('h1', els => els.map(el => el.textContent))

    const mainContent = await page.$$eval('p', els => els.map(el => el.textContent))

    fs.writeFileSync("h1Headings.txt", h1Headings.join('\n'))
    fs.writeFileSync("mainContent.txt", mainContent.join('\n'))

    await browser.close();
}

scrape()