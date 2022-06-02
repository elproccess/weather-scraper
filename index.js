const webScrape = require('./webScrape');

    //const getDataLondon = await webScrape.getData("https://www.bbc.co.uk/weather/2643743");

const start = async function main(){
     const SW8 = await webScrape.getData("https://www.bbc.co.uk/weather/sw8"); 
}

if(require.main === module) {
    start();
}