import $ from 'jquery';
import Backbone from 'backbone';
import errorTemplate from '../../jade/error/index.jade';
import loader from '../../jade/loader/index.jade';
import MovieDetailView from '../views/movie-detail/detail.js';
import MovieModel from '../models/movie.js';
Backbone.$ = $;

/*
  Esta función se ejecuta al momento de entrar a la vista
  de detalle de una película
*/
export default async function movieDetail (slug, id) {
  try {
    const $app = $('#app');
    const movie = new MovieModel();

    // colocamos el loader
    $app.html(loader());

    // obtenemos los datos de la película
    const model = await movie.async('read', movie, {
      data: {
        movie_id: id
      }
    });

    // instanciamos una nueva vista con los datos del modelo
    const view = new MovieDetailView({ model });
    view.render();

    // cargamos la vista en el html de $app
    $app.html(view.el);

    // hacemos que el scroll esté arriba de todo
    $('body').scrollTop(0);
  } catch (error) {
    $('#app').html(errorTemplate(error));
  }
}
