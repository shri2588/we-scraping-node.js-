var express = require('express');
var router = express.Router();


const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require("fs")
const json2csv = require("json2csv").Parser




const fetchSoftware = async (appName,desription) =>{
    const url = `https://alternativeto.net/browse/search/?p=5&q=top%20100`;



    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);


    const soft= [];
    $('div[class="col-xs-10 col-sm-10 col-md-11 col-lg-offset-1 col-lg-11"]').each((i,content)=>{
        const $content = $(content);
        const label = $content.find('h3>a*').text().trim();
        const description = $content.find('p*').text().trim();
        const label_link = $content.find('h3>a*').attr('href');
        const detail = {
            LandingPageUrl:url,
            label,
            description,
            label_link
        };

        soft.push(detail);
    });

    console.log(soft);

    const j2cp = new json2csv();
    const csv = j2cp.parse(soft);

    fs.writeFileSync("./softInfo.csv",csv,"utf-8");

    /* GET home page. */
router.get('/', function(req, res, next) {
    var mascots = soft;
    res.render('index', { data: mascots });
  });
  
  


};

fetchSoftware('','');

module.exports = router;


