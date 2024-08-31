'use strict';

/**
 * generateqr service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::generateqr.generateqr');
