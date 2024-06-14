const puppeteer = require('puppeteer')
const express = require('express')
const app = express()

app.use(express.json());


// Get the items from the grocery list
app.post("/api/items", (req, res) => {
    res.json({"message": "items submitted"})
    runSKaupatScraper('')

    console.log("body", req.body)
})


async function runSKaupatScraper(items) {
    const url = "https://www.s-kaupat.fi/hakutulokset?queryString=banaani&sort=price%3Aasc" // for "banaani" only, need to loop through req.body

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)
    console.log('goto')
    await page.screenshot({path: "screenshot.png"});
    browser.close();
}
    


// Send the scraped data back to the client
app.get("/api", (req, res) => {
    res.json({"items": ['some data']})
})


app.listen(5000, () => { console.log('Server started on port 5000') })