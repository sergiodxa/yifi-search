import express from 'express';
import engine from 'react-engine';
import path from 'path';
import request from 'request-promise';

const app = express();
const port = Number(process.env.PORT || 3000);

app.engine('.jsx', engine.server.create({
  reactRoutes: path.join(__dirname, 'routes/index.jsx')
}));

app.set('views', path.join(__dirname, 'node_modules/views'));
app.set('view engine', 'jsx');
app.set('view', engine.expressView);

app.get('/', async function HomeController(req, res) {
  const data = {
    title: 'YIFI Search'
  };

  res.render(req.url, data);
});

app.get('/search', async function SearchController(req, res) {
  const query = req.query.query;
  const url = `https://yts.to/api/v2/list_movies.json?query_term=${query}`;

  const data = {
    title: 'YIFI Search',
    query,
    url,
    data: await request(url)
  };

  res.render(req.url, data);
});

app.listen(port);
