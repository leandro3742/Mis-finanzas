// Importa el cliente de Vision
const fs = require('fs');
const vision = require('@google-cloud/vision');
const openAIController = require('../openAI');
// Carga las credenciales desde el archivo JSON descargado
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Asegúrate de que el formato de la clave sea correcto
  },
  projectId: process.env.GOOGLE_PROJECT_ID
});

// Función para procesar la imagen
async function analyzeImage(imageBase64) {
  try {
    // const imageBuffer = fs.readFileSync(imagePath);
    // const imageBase64 = imageBuffer.toString('base64');

    // Configura el request para Google Vision API
    const request = {
      image: { content: imageBase64 },
      features: [{ type: 'TEXT_DETECTION' }],
    };


    // Envía la solicitud a la API
    const [result] = await client.annotateImage(request);
    const detections = result.textAnnotations;

    console.log('Texto detectado:');
    const texts = detections.map((text) => text.description);
    console.log(texts[0])
    const a = await openAIController.convertTextToJSON(texts[0]);
    return a;

  } catch (error) {
    console.error('Error al analizar la imagen:', error);
    return null;
  }
}

module.exports = analyzeImage;