import express from 'express';
import engine from 'react-engine';
import path from 'path';

const app = express();
const port = Number(process.env.PORT || 3000);

app.engine('.jsx', engine.server.create({
  reactRoutes: path.join(__dirname, 'routes/index.jsx')
}));

app.set('views', path.join(__dirname, 'node_modules/views'));
app.set('view engine', 'jsx');
app.set('view', engine.expressView);

app.get('/', (req, res) => {
  const data = {
    title: 'YIFI Search'
  };

  res.render(req.url, data);
});

app.listen(port);
