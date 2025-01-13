'use strict';

/**
 * subscription controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subscription.subscription', ({ strapi }) => ({
    async create(ctx) {
        // Llamar al método create predeterminado
        const response = await super.create(ctx);
    
        // Extraer los datos del contacto recién creado
        const subscription = response.data;
    
    
        // Configurar el correo electrónico
        const emailOptions = {
          to: subscription.attributes.email,
          from: 'admin@thetriplethree333.com', // Cambia esto por tu dirección de correo
          bcc: ['thetriplethree333ct@outlook.com', 'kevin.silva.095@gmail.com'], // Añade las direcciones de correo para las copias ocultas
          template_id: 'd-d475e4805e1f4fa4ac82633d1b9d5224', // El template ID de SendGrid
          dynamic_template_data: {
            email: subscription.attributes.email
          }
        };
    
        // Enviar el correo utilizando el servicio de email de Strapi
        try {
          await strapi.plugin('email').service('email').send(emailOptions);
          strapi.log.info('Correo enviado con éxito a', subscription.attributes.email);
        } catch (error) {
          strapi.log.error('Error al enviar el correo:', error);
        }
    
        return response;
      },
}));
