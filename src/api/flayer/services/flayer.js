'use strict';

/**
 * flayer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flayer.flayer');
