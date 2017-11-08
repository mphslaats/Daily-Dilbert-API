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


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.get('/', (req, res) => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const comicTitle = $('.comic-title-name').text();
    const comicUrl = $('.img-comic').attr('src');
    res.render('index.html', {
      "title": comicTitle,
      "image": `${comicUrl}.png`
    });
  }).catch(error => res.json(error));
});


app.get('/json', (req, res) => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);
    const comicTitle = $('.comic-title-name').text();
    const comicUrl = $('.img-comic').attr('src');
    const jsonResponse = {
      "title": comicTitle,
      "image": `${comicUrl}.png`
    };
    res.json(jsonResponse);
  }).catch(error => res.json(error));
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
