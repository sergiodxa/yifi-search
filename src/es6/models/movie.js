import Backbone from 'backbone';
import $ from 'jquery';
import { stringify } from 'querystring';
import assign from 'object-assign';
Backbone.$ = $;

export default class MovieModel extends Backbone.Model {
  url = {
    details: 'https://yts.ag/api/v2/movie_details.json',
    suggestions: 'https://yts.ag/api/v2/movie_suggestions.json',
    reviews: 'https://yts.ag/api/v2/movie_reviews.json'
  }

  async async (method, model, options) {
    // si el método no es read tiramos un error
    if (method !== 'read') {
      throw new Error('Only read method allowed.');
    }

    // obtenemos el id de la película que se quiere obtener
    const { movie_id: movieId } = options.data;

    // nos fijamos si están en localStorage
    const cache = localStorage.getItem(movieId);

    // si está...
    if (cache) {
      // parseamos los datos en JSON
      const parsed = JSON.parse(cache);
      // agregamos los datos al modelo
      this.set(parsed);
      // devolvemos el modelo
      return this;
    }

    // definimos que queremos obtener el cast y las imágenes
    options.data.with_images = true;
    options.data.with_cast = true;

    // hacemos la petición para obtener los detalles
    // y las sugerencias de películas similares
    const requests = await* [
      fetch(`${this.url.details}?${stringify(options.data)}`),
      fetch(`${this.url.suggestions}?${stringify(options.data)}`)
    ];
    const response = await* [
      requests[0].json(),
      requests[1].json()
    ];

    // if el status da error
    if (response[0].status === 'error') {
      // tiramos un error con el mensaje de error
      throw new Error(response[0].status_message);
    }

    // obtenemos la información de la película
    const movieInfo = response[0].data;

    // obtenemos las sugerencias
    const movieSuggestions = response[1].data;

    // creamos un objeto que combine
    // la información y las sugerencias
    const data = assign({}, { ...movieInfo.movie }, movieSuggestions);

    // guardamos los datos en cache
    localStorage.setItem(movieId, JSON.stringify(data));

    // agregamos los datos al modelo
    this.set(data);

    // devolvemos el modelo
    return this;
  }
}
