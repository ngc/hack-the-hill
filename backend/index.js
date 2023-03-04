
async function newFunction() {
    const vision = require('@google-cloud/vision');
    const fs = require('fs');

    // Load the service account key from a local file
    const keyPath = 'hack-the-hill-379604-b06498d84388.json';
    const key = JSON.parse(fs.readFileSync(keyPath));

    // Authenticate with the Vision API using the service account key
    const client = new vision.ImageAnnotatorClient({
        credentials: key
    });

    // Send a request to the Vision API to detect labels in an image
    const imageUrl = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';

    client
        .imageProperties(imageUrl)
        .then(results => {
            const colors = results[0].imagePropertiesAnnotation.dominantColors.colors;
            console.log('Colors:');
            colors.forEach(color => console.log(color));
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

newFunction();