import $ from 'jquery';
import app from '../../router.js';
import Backbone from 'backbone';
import template from '../../../jade/movie-list/item.jade';
import vibrator from 'vibrator';
Backbone.$ = $;

export default Backbone.View.extend({
  tagName: 'article',
  className: 'MovieList-item',

  initialize () {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click [data-action="get-detail"]': 'viewDetail'
  },

  render () {
    this.$el.html(template(this.model.attributes));
    return this;
  },

  viewDetail (event) {
    if ($(event.target).data('action') === 'download') {
      return true;
    }

    vibrator(100);

    const slug = this.model.get('slug');
    const id = this.model.get('id');
    app.navigate(`detail/${slug}/${id}`, { trigger: true });
  }
});
