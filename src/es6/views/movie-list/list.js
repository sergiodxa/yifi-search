import Backbone from 'backbone';
import ItemView from './item.js';
import $ from 'jquery';
Backbone.$ = $;

export default Backbone.View.extend({
  tagName: 'section',
  className: 'MovieList',

  render () {
    this.collection.models
    .map(model => new ItemView({ model }))
    .forEach(view => {
      view.render();
      view.$el.appendTo(this.$el);
    });

    return this;
  }
});
