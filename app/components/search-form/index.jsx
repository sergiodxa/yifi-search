import React from 'react';

export default React.createClass({
  render() {
    return (
      <form action="/search" method="GET">
        <label htmlFor="query">
          Search
        </label>
        <input id="query" ref="query" placeholder="The Avengers" />
      </form>
    );
  }
});
