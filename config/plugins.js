const { generateQRWithLogo } = require("../src/api/generateqr/generateqr");
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "thetriplethree@innvortex.com",
        defaultReplyTo: "thetriplethree@innvortex.com",
        testAddress: "thetriplethree@innvortex.com",
      },
    },
  },
  // "qrcode-generator": {
  //   enabled: true,
  //   config: {
  //     contentTypes: [
  //       {
  //         uid: "api::generateqr.generateqr",
  //         targetField: "slug",
  //         frontend: {
  //           basePath: "/generateqrs",
  //         },
  //         generateQR: async (note) => {
  //           const logoUrl =
  //             "https://admin.thetriplethree333.com/uploads/image_1_548902308c.png";
  //           const qrWithLogo = await generateQRWithLogo(
  //             `${note.frontend.basePath}/${note.slug}`,
  //             logoUrl
  //           );
  //           return qrWithLogo;
  //         },
  //       },
  //     ],
  //   },
  // },
});
