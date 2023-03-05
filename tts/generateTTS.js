//tadg-o-hare@sylvan-cycle-379702.iam.gserviceaccount.com
// Import the required libraries
const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

async function convertTextToMp3(txt){
    const request = {
        input:{text:txt},
        voice:{languageCode:'en-US',ssmlGender:'MALE'},
        audioConfig:{audioEncoding:'MP3'}
    };

    const [response] = await client.synthesizeSpeech(request);

    //uncomment for making a legit mp3 file rather than a string
    // const writeFile = util.promisify(fs.writeFile); //remove the sync if issues
    // await writeFile("output.mp3",response.audioContent,'binary');

    //base 64
    const base64Audio = response.audioContent.toString('base64');

    console.log("Completed making mp3 file");
    return base64Audio;
}

module.exports = convertTextToMp3;