import React from 'react';
import Router from 'react-router';
import App from '../components/app';
import Home from '../views/home';
import Search from '../views/search';

export default (
  <Router.Route path="/" handler={ App }>
    <Router.DefaultRoute name="home" handler={ Home } />
    <Router.Route name="search" handler={ Search } />
  </Router.Route>
);
