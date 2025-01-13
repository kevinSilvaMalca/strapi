'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (!data.slug) {
      data.slug = uuidv4();
      data.label = `${strapi.config.server.url}/api/url-permantly/${data.slug}`;
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (!data.slug) {
      data.slug = uuidv4();
      data.label = `${strapi.config.server.url}/api/url-permantly/${data.slug}`;
    }
  },
};
