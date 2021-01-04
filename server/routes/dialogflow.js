const express = require("express");
const router = express.Router();
const dialogFlow_MODEL = require("../Model/dialogFlow_MODEL");
const dfff = require("dialogflow-fulfillment");
const { response } = require("../app");

router.post("/textQuery", async (req, res) => {
  //Get data from dialogFlow API
  try {
    const finalData = await dialogFlow_MODEL.getDataFromDialogFlow(
      req.body.text
    );
    res.send(finalData);
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;

