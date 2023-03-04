//text to speach module
const AWS = require('aws-sdk');
//iam role name: Cognito_hackthehillersAuth_Role
//IAM role for unAuthed users: Cognito_hackthehillersUnauth_Role

AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:15774698-2acd-49b0-a73d-2f4c9ce1ecf7',
});


function getTextURL(){
    let speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: "bruh",
        TextType: "text",
        VoiceId: "Alexa"
    };
}