'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::url-permantly.url-permantly', {
  config: {
    findBySlug: {
      policies: [],
      middlewares: [],
    },
  },
  routes: [
    {
      method: 'GET',
      path: '/url-permantly/:slug',
      handler: 'api::url-permantly.url-permantly.findBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
});