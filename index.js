var request_init = require('./Request/init.js');
var key;

function init(service, securityPacket, secret, requestPacket, action) {
  try {
      key = request_init(service, securityPacket, secret, requestPacket, action);
  } catch(e) {
      key = 'There was an error ' + e.message;
  }

  return hashed_key;
}
