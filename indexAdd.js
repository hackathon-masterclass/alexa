const WeatherIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WeatherIntent';
  },
  handle(handlerInput) {
    const colorChoices = ['pink', 'gray', 'blue', 'green', 'purple'];
    const color = Math.floor(colorChoices.length * Math.random());
    const timeSlot = handlerInput.requestEnvelope.request.intent.slots.time;
    let date = '';

    if ('time' in slots) {
      if ('resolutions' in slots.time) {
        date = slots.time.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      } else {
        date = 'today';
      }
      console.log("got date " + date);
    } else {
      console.log("ERROR: no time slot in request. " + JSON.stringify(slots));
    }

    const speechText = 'Expect it to be ' + colorChoices[color] + ' ' + date + '!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};
