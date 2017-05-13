import cheerio from 'cheerio';
import request from 'request';
import express from 'express';
import parseStories from './lib/parseStories';

const app = express();

app.get('/top/:page*?', function(req, res) {
  let url = 'https://barnacl.es/top';
  request(`${url}/page/${req.params.page ? req.params.page : 1}`, function(
    error,
    response,
    html
  ) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const stories = parseStories($);

    res.send(stories);
  });
});

app.get('/recent/:page*?', function(req, res) {
  let url = 'https://barnacl.es/recent';
  request(`${url}/page/${req.params.page ? req.params.page : 1}`, function(
    error,
    response,
    html
  ) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const stories = parseStories($);

    res.send(stories);
  });
});

app.get('/:page*?', function(req, res) {
  let url = 'https://barnacl.es';
  request(`${url}/page/${req.params.page ? req.params.page : 1}`, function(
    error,
    response,
    html
  ) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const stories = parseStories($);

    res.send(stories);
  });
});

app.get('/filter/:filter/:page*?', function(req, res) {
  let url = `https://barnacl.es/t/${req.params.filter}`;
  request(`${url}/page/${req.params.page ? req.params.page : 1}`, function(
    error,
    response,
    html
  ) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const stories = parseStories($);

    res.send(stories);
  });
});

app.listen('5000');

console.log('Magic happens on port 5000');
