import React from 'react';
import Router from 'react-router';
import Layout from '../layout';

export default React.createClass({
  render() {
    return (
      <Layout { ...this.props }>
        <Router.RouteHandler { ...this.props } />
      </Layout>
    );
  }
});
