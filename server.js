const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');


app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/today', (req, res) => {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1
  month = month < 10 ? `0${month}`: month;
  let day = today.getDate();
  day = day < 10 ? `0${day}`: day;
  var date = `${year}-${month}-${day}`;
  var url = `http://dilbert.com/strip/${date}`
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const comicUrl = $('.img-comic').attr('src');
    res.json({"today": `${comicUrl}.png`});
  });
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
