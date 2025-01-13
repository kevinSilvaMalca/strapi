'use strict';

/**
 * url-permantly controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::url-permantly.url-permantly', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    console.log('slug', slug);
    const entity = await strapi.db.query('api::url-permantly.url-permantly').findOne({
      where: { slug },
    });

    console.log('entity', entity);

    if (!entity) {
      return ctx.notFound('URL not found');
    }

    // ctx.send(entity);
    const composedUrl = `${ctx.request.origin}/api/url-permantly/${entity.slug}`;
    ctx.send({ ...entity, composedUrl });
  },
}));