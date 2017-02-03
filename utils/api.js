import { stringify } from 'querystring';
import fetch from 'isomorphic-fetch';


const BASE_URL = 'https://yts.ag/api/v2';


const api = {
  movies: {
    list(params) {
      const url = `${BASE_URL}/list_movies.json?${stringify(params)}`;

      return fetch(url)
        .then(response => response.json());
    },
  },
};


export default api;
