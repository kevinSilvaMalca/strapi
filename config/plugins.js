
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'thetriplethree@innvortex.com',
        defaultReplyTo: 'thetriplethree@innvortex.com',
        testAddress: 'thetriplethree@innvortex.com',
      },
    },
  },
  'qrcode-generator': {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::carta.carta',
          targetField: 'slug',
          frontend: {
            basePath: '/cartas',
          },
          options: {
            errorCorrectionLevel: 'H', // Nivel de corrección de errores (L, M, Q, H)
            type: 'image/png', // Tipo de imagen (image/png, image/jpeg, etc.)
            quality: 0.92, // Calidad de la imagen (0 a 1)
            margin: 4, // Margen alrededor del QR
            width: 200, // Ancho del QR
            color: {
              dark: '#000000', // Color oscuro del QR
              light: '#FFFFFF', // Color claro del QR
            },
            logo: {
              src: 'https://admin.thetriplethree333.com/uploads/image_1_548902308c.png', // Ruta al logo
              width: 50, // Ancho del logo
              height: 50, // Altura del logo
              excavate: true, // Excavación del fondo para el logo
            },
        },
      ],
    },
  },
});