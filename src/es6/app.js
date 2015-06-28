import $ from 'jquery';
import app from './router.js';
import Backbone from 'backbone';
import vibrator from 'vibrator';
Backbone.$ = $;

$(document).ready(() => {
  // iniciamos la app
  app.init();
  // escuchamos el evento submit del formulario de búsqueda
  $('[action="search"]').on('submit', async function (event) {
    event.preventDefault();
    // obtenemos el término de búsqueda
    const query = this[0].value;
    // si el término de búsqueda esta vacío vamos al home
    if (!query) {
      app.navigate('/', { trigger: true });
      $(this[0]).blur();
      return;
    }
    // perdemos el foco en el input de búsqueda
    // esto es para en mobile desaparezca el teclado
    $(this[0]).blur();
    // vamos a la página de resultados de búsqueda
    app.navigate(`search/${query}?${Math.random()}`, {
      trigger: true
    });
  });
  // generamos una vibración en el dispositivo si
  // se hace click un campo del formulario
  $('.Header .Form-field').on('click', () => { vibrator(100); });
});
