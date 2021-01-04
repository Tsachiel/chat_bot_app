const dialogflow = require("dialogflow");
const uuid = require("uuid");
const config = require('../config/dev')

//
const projectId = config.googleProjectID 
const sessionId = config.dialogFlowSessionID


const sessionClient = new dialogflow.SessionsClient({
  keyFilename: '../my-final-project-295412-d17340badc14.json'
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);



exports.getTextResponse = async function (textReq) {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: textReq,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    
    return result
  
};
