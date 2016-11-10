# Adafruit.io Alexa integration

This Alexa integration allows Adafruit.io to be queried for the
latest state of a data feed. It might at some point allow updates
as well, but we'll see how that goes.

## Alexa Skill

### Possible invocations

Alexa, ask Adafruit

* to connect (allows the user to provide an API key)
* for the temperature in Arthur's room (how can that be interpreted? Probably needs fuzzy matching on feed names)
* for Arthur's room temperature (returns latest data point in the named feed - "At 10:47AM Arthur's room temperature was 21.6"
* to increment coffees drunk (pushes a data point of 1 to the named feed)
* to decrement ...
* to set coffees drunk to 12 (sets the specified data point)
* to turn on the living room light (sends a 1 to the named feed)
* to turn off the living room light (sends a 0 to the named feed)

### Configuration

Data which Amazon want on their configuration form is found in `metadata/` (I'm hoping there'll be
an API for that at some point).

### Deployment

There's a `deploy` script in the `skill` directory. It pushes
the skill up to Lambda.

## Configuration UI

This is really bare bones, its just a thin veneer over DynamoDB
which allows storing the user's API token for later use.
