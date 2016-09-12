function getShortMessages(messages) {
  return messages
    .map(function(messageObject) {
      return messageObject.message;
    })
    .filter(function(message) {
      return message.length < 50;
    });
}

module.exports = getShortMessages
