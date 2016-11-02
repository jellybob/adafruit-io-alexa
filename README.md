# Adafruit.io Alexa integration

I don't have a witty name for this yet. Or any code. Mostly I'm just collecting ideas right now.

Should this in fact be a generic MQTT client. Maybe, but for now I'll use the REST API.

## Possible invocations

Alexa, ask Adafruit

* for the temperature in Arthur's room (how can that be interpreted? Probably needs fuzzy matching on feed names)
* for Arthur's room temperature (returns latest data point in the named feed - "At 10:47AM Arthur's room temperature was 21.6"
* to increment coffees drunk (pushes a data point of 1 to the named feed)
* to decrement ...
* to set coffees drunk to 12 (sets the specified data point)
* to turn on the living room light (sends a 1 to the named feed)
* to turn off the living room light (sends a 0 to the named feed)
