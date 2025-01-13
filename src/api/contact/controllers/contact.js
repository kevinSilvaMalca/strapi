'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async create(ctx) {
    // Llamar al método create predeterminado
    const response = await super.create(ctx);

    // Extraer los datos del contacto recién creado
    const contact = response.data;

    const dateObj = new Date(contact.attributes.date);
    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

    // Configurar el correo electrónico
    const emailOptions = {
      to: contact.attributes.email,
      from: 'admin@thetriplethree333.com', // Cambia esto por tu dirección de correo
      bcc: ['thetriplethree333ct@outlook.com', 'kevin.silva.095@gmail.com'], // Añade las direcciones de correo para las copias ocultas
      template_id: 'd-10696c49bef845fabeca7c1bd13db33f', // El template ID de SendGrid
      dynamic_template_data: {
        name: contact.attributes.name,
        email: contact.attributes.email,
        phone: contact.attributes.phone,
        numberOfPeople: contact.attributes.numberOfPeople,
        date: formattedDate,
      }
    };

    // Enviar el correo utilizando el servicio de email de Strapi
    try {
      await strapi.plugin('email').service('email').send(emailOptions);
      strapi.log.info('Correo enviado con éxito a', contact.attributes.email);
    } catch (error) {
      strapi.log.error('Error al enviar el correo:', error);
    }

    return response;
  },
}));