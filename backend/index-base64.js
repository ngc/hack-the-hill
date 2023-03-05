// const rgbColors = require('./rgbColors')
// import { colorsArr } from './rgbColors';
// const { colorsArr } = require('./rgbColors');
const sharp = require('sharp');
const sizeOf = require('image-size');
const path = require('path');

const colorsArr = {
  maroon: [128, 0, 0],
  'dark red': [139, 0, 0],
  brown: [165, 42, 42],
  firebrick: [178, 34, 34],
  crimson: [220, 20, 60],
  red: [255, 0, 0],
  tomato: [255, 99, 71],
  coral: [255, 127, 80],
  'indian red': [205, 92, 92],
  'light coral': [240, 128, 128],
  'dark salmon': [233, 150, 122],
  salmon: [250, 128, 114],
  'light salmon': [255, 160, 122],
  'orange red': [255, 69, 0],
  'dark orange': [255, 140, 0],
  orange: [255, 165, 0],
  gold: [255, 215, 0],
  'dark golden rod': [184, 134, 11],
  'golden rod': [218, 165, 32],
  'pale golden rod': [238, 232, 170],
  'dark khaki': [189, 183, 107],
  khaki: [240, 230, 140],
  olive: [128, 128, 0],
  yellow: [255, 255, 0],
  'yellow green': [154, 205, 50],
  'dark olive green': [85, 107, 47],
  'olive drab': [107, 142, 35],
  'lawn green': [124, 252, 0],
  chartreuse: [127, 255, 0],
  'green yellow': [173, 255, 47],
  'dark green': [0, 100, 0],
  green: [0, 128, 0],
  'forest green': [34, 139, 34],
  lime: [0, 255, 0],
  'lime green': [50, 205, 50],
  'light green': [144, 238, 144],
  'pale green': [152, 251, 152],
  'dark sea green': [143, 188, 143],
  'medium spring green': [0, 250, 154],
  'spring green': [0, 255, 127],
  'sea green': [46, 139, 87],
  'medium aqua marine': [102, 205, 170],
  'medium sea green': [60, 179, 113],
  'light sea green': [32, 178, 170],
  'dark slate gray': [47, 79, 79],
  teal: [0, 128, 128],
  'dark cyan': [0, 139, 139],
  'medium violet red': [199, 21, 133],
  'pale violet red': [219, 112, 147],
  'deep pink': [255, 20, 147],
  'hot pink': [255, 105, 180],
  'light pink': [255, 182, 193],
  pink: [255, 192, 203],
  'antique white': [250, 235, 215],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  'blanched almond': [255, 235, 205],
  wheat: [245, 222, 179],
  'corn silk': [255, 248, 220],
  'lemon chiffon': [255, 250, 205],
  'light golden rod yellow': [250, 250, 210],
  'light yellow': [255, 255, 224],
  'saddle brown': [139, 69, 19],
  sienna: [160, 82, 45],
  chocolate: [210, 105, 30],
  peru: [205, 133, 63],
  'sandy brown': [244, 164, 96],
  'burly wood': [222, 184, 135],
  tan: [210, 180, 140],
  'rosy brown': [188, 143, 143],
  moccasin: [255, 228, 181],
  'navajo white': [255, 222, 173],
  'peach puff': [255, 218, 185],
  'misty rose': [255, 228, 225],
  'lavender blush': [255, 240, 245],
  linen: [250, 240, 230],
  'old lace': [253, 245, 230],
  'papaya whip': [255, 239, 213],
  'sea shell': [255, 245, 238],
  'mint cream': [245, 255, 250],
  'slate gray': [112, 128, 144],
  'light slate gray': [119, 136, 153],
  'light steel blue': [176, 196, 222],
  lavender: [230, 230, 250],
  'floral white': [255, 250, 240],
  'alice blue': [240, 248, 255],
  'ghost white': [248, 248, 255],
  honeydew: [240, 255, 240],
  ivory: [255, 255, 240],
  azure: [240, 255, 255],
  snow: [255, 250, 250],
  black: [0, 0, 0],
  'dim gray / dim grey': [105, 105, 105],
  'gray / grey': [128, 128, 128],
  'dark gray / dark grey': [169, 169, 169],
  silver: [192, 192, 192],
  'light gray / light grey': [211, 211, 211],
  gainsboro: [220, 220, 220],
  'white smoke': [245, 245, 245],
  white: [255, 255, 255],
  'midnight blue': [25, 25, 112],
};

