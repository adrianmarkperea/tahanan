var cities       = require('./cities.js');
var governorates = require('./governorates');
var landmarks    = require('./landmarks');
var memories     = require('./memories');
var users        = require('./users');

module.exports = (app) => {
  app.use('/api/cities', cities);
  app.use('/api/governorates', governorates);
  app.use('/api/landmarks', landmarks);
  app.use('/api/memories', memories);
  app.use('/api/users', users);
}
