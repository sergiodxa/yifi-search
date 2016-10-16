import Backbone from 'backbone';
import Movie from '../models/movie.js';
import $ from 'jquery';
import { stringify } from 'querystring';
Backbone.$ = $;


export default class Movies extends Backbone.Collection {
  url = 'https://yts.ag/api/v2/list_movies.json';

  async async (method, model, options = {}) {
    // si el método no es read tiramos un error
    if (method !== 'read') {
      throw new Error('Only read method allowed');
    }

    // hacemos la petición a la url y guardamos el cuerpo
    // de la respuesta obtenida
    const request = await fetch(`${this.url}?${stringify(options.data)}`);
    const body = await request.json();

    // si la cantidad de películas obtenidas es 0
    if (body.data.movie_count === 0) {
      // tiramos une error de que no hay resultados
      throw new Error('No results for that query term.');
    }

    // obtenemos el listado de películas
    const { movies } = body.data;

    // mapeamos el listado de películas para instanciar
    // un modelo de cada película y luego los agregamos
    // a la colección
    movies.map(movie => new Movie(movie)).forEach(movie => {
      this.add(movie);
    });

    // devolvemos la colección
    return this;
  }
}