const keyPath = 'hack-the-hill-379604-b06498d84388.json';

// find the nearest color
function nearestColor(colors, color) {
  let closestColor = null;
  let closestDistance = Infinity;

  for (let [key, value] of Object.entries(colors)) {
    let distance = Math.sqrt(
      (color[0] - value[0]) ** 2 +
        (color[1] - value[1]) ** 2 +
        (color[2] - value[2]) ** 2
    );

    if (distance < closestDistance) {
      closestColor = key;
      closestDistance = distance;
    }
  }
  console.log(closestColor);
  return closestColor;
}

function fetch_photo() {
  fetch('http://example.com/image', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const base64Image = data.image; // assuming the response JSON contains a key called "image" that contains the base64-encoded image data
      const image = new Image();
      image.src = `data:image/jpeg;base64,${base64Image}`;
      document.body.appendChild(image); // display the image on the web page
    })
    .catch((error) => console.error(error));
}
// detectColors
// async function detectColors() {
//   const { ImageAnnotatorClient } = require('@google-cloud/vision');
//   const client = new ImageAnnotatorClient({
//     keyFilename: 'hack-the-hill-379604-b06498d84388.json',
//   });

//   const fs = require('fs');
//   const base64String = fs.readFileSync('IMG_5390.jpeg', 'base64');

//   client
//     .imageProperties({ image: { content: base64String } })
//     .then(results => {
//       let colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
//       console.log('Colors:');
//       colors.forEach(color => console.log(color));
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
// }

// takes an image parameter, used in detectObjects
// async function detectColors(base64Image) {
//   const { ImageAnnotatorClient } = require('@google-cloud/vision');
//   const client = new ImageAnnotatorClient({
//     keyFilename: 'hack-the-hill-379604-b06498d84388.json',
//   });

//   client
//     .imageProperties({ image: { content: base64Image } })
//     .then((results) => {
//       let colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
//       // console.log('COLORS IS:');
//       // sort the colors from highest fraction to lowest fraction
//       colors.sort((a, b) => b.pixelFraction - a.pixelFraction);
//       // console.log(colors)

//       // grab rgb values [x,x,x]
//       let colorsWordsArr = [];
//       colorsWordsArr = colors.map((color) => [
//         color.color.red,
//         color.color.green,
//         color.color.blue,
//       ]);
//       // colorsWordsArr.forEach(color => console.log(color));

//       let firstThreeColors = colorsWordsArr.slice(0, 3);
//       console.log('FIRST THREE COLORS');
//       console.log(firstThreeColors);

//       // console.log(
//       //   'WTF IS GOING ON ' + nearestColor(colorsArr, firstThreeColors[0])
//       // );
//       // let firstThreeWords = []
//       // for (let i = 0; i < 3; i ++) {
//       //   nearestColor(colorsArr, firstThreeColors[i])
//       // }
//     })
//     .catch((err) => {
//       console.error('ERROR:', err);
//     });
// }

