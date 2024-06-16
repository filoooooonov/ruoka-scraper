const puppeteer = require('puppeteer')
const express = require('express')
const app = express()

app.use(express.json());

let products_skaupat = {};
let products_kesko = {};


async function runSKaupatScraper(items) {
    const products = {} 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 0; i < items.length; i++) {
        const url = `https://www.s-kaupat.fi/hakutulokset?queryString=${items[i]}&sort=price%3Aasc`
        await page.goto(url)

        await page.waitForSelector('.sc-67cf5218-0')
        // Get the price of the product
        let price = await page.evaluate(() => {
            const element = document.querySelector('.sc-67cf5218-0');
            return element ? element.innerText : 'Error: element not found';
        })

        // Get the name of the product
        let name = await page.evaluate(() => {
            const element = document.querySelector('.sc-e834173a-0.Ywezr.sc-e834173a-0.Ywezr.sc-462d0cbc-1.hvnOuI');
            return element ? element.innerText : 'Error: element not found';
        })

        let imageUrl = await page.evaluate(() => {
            const element = document.querySelector('.sc-96a3776a-1.jgqcqd.sc-96a3776a-0.eamPkd');
            return element ? element.src : 'Error: element not found';
        })

        price = price.replace(/\s*\€.*$/, '');
        price = price.replace(',', '.')
        products[name] = [parseFloat(price), imageUrl]
    }
    await browser.close();
    return products;
}

async function runKeskoScraper(items) {
    console.log('RUNNING KESKO')
    const products = {} 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.k-ruoka.fi/haku?q=omena`
    await page.goto(url)
    await page.screenshot({path: 'screenshot.png '})
    await browser.close()
    console.log('FINISHED KESKO')


}


// Get the items from the grocery list
app.post("/api/items", async (req, res) => {
    items = req.body.items
    console.log('Data received from client:', items);

    try {
        const itemTitles = items.map(item => item.title);
        products_skaupat = await runSKaupatScraper(itemTitles);
        console.log('Scraped this data for products_skaupat', products_skaupat)
        
        products_kesko = runKeskoScraper('') // TODO

        // TODO Compare prices 
        res.json(products_skaupat);

    } catch (error) {
        console.log(`Error during scraping: ${error}`)
    }
})



app.listen(5000, () => { console.log('Server started on port 5000') })