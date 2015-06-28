import $ from 'jquery';
import Backbone from 'backbone';
import searchResultsRoute from './routes/search.js';
import movieDetailRoute from './routes/detail.js';
Backbone.$ = $;

const Router = Backbone.Router.extend({
  // rutas de la app
  routes: {
    '': 'searchResultsRoute',
    'search/:query': 'searchResultsRoute',
    'detail/:slug/:id': 'movieDetailRoute'
  },

  // métodos a ejecutas dependiendo de la ruta
  searchResultsRoute,
  movieDetailRoute,

  init () {
    // método para iniciar la aplicación y que empiece
    // a escuchar el cambio de rutas
    Backbone.history.start();
  }
});

export default new Router();
