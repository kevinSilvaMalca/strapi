const Jimp = require("jimp");
const QRCode = require("qrcode");

const generateQRWithLogo = async (text, logoPath) => {
  try {
    // Genera el código QR como base64
    const qrData = await QRCode.toDataURL(text);

    // Carga el QR y el logo en Jimp
    const qrImage = await Jimp.read(
      Buffer.from(qrData.split(",")[1], "base64")
    );
    const logo = await Jimp.read(logoPath);

    // Redimensiona el logo para que sea más pequeño que el QR
    logo.resize(qrImage.bitmap.width / 4, Jimp.AUTO);

    // Posiciona el logo en el centro del QR
    const x = qrImage.bitmap.width / 2 - logo.bitmap.width / 2;
    const y = qrImage.bitmap.height / 2 - logo.bitmap.height / 2;

    // Componer el logo sobre el QR
    qrImage.composite(logo, x, y, {
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