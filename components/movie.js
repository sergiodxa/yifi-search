import React, { Component, PropTypes } from 'react';


class Movie extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    medium_cover_image: PropTypes.string.isRequired,
    mpa_rating: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }

  state = {
    hovered: false,
  }

  handleMouseEnter = () => {
    this.timer = setTimeout(
      this.setAsHover,
      200
    );
  }

  handleMouseLeave = () => {
    clearTimeout(this.timer);
    this.setState({ hovered: false });
  }

  setAsHover = () => {
    this.setState({ hovered: true });
  }

  render() {
    return (
      <div
        className={this.state.hovered ? 'movie is-hovered' : 'movie'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          src={this.props.medium_cover_image}
        />

        <div className="box">
          <h3>
            {this.props.title}
          </h3>

          <div className="meta">
            <strong>{this.props.year}</strong>
            {' '}
            <small>{this.props.mpa_rating}</small>
            <small>{this.props.rating}</small>
          </div>

          <p>
            {this.props.summary.substr(0, 140)}
            {this.props.summary.length > 140 && '...'}
          </p>
        </div>

        <style jsx>{`
          .movie {
            box-sizing: border-box;
            font-size: 0;
            padding: 0 .125rem;
            position: relative;
            z-index: 1;
            transition: all .3s;
            cursor: pointer;
            transform-origin: center;
            transition: all .3s;
          }

          img {
            width: calc(15vw - .25rem);
          }

          .movie.is-hovered {
            z-index: 3;
            transform: scale(1.1);
          }

          .box {
            box-sizing: border-box;
            font-size: 1rem;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            background-color: rgba(0,0,0,.75);
            color: white;
            padding: 1em;
            opacity: 0;
            transition: opacity .3s;
          }

          .movie.is-hovered .box {
            opacity: 1;
          }

          h3 {
            margin: 0;
          }

          .meta {
            font-size: .8rem;
            display: flex;
            align-items: center;
          }

          .meta > small {
            border: 1px solid white;
            font-size: .75em;
            line-height: 1;
            padding: .25em;
            margin-left: .5em;
          }
        `}</style>
      </div>
    );
  }
}


export default Movie;
