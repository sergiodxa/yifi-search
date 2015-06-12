import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.any
  },

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>{ this.props.title }</title>
          <meta name="viewport"
            content="width=device-with,initial-scale=1.0" />
        </head>
        <body>
          { this.props.children }
        </body>
      </html>
    );
  }
});
