const rgbColors = require('./rgbColors')


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

// promise detectColors
// async function detectColors() {
//   const { ImageAnnotatorClient } = require('@google-cloud/vision');
//   const client = new ImageAnnotatorClient({
//     keyFilename: 'hack-the-hill-379604-b06498d84388.json',
//   });

//   const fs = require('fs');
//   const base64String = fs.readFileSync('IMG_5390.jpeg', 'base64');

//   return new Promise((resolve, reject) => {
//     client
//       .imageProperties({ image: { content: base64String } })
//       .then(results => {
//         let colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
//         // printing each color
//         // console.log('Colors:');
//         // colors.forEach(color => console.log(color));
//         resolve(colors); // Return the colors variable
//       })
//       .catch(err => {
//         console.error('ERROR:', err);
//         reject(err); // Return the error
//       });
//   });
// }



async function detectObjects() {
  const vision = require('@google-cloud/vision');
  const fs = require('fs');
  // const base64String = fs.readFileSync('IMG_5389.jpeg', 'base64');

  // Load the service account key from a local file
  const keyPath = 'hack-the-hill-379604-b06498d84388.json';
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
  objects.forEach(object => {
    console.log(`Name: ${object.name}`);
    console.log(`Score: ${object.score}`);
    console.log(`Bounding Polygon: ${object.boundingPoly}`);
    const veritices = object.boundingPoly.normalizedVertices;
    veritices.forEach(v => console.log(`x: ${ v.x }`, `y: ${ v.y }`));
  });

  // return objects
}

async function detectTexts() {
  const vision = require('@google-cloud/vision');
  const fs = require('fs');
  // const base64String = fs.readFileSync('IMG_5389.jpeg', 'base64');

  // Load the service account key from a local file
  const keyPath = 'hack-the-hill-379604-b06498d84388.json';
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

let colorsArr;
let colorsWordsArr = [];


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

// detectObjects();
// detectTexts();


