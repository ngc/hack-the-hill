const rgbColors = require('./rgbColors')
const sharp = require('sharp')
const sizeOf = require('image-size')
const path = require('path');



const keyPath = 'hack-the-hill-379604-b06498d84388.json';

function fetch_photo() {
  fetch('http://example.com/image', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      const base64Image = data.image; // assuming the response JSON contains a key called "image" that contains the base64-encoded image data
      const image = new Image();
      image.src = `data:image/jpeg;base64,${base64Image}`;
      document.body.appendChild(image); // display the image on the web page
    })
    .catch(error => console.error(error));
}
// detectColors
async function detectColors() {
  const { ImageAnnotatorClient } = require('@google-cloud/vision');
  const client = new ImageAnnotatorClient({
    keyFilename: 'hack-the-hill-379604-b06498d84388.json',
  });


  const fs = require('fs');
  const base64String = fs.readFileSync('IMG_5390.jpeg', 'base64');

  client
    .imageProperties({ image: { content: base64String } })
    .then(results => {
      let colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
      console.log('Colors:');
      colors.forEach(color => console.log(color));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

// takes an image parameter, used in detectObjects
async function detectColors(base64Image) {
  const { ImageAnnotatorClient } = require('@google-cloud/vision');
  const client = new ImageAnnotatorClient({
    keyFilename: 'hack-the-hill-379604-b06498d84388.json',
  });

  client
    .imageProperties({ image: { content: base64Image } })
    .then(results => {
      let colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
      console.log('Colors:');
      colors.forEach(color => console.log(color));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

    
}

// async function detectObjects() {
//   const vision = require('@google-cloud/vision');
//   const fs = require('fs');
//   // const base64String = fs.readFileSync('IMG_5389.jpeg', 'base64');

//   // Load the service account key from a local file
//   const keyPath = 'hack-the-hill-379604-b06498d84388.json';
//   const key = JSON.parse(fs.readFileSync(keyPath));

//   // Authenticate with the Vision API using the service account key
//   const client = new vision.ImageAnnotatorClient({
//     credentials: key
//   });

//   // Send a request to the Vision API to detect objects in an image
//   const imageUrl = 'https://media.discordapp.net/attachments/1081420412686188576/1081653688579411998/IMG_5390.jpg?width=702&height=936';
//   const [result] = await client.objectLocalization(imageUrl);
//   const objects = result.localizedObjectAnnotations;
//   console.log('Objects:');
//   objects.forEach(object => {
//     console.log(`Name: ${object.name}`);
//     console.log(`Score: ${object.score}`);
//     console.log(`Bounding Polygon: ${object.boundingPoly}`);
//     const veritices = object.boundingPoly.normalizedVertices;
//     veritices.forEach(v => console.log(`x: ${ v.x }`, `y: ${ v.y }`));
//   });

//   // return objects
// }

// copies vertices onto array
async function detectObjects() {
  const vision = require('@google-cloud/vision');
  const fs = require('fs');

  // Load the service account key from a local file
  // const keyPath = 'hack-the-hill-379604-b06498d84388.json';
  const key = JSON.parse(fs.readFileSync(keyPath));

  // Authenticate with the Vision API using the service account key
  const client = new vision.ImageAnnotatorClient({
    credentials: key
  });

  // Send a request to the Vision API to detect objects in an image
  const imageUrl = 'https://media.discordapp.net/attachments/1081420412686188576/1081653688579411998/IMG_5390.jpg?width=702&height=936';
  const [result] = await client.objectLocalization(imageUrl);
  const objects = result.localizedObjectAnnotations;
  console.log('Objects:');

  const verticesArray = []; // create an empty array to store the vertices

  const dimensions = sizeOf('/Users/myko/Desktop/hack-the-hill/backend/IMG_5390.jpeg')
  const imagePath = path.join(__dirname, 'IMG_5390.jpeg');

  console.log("DIMENSIONS")
  console.log(dimensions.width, dimensions.height)

  objects.forEach(object => {
    console.log(`Name: ${object.name}`);
    console.log(`Score: ${object.score}`);
    console.log(`Bounding Polygon: ${object.boundingPoly}`);
    const vertices = object.boundingPoly.normalizedVertices;
    // verticesArray.push(vertices); // push the vertices into the array
    vertices.forEach(v => console.log(`x: ${ v.x }`, `y: ${ v.y }`));
    console.log(vertices)
    console.log(Math.floor(vertices[0].x * dimensions.width), Math.floor(vertices[0].y * dimensions.height), Math.floor(vertices[2].x * dimensions.width), Math.floor(vertices[2].y * dimensions.height))
    detectColorsInBox(imagePath, Math.floor(vertices[0].x * dimensions.width), Math.floor(vertices[0].y * dimensions.height), Math.floor(vertices[2].x * dimensions.width), Math.floor(vertices[2].y * dimensions.height),key)
  });

  return 7; // return the array of vertices
}


async function detectTexts() {
  const vision = require('@google-cloud/vision');
  const fs = require('fs');
  // const base64String = fs.readFileSync('IMG_5389.jpeg', 'base64');

  // Load the service account key from a local file
  // const keyPath = 'hack-the-hill-379604-b06498d84388.json';
  const key = JSON.parse(fs.readFileSync(keyPath));

  // Authenticate with the Vision API using the service account key
  const client = new vision.ImageAnnotatorClient({
    credentials: key
  });

  // Send a request to the Vision API to detect objects in an image
  const imageUrl = 'https://media.discordapp.net/attachments/1081420412686188576/1081653688579411998/IMG_5390.jpg?width=702&height=936';
  const [result] = await client.textDetection(imageUrl);
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach(text => console.log(text));;

  // return textAnnotations
}

async function detectColorsInBox(imageUrl, x1, y1, x2, y2, key) {
  const vision = require('@google-cloud/vision');
  const sharp = require('sharp');

  // Load the service account key from a local file
  // const keyPath = 'hack-the-hill-379604-b06498d84388.json';
  // const key = require(keyPath);

  // Authenticate with the Vision API using the service account key
  const client = new vision.ImageAnnotatorClient({
    credentials: key
  });

  // Crop the image to the specified bounding box
  const image = await sharp(imageUrl)
    .extract({ left:  Math.abs(x1), top: Math.abs(y1), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1 )})
    .toBuffer();

  // Call detectColors with the cropped image
  const colors = await detectColors(image);
  console.log(`Colors in box (${x1}, ${y1}) - (${x2}, ${y2}):`, colors);
  // return colors;
}

// let colorsArr;
// let colorsWordsArr = [];
// dont think i need this...
// detectColors().then(colors => {
//   colorsArr = colors;
//   console.log('colorsArr is')
//   console.log(colorsArr)

//   colorsWordsArr = colorsArr.map(color => [
//     color.color.red,
//     color.color.green,
//     color.color.blue
//   ])

//   console.log('colorsWordsArr is')
//   console.log(colorsWordsArr)

// });
// let vertices = []
// detectObjects().then(data => {

//   vertices = data;

//   console.log("VERTICES IS")
//   console.log(vertices)
// })

// detectTexts();

async function run() {
  try {
    const vertices = await detectObjects();

    console.log(vertices)
  } catch (err) {
    console.log(err)
  }
}

run();

