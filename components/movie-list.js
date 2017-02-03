import React, { PropTypes } from 'react';
import Movie from './movie';


function MovieList(props) {
  return (
    <section>
      <h2 className="title">{props.title}</h2>

      <div className="list">
        <div>
          {props.movies.map(movie =>
            <Movie key={movie.id} {...movie} />
          )}
        </div>
      </div>

      <style jsx>{`
        section {
          margin: 0 auto;
          width: 98vw;
        }

        .list {
          box-sizing: border-box;
          overflow-x: scroll;
          overflow-y: hidden;
          padding: 1.5em 0;
          width: 100%;
        }

        .list div {
          align-items: center;
          display: flex;
        }

        .title {
          font-size: 1.4vw;
          color: #999;
          font-weight: 700;
          margin: 0 1.5em .5em;
          text-decoration: none;
          display: inline-block;
          min-width: 6em;
        }
      `}</style>
    </section>
  );
}


MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape(Movie.propTypes),
  ),
};


export default MovieList;
