/* Based on Amazon's Hello World example at https://github.com/amzn/alexa-skills-kit-js/blob/master/samples/helloWorld/src/index.js */
"use strict";

var APP_ID = "{{{ APP_ID }}}";

var AlexaSkill = require("./AlexaSkill"),
    AdafruitClient = require("./AdafruitClient");

class AdafruitIOSkill extends AlexaSkill {
  constructor() {
    super(APP_ID);
  }
}

AdafruitIOSkill.prototype.eventHandlers.onSessionStarted =  (sessionStartedRequest, session) => {
  console.log(`AdafruitIOSkill onSessionStarted requestId: ${sessionStartedRequest.requestId}, sessionId: ${session.sessionId}`);
  // any initialization logic goes here
}

AdafruitIOSkill.prototype.eventHandlers.onLaunch = (launchRequest, session, response) => {
  console.log(`AdafruitIOSkill onLaunch requestId: ${launchRequest.requestId}, sessionId: ${session.sessionId}`);
  var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
  var repromptText = "You can say hello";
  response.ask(speechOutput, repromptText);
}

AdafruitIOSkill.prototype.eventHandlers.onSessionEnded = (sessionEndedRequest, session) => {
  console.log(`AdafruitIOSkill onSessionEnded requestId: ${sessionEndedRequest.requestId}, sessionId: ${session.sessionId}`);
  // any cleanup logic goes here
}

AdafruitIOSkill.prototype.intentHandlers = {
  // register custom intent handlers
  "QueryLatestValue": (intent, session, response) => {
    if (!session.user.accessToken) {
      response.linkAccount(
        "You need to link your Adafruit account before I can access your data feeds. See the Alexa app to continue.",
        "Link your Adafruit account",
        "To access your Adafruit.io feeds you need to link your account."
      )

      return;
    }

    var feedDescriptionSlot = intent.slots.FeedDescription;
    var feedDescription = "an unknown thing.";
    console.log(`Feed description slot ${JSON.stringify(feedDescriptionSlot)}`)

    if (feedDescriptionSlot && feedDescriptionSlot.value) {
      feedDescription = feedDescriptionSlot.value;
    }

    var adafruit = new AdafruitClient(session.user.accessToken);
    adafruit.requestLatestValue("arthurs-room", (data) => {
      console.log("Got a response:" + JSON.stringify(data));
      response.tellWithCard(`The temperature in ${feedDescription} is ${data.value}`, feedDescription, `The temperature in ${feedDescription} is ${data.value}`);
    });
  },

  "LinkAccount": (intent, session, response) => {
    response.linkAccount(
      "See the Alexa app to link your account.",
      "Link your Adafruit account",
      "To access your Adafruit.io feeds you need to link your account."
    );
  },
};

// Create the handler that responds to the Alexa Request.
exports.handler = (event, context) => {
  // Create an instance of the AdafruitIOSkill skill.
  var adafruit = new AdafruitIOSkill();
  adafruit.execute(event, context);
};
