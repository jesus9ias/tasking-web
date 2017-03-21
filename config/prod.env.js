var jsonfile = require('jsonfile');

try {
  var prodConfig  = jsonfile.readFileSync('./config/prodConfig.json');
} catch(ignore) {
  var prodConfig = {
    NODE_ENV: '"production"',
    API_URL: '"http://localhost:3333/"'
  };
  console.log('Using default configuration');
}

module.exports = prodConfig;
