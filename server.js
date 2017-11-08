const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const nunjucks = require('nunjucks');

const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1
month = month < 10 ? `0${month}`: month;
let day = today.getDate();
day = day < 10 ? `0${day}`: day;
const date = `${year}-${month}-${day}`;
const url = `http://dilbert.com/strip/${date}`


nunjucks.configure('views', {
  autoescape: true,
  express: app
});


app.get('/', (req, res) => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const comicUrl = $('.img-comic').attr('src');
    res.render('index.html', {"today": `${comicUrl}.png`});
  }).catch(error => res.json(error));
});


app.get('/json', (req, res) => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const comicUrl = $('.img-comic').attr('src');
    res.json({"today": `${comicUrl}.png`});
  }).catch(error => res.json(error));
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
