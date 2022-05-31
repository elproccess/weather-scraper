const webScrape = require('./webScrape');

    const getDataLondon =  webScrape.getData("https://www.bbc.co.uk/weather/2643743");

    const getSW8 = webScrape.getData("https://www.bbc.co.uk/weather/sw8")

function main(){
   getSW8;
}

if(require.main === module) {
    main();
}