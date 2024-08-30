
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
  // 'qrcode-generator': {
  //   enabled: true,
  //   config: {
  //     contentTypes: [
  //       {
  //         uid: 'api::cartel.cartel',
  //         targetField: 'slug',
  //         frontend: {
  //           basePath: '/cartels',
  //         },
  //       },
  //     ],
  //   },
  // },
});