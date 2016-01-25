var request_init = require('./Request/init.js');


try {
  var init = request_init('author');
  console.log(init);
} catch(e) {
  console.log('There was an error ' + e.message);
}
