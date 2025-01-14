'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/url-permantly',
      handler: 'url-permantly.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/url-permantly/:slug',
      handler: 'url-permantly.redirect',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
