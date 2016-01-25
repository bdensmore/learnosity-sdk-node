var jsSHA = require('jssha');
var dateFormat = require('dateformat');
var validator = require('./validator.js');

var service;
var secret;
var securityPacket;
var requestPacket;
var requestString;
var action;
var signedRequestData = true;
var algorithm = 'SHA-256';




module.exports = function(service, securityPacket, secret, requestPacket, action) {
  var validate = validator.validate(service, securityPacket);
  // var shaObj = new jsSHA('SHA-256', 'TEXT');
  // shaObj.update('Hello');
  // var hash = shaObj.getHash('HEX');
  return validate;
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
  if (typeof REQUESTPACKET === 'undefined') {
    return;
  }
}
