import Backbone from 'backbone';
import $ from 'jquery';
import xhr from 'promised-xhr';
import assign from 'object-assign';
Backbone.$ = $;

export default Backbone.Model.extend({
  url: {
    details: 'https://yts.to/api/v2/movie_details.json',
    suggestions: 'https://yts.to/api/v2/movie_suggestions.json',
    reviews: 'https://yts.to/api/v2/movie_reviews.json'
  },

  async: async function (method, model, options) {
    try {
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
      const response = await* [
        xhr.get(this.url.details, options),
        xhr.get(this.url.suggestions, options)
      ];

      // if el status da error
      if (response[0].body.status === 'error') {
        // tiramos un error con el mensaje de error
        throw new Error(response[0].body.status_message);
      }

      // obtenemos la información de la película
      const movieInfo = response[0].body.data;

      // obtenemos las sugerencias
      const movieSuggestions = response[1].body.data;

      // creamos un objeto que combine
      // la información y las sugerencias
      const data = assign({}, movieInfo, movieSuggestions);

      // guardamos los datos en cache
      localStorage.setItem(movieId, JSON.stringify(data));

      // agregamos los datos al modelo
      this.set(data);

      // devolvemos el modelo
      return this;
    } catch (error) {
      throw error;
    }
  }
});