// using promise
async function detectColors(base64Image) {
  return new Promise((resolve, reject) => {
    const { ImageAnnotatorClient } = require('@google-cloud/vision');
    const client = new ImageAnnotatorClient({
      keyFilename: 'hack-the-hill-379604-b06498d84388.json',
    });

    client
      .imageProperties({ image: { content: base64Image } })
      .then((results) => {
        let colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
        console.log('COLORS IS:');
        colors.sort((a, b) => b.pixelFraction - a.pixelFraction);

        let colorsWordsArr = [];
        colorsWordsArr = colors.map((color) => [
          color.color.red,
          color.color.green,
          color.color.blue,
        ]);

        let firstThreeColors = colorsWordsArr.slice(0, 3);
        console.log('FIRST THREE COLORS');
        console.log(firstThreeColors);

        let firstThreeWords = [];
        for (let i = 0; i < 3; i++) {
          let word = nearestColor(colorsArr, firstThreeColors[i]);
          firstThreeWords.push(word);
        }

        resolve(firstThreeWords);
      })
      .catch((err) => {
        console.error('ERROR:', err);
        reject(err);
      });
  });
}

// copies vertices onto array
// async function detectObjects() {
//   const vision = require('@google-cloud/vision');
//   const fs = require('fs');

//   // Load the service account key from a local file
//   // const keyPath = 'hack-the-hill-379604-b06498d84388.json';
//   const key = JSON.parse(fs.readFileSync(keyPath));

//   // Authenticate with the Vision API using the service account key
//   const client = new vision.ImageAnnotatorClient({
//     credentials: key,
//   });

//   // Send a request to the Vision API to detect objects in an image

//   //kettcorn pic
//   //https://media.discordapp.net/attachments/1081420412686188576/1081827158315515955/IMG_2735.jpg?width=999&height=1331

//   const imageUrl =
//     'https://media.discordapp.net/attachments/1081420412686188576/1081653688864612433/IMG_5391.jpg?width=999&height=1331';
//   const [result] = await client.objectLocalization(imageUrl);
//   const objects = result.localizedObjectAnnotations;
//   console.log('Objects:');

//   const verticesArray = []; // create an empty array to store the vertices

//   const dimensions = sizeOf(
//     '/Users/myko/Desktop/hack-the-hill/backend/IMG_5391.jpeg'
//   );
//   const imagePath = path.join(__dirname, 'IMG_5391.jpeg');

//   // console.log("DIMENSIONS")
//   // console.log(dimensions.width, dimensions.height)

//   objects.forEach((object) => {
//     console.log(`Name: ${object.name}`);
//     // console.log(`Score: ${object.score}`);
//     // console.log(`Bounding Polygon: ${object.boundingPoly}`);
//     const vertices = object.boundingPoly.normalizedVertices;
//     // verticesArray.push(vertices); // push the vertices into the array
//     vertices.forEach((v) => console.log(`x: ${v.x}`, `y: ${v.y}`));
//     // console.log(vertices)
//     // console.log(Math.floor(vertices[0].x * dimensions.width), Math.floor(vertices[0].y * dimensions.height), Math.floor(vertices[2].x * dimensions.width), Math.floor(vertices[2].y * dimensions.height))

//     // helper method that takes the objects from the original photo and finds the main colors of the sub objects
//     detectColorsInBox(
//       imagePath,
//       Math.floor(vertices[0].x * dimensions.width),
//       Math.floor(vertices[0].y * dimensions.height),
//       Math.floor(vertices[2].x * dimensions.width),
//       Math.floor(vertices[2].y * dimensions.height),
//       key
//     );
//   });

//   return 7; // return the array of vertices
// }

