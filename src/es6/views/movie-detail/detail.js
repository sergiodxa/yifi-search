import $ from 'jquery';
import app from '../../router.js';
import Backbone from 'backbone';
import template from '../../../jade/movie-detail/detail.jade';
import vibrator from 'vibrator';
Backbone.$ = $;

export default Backbone.View.extend({
  tagName: 'section',
  className: 'MovieDetail',

  initialize () {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click [data-action="get-suggestion"]': 'viewSuggestion'
  },

  render () {
    console.debug(this.model.attributes)
    this.$el.html(template(this.model.attributes));
    return this;
  },

  viewSuggestion: function viewSuggestion (event) {
    event.preventDefault();

    vibrator(100);

    const id = $(event.target).data('id');
    const slug = $(event.target).data('slug');

    app.navigate(`detail/${slug}/${id}`, { trigger: true });
  }
});
