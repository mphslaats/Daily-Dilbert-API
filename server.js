const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const nunjucks = require('nunjucks');

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1
month = month < 10 ? `0${month}`: month;
let day = today.getDate();
day = day < 10 ? `0${day}`: day;
const date = `${year}-${month}-${day}`;


nunjucks.configure('views', {
  autoescape: true,
  express: app
});


app.get('/', (req, res) => {
  res.render('index.html', { today: 'bar' });
});

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});


app.get('/json', (req, res) => {
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
