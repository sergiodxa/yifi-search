import React, { Component, PropTypes } from 'react';
import Movie from './movie';


class MovieList extends Component {
  state = {
    page: 0,
  };

  handleNextPage = () => {
    const newPage = this.state.page + 1;
    if (newPage >= this.totalPages) {
      return this.setState({ page: 0 });
    }
    if (newPage >= this.totalPages - 1) {
      return this.setState({ page: this.totalPages - 1 });
    }
    return this.setState({ page: newPage });
  }

  handlePrevPage = () => {
    const newPage = this.state.page - 1;
    if (newPage <= -1) {
      return this.setState({ page: this.totalPages - 1 });
    }
    if (newPage <= 0) {
      return this.setState({ page: 0 });
    }
    return this.setState({ page: newPage });
  }

  styles = () => {
    if (this.state.page === 0) {
      return {
        transform: `translateX(0)`,
      };
    }
    return {
      transform: `translateX(-${this.state.page * 90}vw)`,
    };
  }

  get totalPages() {
    return this.props.movies.length / 6;
  }


  render() {
    const { props, state } = this;
    const style = this.styles();

    return (
      <section>
        <h2 className="title">{props.title}</h2>

        <div className="list">
          <button className="prev" onClick={this.handlePrevPage}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </button>

          <div className="list-items">
            <div style={style}>
              {props.movies.map(movie =>
                <Movie key={movie.id} {...movie} />
              )}
            </div>
          </div>

          <button className="next" onClick={this.handleNextPage}>
            <i className="fa fa-angle-right" aria-hidden="true" />
          </button>
        </div>

        <style jsx>{`
          .list {
            display: flex;
            width: 100vw;
          }

          .list-items {
            box-sizing: border-box;
            padding: 1.5em 0;
            position: relative;
            width: 90vw;
            overflow-x: hidden;
            overflow-y: hidden;
          }

          .list-items div {
            align-items: center;
            display: flex;
            transition: transform .3s;
            width: 90vw;
          }

          .title {
            font-size: 1.4vw;
            color: #999;
            font-weight: 700;
            margin: 0 1.5em .5em;
            text-decoration: none;
            display: inline-block;
            min-width: 15vw;
          }

          .prev,
          .next {
            background-color: rgba(0,0,0,.5);
            color: white;
            text-align: center;
            border: none;
            width: 5vw;
            font-size: 3rem;
            text-transform: uppercase;
            outline: none;
            z-index: 2;
            cursor: pointer;
            padding: 0;
            margin: 1.5rem 0;
          }
        `}</style>
      </section>
    );
  }
}


MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape(Movie.propTypes),
  ),
};


export default MovieList;
