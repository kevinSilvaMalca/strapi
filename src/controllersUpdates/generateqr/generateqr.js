const Jimp = require("jimp");
const QRCode = require("qrcode");

const generateQRWithLogo = async (text, logoPath) => {
  try {
    // Genera el código QR como base64
    const qrData = await QRCode.toDataURL(text);

    console.log(logoPath);

    // Carga el QR y el logo en Jimp
    const qrImage = await Jimp.read(Buffer.from(qrData.split(",")[1], "base64"));
    const logo = await Jimp.read(logoPath);

    // Redimensiona el logo para que sea más pequeño que el QR
    const logoMaxSize = qrImage.bitmap.width / 4;
    logo.resize(logoMaxSize, Jimp.AUTO);

    // Crear un fondo blanco para el logo
    const whiteBackground = new Jimp(logo.bitmap.width, logo.bitmap.height, 0xffffffff);
    whiteBackground.composite(logo, 0, 0);

    // Posiciona el logo en el centro del QR
    const x = qrImage.bitmap.width / 2 - whiteBackground.bitmap.width / 2;
    const y = qrImage.bitmap.height / 2 - whiteBackground.bitmap.height / 2;

    // Componer el logo sobre el QR
    qrImage.composite(whiteBackground, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1,
      opacityDest: 1,
    });

    // Devuelve el QR con el logo como base64
    return await qrImage.getBase64Async(Jimp.MIME_PNG);
  } catch (err) {
    console.error(err);
    throw new Error("Error generating QR code with logo");
  }
};

module.exports = {
  generateQRWithLogo,
};