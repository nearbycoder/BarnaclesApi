import cheerio from 'cheerio';
import request from 'request';
import express from 'express';
import cors from 'cors';
import parseStories from './lib/parseStories';
import parseTags from './lib/parseTags';
import parseUser from './lib/parseUser';
import parseComments from './lib/parseComments';

const app = express();

app.use(cors());

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

app.get('/tags', function(req, res) {
  let url = `https://barnacl.es/filters`;
  request(url, function(error, response, html) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const tags = parseTags($);

    res.send(tags);
  });
});

app.get('/u/:userName', function(req, res) {
  let url = `https://barnacl.es/u/${req.params.userName}`;
  request(url, function(error, response, html) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const tags = parseUser($, req.params.userName);

    res.send(tags);
  });
});

app.get('/s/:id/:slug', function(req, res) {
  let url = `https://barnacl.es/s/${req.params.id}/${req.params.slug}`;
  request(url, function(error, response, html) {
    if (error) {
      return res.send({ error: true });
    }
    const $ = cheerio.load(html);

    const tags = parseComments($);

    res.send(tags);
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

app.listen('5000');

console.log('Magic happens on port 5000');
