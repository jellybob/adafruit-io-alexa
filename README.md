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

The configuration UI runs on Heroku, and is a thin layer which allows an Alexa
user ID to be mapped to an Adafruit.io API key. Deploy it by running the `deploy`
script in `config-ui`.

Its written in [Sinatra](http://www.sinatrarb.com/), because I already know how
to do that easily, but having actually done it now the linking process is so
simple I could probably boil it down to a static HTML file and some Javascript
on S3. Maybe do that some time.
