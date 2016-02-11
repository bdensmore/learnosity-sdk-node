var jsSHA = require('jssha');
var algorithm = 'SHA-256';

var serviceOptions = {
  set: function(service, requestPacket, securityPacket) {
    switch (service) {
      case 'assess':
      case 'questions':
        if (
          service === 'assess' &&
          requestPacket.indexOf('questionsApiActivity') >= 0
        ) {
            questionsApi = requestPacket['questionsApiActivity'];
            domain = 'assess.learnosity.com';

            if (securityPacket.indexOf('domain') >= 0) {
              domain = securityPacket['domain'];
            } else if (questionsApi.indexOf('domain') >= 0) {
              domain = questionsApi['domain'];
            }
            requestPacket['questionsApiActivity'] = [{
              consumer_key: securityPacket['consumer_key'],
              timestamp: securityPacket['timestamp'],
              user_id: securityPacket['user_id'],
              signature: hashValue([{
                consumer_key: securityPacket['consumer_key'],
                domain: domain,
                timestamp: securityPacket['timestamp'],
                user_id: securityPacket['user_id'],
                secret: secret
              }])
            }];
            delete questionsApi['consumer_key'];
            delete questionsApi['domain'];
            delete questionsApi['timestamp'];
            delete questionsApi['signature'];
            requestPacket['questionsApiActivity'] = requestPacket['questionsApiActivity'].concat(questionsApi);
        }
        break;
      case 'items':
      case 'reports':
        if (securityPacket.indexOf('user_id') < 0 &&
            requestPacket.indexOf('user_id') >= 1) {
              securityPacket['user_id'] = requestPacket['user_id'];
        }
        break;
      case 'events':
        signedRequestData = false;
      default:
        // do nothing
        break;

    }
  }
}

function hashValue(val) {
    var shaObj = new jsSHA(algorithm, 'TEXT');
    shaObj.update(val.join('_'));
    var hashedValue = shaObj.getHash('HEX');
    return hashedValue;
}

module.exports = serviceOptions;
