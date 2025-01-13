'use strict';

/**
 * url-permantly controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::url-permantly.url-permantly', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query('api::url-permantly.url-permantly').findOne({
      where: { slug },
    });

    if (!entity) {
      return ctx.notFound('URL not found');
    }

    // ctx.send(entity);
    const composedUrl = `${entity.label}/${entity.slug}`;
    ctx.send({ ...entity, composedUrl });
  },
}));