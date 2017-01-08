let mode;
if (process.env.UNIT_TESTING) {
  mode = 'test';
} else if (process.env.NODE_ENV === 'production') {
  mode = 'prod';
} else if (process.env.NODE_ENV === 'development') {
  mode = 'dev';
}

switch (mode) {
  case 'dev':
  case 'test':
    module.exports = require('./dev');
    break;
  case 'prod':
    module.exports = require('./prod');
    break;
  default:
    console.error(`Mode ${mode} doesn't exists!!`);
}
