const dialogFlowAPi_DAL = require("../DAL/dialogFLowApi_DAL");
const fireBase_DAL = require("../DAL/fireBase_DAL");
const selenium_MODEL = require("./selenium_MODEL");
exports.getDataFromDialogFlow = async (text) => {
  const dataFromDialogFlow_DAL = await dialogFlowAPi_DAL.getTextResponse(text);
  //Getting the detected intent name from the RESPONSE that comes from the DIALOGFLOW API DAL
  let intentName = dataFromDialogFlow_DAL.intent.displayName;
  //
  //Going over all the Intents and pulling DATA from client to fireBase DAL
  switch (intentName) {
    case "whichCity": {
      let city =
        dataFromDialogFlow_DAL.outputContexts[0].parameters.fields.city
          .stringValue;
      await fireBase_DAL.sendData("city", city);
      break;
    }
    case "guests": {
      let numberOfGuests =
        dataFromDialogFlow_DAL.parameters.fields.number.numberValue;
      if (numberOfGuests > 0 && numberOfGuests < 30) {
        await fireBase_DAL.sendData("guests", numberOfGuests);
        break;
      } else {
        dataFromDialogFlow_DAL.fulfillmentMessages[0].text.text[0] =
          "Please enter a number between 1-30";
        break;
      }

      break;
    }
    case "checkIn": {
      let date = dataFromDialogFlow_DAL.parameters.fields.date.stringValue.slice(
        0,
        10
      );
      await fireBase_DAL.sendData("checkIn", date);
      break;
    }
    case "checkOut": {
      let date = dataFromDialogFlow_DAL.parameters.fields.date.stringValue.slice(
        0,
        10
      );
      await fireBase_DAL.sendData("checkOut", date);
      break;
    }
    case "stars": {
      let stars = dataFromDialogFlow_DAL.parameters.fields.number.numberValue;
      if (stars > 0 && stars <= 5) {
        await fireBase_DAL.sendData("stars", stars);
        let hotelsObj = await selenium_MODEL.startSelenium();
        dataFromDialogFlow_DAL.fulfillmentMessages[0].text.text[0] = hotelsObj;

        break;
      } else {
        dataFromDialogFlow_DAL.fulfillmentMessages[0].text.text[0] =
          "Please enter a number between 1-5";
      }
      break;
    }
  }

  return dataFromDialogFlow_DAL;
};
