const puppeteer = require('puppeteer');
const request = require("request");
const fs = require('fs');
const result = [];
request({
  url: 'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
   json: true
  },(err, response, body) => {
    console.log(body);
    result.push(body);
    fs.appendFile('usadata.json', JSON.stringify(result), (err) =>{
      if(err){
        throw err;
      }
    })
  });