/* Based on Amazon's Hello World example at https://github.com/amzn/alexa-skills-kit-js/blob/master/samples/helloWorld/src/index.js */
"use strict";

var APP_ID = "amzn1.ask.skill.c6a21c42-0f35-4dfb-be94-c8a9b7dc84cc";

var AlexaSkill = require("./AlexaSkill");

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
    var feedDescriptionSlot = intent.slots.FeedDescription;
    var feedDescription = "an unknown thing.";
    console.log(`Feed description slot ${JSON.stringify(feedDescriptionSlot)}`)

    if (feedDescriptionSlot && feedDescriptionSlot.value) {
      feedDescription = feedDescriptionSlot.value;
    }

    response.tellWithCard(`You asked for ${feedDescription}`, "Hello World", "Hello World!");
  }
};

// Create the handler that responds to the Alexa Request.
exports.handler = (event, context) => {
  // Create an instance of the AdafruitIOSkill skill.
  var adafruit = new AdafruitIOSkill();
  adafruit.execute(event, context);
};

