'use strict';

/**
 * url-permantly controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::url-permantly.url-permantly', ({ strapi }) => ({
  // Método para encontrar todas las entidades
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::url-permantly.url-permantly', {
        populate: '*', // Popula relaciones si es necesario
      });
      ctx.send(entities); // Devuelve todas las entidades
    } catch (error) {
      console.error('Error fetching entities:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Método para encontrar una entidad por slug
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    try {
      const entity = await strapi.entityService.findMany('api::url-permantly.url-permantly', {
        filters: { slug },
        populate: { // Asegúrate de poblar el campo de archivos (media)
          file: true,
        },
      });

      if (!entity || entity.length === 0) {
        return ctx.notFound('URL not found');
      }

      const sanitizedEntity = await this.sanitizeOutput(entity[0], ctx);

      // Obtener la URL de la imagen o archivo
      let composedUrl = `${ctx.request.origin}/api/url-permantly/${sanitizedEntity.slug}`;

      // Si el archivo existe, añade la URL de la imagen
      if (sanitizedEntity.file && sanitizedEntity.file[0]) {
        const imageUrl = sanitizedEntity.file[0].url; // URL de la imagen
        composedUrl = `${ctx.request.origin}${imageUrl}`;
      }

      ctx.send({ ...sanitizedEntity, composedUrl });
    } catch (error) {
      console.error('Error fetching entity by slug:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  async redirect(ctx) {
    const { slug } = ctx.params;
    console.log('slug:', slug); // Log para verificar el slug

    try {
      const entity = await strapi.db.query('api::url-permantly.url-permantly').findOne({
        where: { slug },
      });

      console.log('entity:', entity); // Log para verificar la entidad

      if (!entity) {
        return ctx.notFound('URL not found');
      }

      // Suponiendo que la URL del archivo está almacenada en el campo `fileUrl` de la entidad
      const fileUrl = entity.fileUrl;

      if (!fileUrl) {
        return ctx.notFound('File URL not found');
      }

      // Redirigir a la URL del archivo
      ctx.redirect(fileUrl);
    } catch (error) {
      console.error('Error fetching entity:', error); // Log de errores
      ctx.throw(500, 'Internal Server Error');
    }
  },
}));
