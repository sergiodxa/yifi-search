import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.String,
    children: React.PropTypes.Any
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
          <main role="application" id="application">
            { this.props.children }
          </main>
        </body>
      </html>
    );
  }
});
