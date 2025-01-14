'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (!data.slug) {
      data.slug = uuidv4();
      data.urlqrpermanent = `https://qr.thetriplethree333.com/generate-qr?data=${strapi.config.server.url}/v1/url-permantly/${data.slug}`;
    }
  }
};
