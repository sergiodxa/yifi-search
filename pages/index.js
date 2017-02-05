import React, { Component } from 'react';
import api from '../utils/api';
import MovieList from '../components/movie-list';


class HomePage extends Component {
  static async getInitialProps() {
    const [
      { data: { movies: latest } },
      { data: { movies: only3D } },
      { data: { movies: best } },
      { data: { movies: downloaded } },
    ] = await Promise.all([
      api.movies.list({ limit: 50 }),
      api.movies.list({ limit: 50, quality: '3D' }),
      api.movies.list({ limit: 50, minimum_rating: 8, sort_by: 'rating' }),
      api.movies.list({ limit: 50, sort_by: 'download_count' }),
    ]);

    return { latest, only3D, best, downloaded };
  }

  state = {
    latest: this.props.latest,
    only3D: this.props.only3D,
    best: this.props.best,
    downloaded: this.props.downloaded,
  }

  render() {
    return (
      <section>
        <header>
          <h1>YIFI Search</h1>
        </header>

        {/* render the best movies */}
        <MovieList
          movies={this.state.best}
          title="Best movies"
        />
        {/* render the latest movies */}
        <MovieList
          movies={this.state.latest}
          title="Latest movies"
        />
        {/* render latest only 3D movies */}
        <MovieList
          movies={this.state.only3D}
          title="3D movies"
        />
        {/* render most downloaded movies */}
        <MovieList
          movies={this.state.downloaded}
          title="Most downloaded"
        />

        <style jsx>{`
          section {
            padding: 1.5em 0;
            margin-top: 67.81px;
          }

          header {
            background-color: rgba(0,0,0,.75);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 0 2em;
            z-index: 3;
          }
        `}</style>
      </section>
    );
  }
}


export default HomePage;
