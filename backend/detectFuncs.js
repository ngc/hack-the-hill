// taking the functions from index-base64 and trying to connect with express app

async function detectColors(base64Image) {
    const { ImageAnnotatorClient } = require('@google-cloud/vision');
    const client = new ImageAnnotatorClient({
      keyFilename: 'hack-the-hill-379604-b06498d84388.json',
    });
  
    const request = {
      image: {
        content: Buffer.from(base64Image, 'base64')
      }
    };
  
    try {
      const [result] = await client.imageProperties(request);
      const colors = result.imagePropertiesAnnotation.dominantColors.colors.map(color => Object.values(color.color));
      console.log('Colors:', colors);
      return colors;
    } catch (err) {
      console.error('ERROR:', err);
      return null;
    }
  }

  module.exports = { detectColors }