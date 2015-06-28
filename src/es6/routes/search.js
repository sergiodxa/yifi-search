import $ from 'jquery';
import Backbone from 'backbone';
import errorTemplate from '../../jade/error/index.jade';
import loader from '../../jade/loader/index.jade';
import MovieListView from '../views/movie-list/list.js';
import MoviesCollection from '../collections/movies';
Backbone.$ = $;

/*
  Esta función se ejecuta al momento de entrar a la vista
  de resultados de búsqueda o al home
*/
export default async function searchResultList (query_term = null) {
  try {
    const $app = $('#app');
    const movies = new MoviesCollection();

    // colocamos el loader
    $app.html(loader());

    // cuando se agreguen datos a la colección
    movies.on('add', () => {
    });

    // objeto con las opciones de la petición AJAX
    const options = {
      data: {}
    };

    // sí se esta realizando una búsqueda
    if (query_term) {
      // a las opciones de la petición se agrega
      // el término de búsqueda
      options.data.query_term = query_term;
    }

    // le pedimos a la collección que obtenga los datos
    const collection = await movies.async('read', movies, options);

    // instanciamos una nueva vista con los datos de la colección
    const view = new MovieListView({ collection });
    view.render();

    // agregamos los datos al html de $app
    $app.html(view.el);

    // hacemos que el scroll esté arriba de todo
    $('body').scrollTop(0);
  } catch (error) {
    $('#app').html(errorTemplate(error));
  }
}
