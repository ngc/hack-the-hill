//text to speach module
const AWS = require('aws-sdk');
//iam role name: Cognito_hackthehillersAuth_Role
//IAM role for unAuthed users: Cognito_hackthehillersUnauth_Role


//some config stuff
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:15774698-2acd-49b0-a73d-2f4c9ce1ecf7',
});

//function to be exported
function getTextURL(txt){
    let speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: txt,
        TextType: "text",
        VoiceId: "Alexa"
    };

    let polly = new AWS.Polly({apiVersion: '2023-02-07'});
    var signer = new AWS.Polly.Presigner(speechParams,polly);

    signer.getSynthesizeSpeechUrl(speechParams, function(err,url){
        if(err){ 
            console.log("Something went wrong with the URL request in tts module.");
            return null; 
        }
        else {
            return url;
        }
    });
}

console.log(getTextURL("NATAN YOU RUIN EVERYTHING!!!!"));

module.exports = getTextURL;