import React from 'react';
import SearchForm from '../components/search-form';
// import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <main role="application" id="application">
        <header>
          <h1>YIFI Search</h1>
        </header>

        <section>
          <SearchForm />
        </section>
      </main>
    );
  }
});
