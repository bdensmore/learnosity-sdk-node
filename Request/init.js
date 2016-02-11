var dateFormat = require('dateformat');
var validator = require('./validator.js');
var serviceOptions = require('./service-options.js');

var service;
var secret;
var securityPacket;
var requestPacket;
var requestString;
var action;
var signedRequestData = true;





var init = {
  init: function(service, securityPacket, secret, requestPacket, action) {
    var validate = validator.validate(service, securityPacket, secret, requestPacket, action);

    service = service;
    securityPacket = securityPacket;
    secret = secret;
    requestPacket = requestPacket;
    requestString = generateRequestString();
    action = action;

    serviceOptions.set(service, requestPacket, securityPacket);

    securityPacket['signature'] = generateSignature();

  },
  generate: function() {
    var output = [];

    switch (service) {
      case 'assess':
      case 'author':
      case 'data':
      case 'items':
      case 'reports':

        // Add the security packet (with signature) to the output
        output['security'] = securityPacket;

        if (!typeof requestPacket === 'undefined') {
          output['request'] = requestPacket;
        }

        if (!typeof action === 'undefined') {
          output['action'] = action;
        }

        if (service === 'data') {
          r['security'] = JSON.parse(output['security']);
          if (output.indexOf('request') >= 0) {
            r['request'] = JSON.parse(output['request']);
          }
          if (output.indexOf('action') >= 0) {
            r['action'] = output['action'];
          }
          return r;
        } else if (service === 'assess') {
          output = output['request'];
        }
        break;
      case 'questions':
        output = securityPacket;

        // Remove the `domain` key from the security packet
        delete output['domain'];

        if (!typeof requestPacket === 'undefined') {
          output = requestPacket.concat(output);
        }
        break;
      case 'events':
        // Add the security packet (with signature) to the output
        output['security'] = securityPacket;
        output['config'] = requestPacket;
        break;
      default:
        // no default
        break;
    }

    return JSON.parse(output);
  }
}



function generateSignature() {
  var signatureArray = [];

  validSecurityKeys.forEach(function(key) {
    if (securityPacket.indexOf(key) >=0 ) {
      signatureArray.push(securityPacket[key]);
    }
  });

  // Add the secret
  signatureArray.push(secret);
}

function generateRequestString() {
  if (typeof requestPacket === 'undefined') {
    return null;
  }
  requestString = JSON.parse(requestPacket);
  if (false === requestString) {
    throw new Error('Invalid data, please check your request packet - ');
  }

  return requestString;
}

module.exports = init;