// DETECT OBJECTS WITH BASE64STRING
async function detectObjects(base64String) {
  const vision = require('@google-cloud/vision');
  const fs = require('fs');
  const sharp = require('sharp');

  // Load the service account key from a local file
  const keyPath = 'hack-the-hill-379604-b06498d84388.json';
  const key = JSON.parse(fs.readFileSync(keyPath));

  // Authenticate with the Vision API using the service account key
  const client = new vision.ImageAnnotatorClient({
    credentials: key,
  });

  // Send a request to the Vision API to detect objects in an image
  const buffer = Buffer.from(base64String, 'base64');

  const [result] = await client.objectLocalization({
    image: { content: buffer },
  });
  const objects = result.localizedObjectAnnotations;
  console.log('Objects:');

  // Get the width and height of the image
  const { width, height } = await sharp(buffer).metadata();

  let objectData = await Promise.all(objects.map(async (object) => {
    console.log(`Name: ${object.name}`);
    const vertices = object.boundingPoly.normalizedVertices;
    vertices.forEach((v) => console.log(`x: ${v.x}`, `y: ${v.y}`));

    // helper method that takes the objects from the original photo and finds the main colors of the sub objects

    let subObject = {}
    let topColors = await detectColorsInBox(buffer,
      Math.floor(vertices[0].x * width),
      Math.floor(vertices[0].y * height),
      Math.floor(vertices[2].x * width),
      Math.floor(vertices[2].y * height),
      key
    );
    
    let words = await detectTextsInBox(buffer,
      Math.floor(vertices[0].x * width),
      Math.floor(vertices[0].y * height),
      Math.floor(vertices[2].x * width),
      Math.floor(vertices[2].y * height),
      key
    );

    subObject.topColors = topColors
    subObject.words = words
    // console.log(JSON.stringify(subObject))
    return subObject;
  }));
  
  return JSON.stringify(objectData); // return the array of objects as a JSON string
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
    credentials: key,
  });

  // Send a request to the Vision API to detect objects in an image
  const imageUrl =
    'https://media.discordapp.net/attachments/1081420412686188576/1081653688864612433/IMG_5391.jpg?width=999&height=1331';
  const [result] = await client.textDetection(imageUrl);
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach((text) => console.log(text));

  // return textAnnotations
}

// DETECT TEXT BUT TAKES PARAMETERS
async function detectTextsInBox(base64Image, x1, y1, x2, y2, key) {
  const vision = require('@google-cloud/vision');
  const sharp = require('sharp');

  // Load the service account key from a local file
  // const keyPath = 'hack-the-hill-379604-b06498d84388.json';
  // const key = require(keyPath);

  // Authenticate with the Vision API using the service account key
  const client = new vision.ImageAnnotatorClient({
    credentials: key,
  });

  // Crop the image to the specified bounding box
  const image = await sharp(Buffer.from(base64Image, 'base64'))
    .extract({
      left: Math.abs(x1),
      top: Math.abs(y1),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    })
    .toBuffer();

  // Call textDetection with the cropped image
  const [result] = await client.textDetection(Buffer.from(image));
  const detections = result.textAnnotations;
  console.log('Text:');
  let textArr = [];
  detections.forEach((text) => {
    //console.log(text.description)
    textArr.push(text.description)
  });

  return textArr
}

async function detectColorsInBox(base64Image, x1, y1, x2, y2, key) {
  const vision = require('@google-cloud/vision');
  const sharp = require('sharp');

  // Load the service account key from a local file
  // const keyPath = 'hack-the-hill-379604-b06498d84388.json';
  // const key = require(keyPath);

  // Authenticate with the Vision API using the service account key
  const client = new vision.ImageAnnotatorClient({
    credentials: key,
  });

  // Crop the image to the specified bounding box
  const image = await sharp(base64Image)
    .extract({
      left: Math.abs(x1),
      top: Math.abs(y1),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    })
    .toBuffer();

  // Call detectColors with the cropped image
  const colors = await detectColors(image);
  console.log(`Colors in box (${x1}, ${y1}) - (${x2}, ${y2}):`, colors);

  // returns the array of the top 3 colors
  return colors;
}

// let colorsArr;
let colorsWordsArr = [];

async function run() {
  try {
    const fs = require('fs');
    const base64String = fs.readFileSync(
      '/Users/myko/Desktop/hack-the-hill/backend/redbull.jpg',
      'base64'
    );

    const objectData = await detectObjects(base64String);

    console.log("ALL SUB OBJECT DATA")
    console.log(objectData)
    // Promise.all(objectData).then((values) => {
    //   console.log(values)
    // })
    // detectTexts();

  } catch (err) {
    console.log(err);
  }
}

run();
