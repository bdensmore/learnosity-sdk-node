var request_init = require('./Request/init.js');
var key;

var init = {
  init: function(service, securityPacket, secret, requestPacket, action) {
    try {
        key = request_init.init(service, securityPacket, secret, requestPacket, action);
      } catch(e) {
        key = 'There was an error generating your key: ' + e.message;
      }

      return key;
    }
}

module.exports = init;
