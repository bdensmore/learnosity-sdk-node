var validSecurityKeys = [
  'consumer_key',
  'domain',
  'timestamp',
  'user_id'
];

var validServices = [
  'assess',
  'author',
  'data',
  'events',
  'items',
  'questions',
  'reports'
];

var validator = {
  validate: function(service, securityPacket, secret, requestPacket, action) {
    if (typeof service === 'undefined') {
      throw new Error('The `service` argument wasn\'t found or was empty');
    } else if (validServices.indexOf(service) < 0) {
        throw new Error('The service provided ' + service + ' is not valid');
    }

    if (!typeof securityPacket === 'array' && typeof securityPacket === 'string') {
      securityPacket = JSON.parse(securityPacket);
    }

    if (typeof securityPacket === 'undefined' || securityPacket === '' || !typeof securityPacket === 'array') {
      throw new Error('The security packet must be an array');
    } else {
      securityPacket.forEach(function(key) {
        if (validServices.indexOf(key) < 0) {
          throw new Error('Invalid key found in security packet');
        }
      });

      if (securityPacket.indexOf('timestamp') < 0) {
        var now = new Date();
        securityPacket['timestamp'] = dateFormat(now, 'Ymd-Hi');
      }

      if (service === 'questions' && securityPacket.indexOf('user_id') < 0) {
        throw new Error('If using the question api, a user id needs to be specified');
      }
    }

    if (typeof secret === 'undefined' || !typeof secret === 'string') {
      throw new Error('The `secret` argument must be a valid string');
    }

    if (!typeof requestPacket === 'array' && typeof requestPacket === 'string') {
      requestPacket = JSON.parse(requestPacket);
    }

    if (requestPacket && !typeof requestPacket === 'array') {
      throw new Error('The request packet must be an array');
    }

    if (action && !typeof action === 'string') {
      throw new Error('The action parameter must be a string');
    }
  }
}

module.exports = validator;
