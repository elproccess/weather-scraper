const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

scraped_quotes = [];


async function getData(){
    
    try{

        const URL = 'https://www.bbc.co.uk/weather/2643743';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(URL);
        const pageData = await page.evaluate(() => {
            return{
                html: document.documentElement.innerHTML,
            };
        });

        const $ = cheerio.load(pageData.html);
        let quote_cards = $('div.wr-day-temperature__low');

         // high temperature scrape
         quote_cards.each((index, element) => {

            londonCel = $(element).find('span.wr-value--temperature--c').text();
            londonFur = $(element).find('span.wr-value--temperature--f').text();
          
                 scraped_quotes.push({
                     'LondonCel': londonCel,
                     'LondonFur': londonFur,
                 });
             });

             console.log(scraped_quotes);
             await browser.close();  

    }catch(e){
        console.log(e);
    }
}
getData();