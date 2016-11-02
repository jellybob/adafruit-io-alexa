"use strict";

var https = require("https");

class AdafruitClient {
  constructor(key) {
    this.key = key;
  }

  buildOptions(path) {
    return {
      host: 'io.adafruit.com',
      path: `/api/v1${path}`,
      port: '443',
      headers: {'X-AIO-Key': this.key},
    }
  }

  requestLatestValue(feed, callback) {
    var httpCallback = (response) => {
      var responseText = '';
      response.on('data', (chunk) => {
        console.log("Got some data: " + chunk);
        responseText += chunk
      });

      response.on('end', () => {
        console.log(`Get response: ${responseText}`);
        var data = JSON.parse(responseText);
        callback(data)
      });
    }

    console.log("Requesting /feeds/${feed}/data/last");
    https.get(this.buildOptions(`/feeds/${feed}/data/last`), httpCallback);
  }
}

module.exports = AdafruitClient;
